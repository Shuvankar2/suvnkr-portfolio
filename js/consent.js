/* ==========================================================================
   SUVNKR Consent Manager
   --------------------------------------------------------------------------
   A small, dependency-free consent layer shared by suvnkr.in and the
   *.suvnkr.in product subdomains.

   - Nothing non-essential is loaded before a choice is recorded.
   - Choices live in localStorage under a versioned key.
   - If a Google-certified CMP (AdSense "Privacy & messaging" / Funding
     Choices) is present, this banner steps aside and hands control to it,
     because only a certified CMP may collect TCF consent for personalised
     ads in the EEA / UK / Switzerland.

   Public API (window.SuvnkrConsent):
     get()                  -> {necessary, analytics, advertising, functional}
     set({analytics:true})  -> merge + persist + notify
     allows('advertising')  -> boolean
     whenAllowed(cat, fn)   -> run now or as soon as that category is allowed
     open() / close()       -> show / hide the preferences panel
     reset()                -> forget the choice (used for testing / withdraw)
     version                -> current consent schema version
   ========================================================================== */

(function () {
    "use strict";

    var STORAGE_KEY = "suvnkr_consent_v1";
    var VERSION = 1;

    var DEFAULTS = {
        necessary: true,
        analytics: false,
        advertising: false,
        functional: false
    };

    var memoryStore = null;
    var queued = [];
    var prefs = null;
    var ui = null;
    var lastFocused = null;

    /* --------------------------------------------------------------------
       Storage
       -------------------------------------------------------------------- */

    function safeRead() {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            if (!parsed || parsed.version !== VERSION || !parsed.prefs) return null;
            return normalise(parsed.prefs);
        } catch (err) {
            return memoryStore;
        }
    }

    function safeWrite(value) {
        memoryStore = value;
        try {
            if (value === null) {
                window.localStorage.removeItem(STORAGE_KEY);
            } else {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    version: VERSION,
                    savedAt: new Date().toISOString(),
                    prefs: value
                }));
            }
        } catch (err) {
            /* Storage can be blocked (private mode, embedded webview).
               memoryStore keeps the choice for this page view. */
        }
    }

    function normalise(input) {
        var out = {
            necessary: true,
            analytics: false,
            advertising: false,
            functional: false
        };
        if (input && typeof input === "object") {
            out.analytics = input.analytics === true;
            out.advertising = input.advertising === true;
            out.functional = input.functional === true;
        }
        return out;
    }

    /* --------------------------------------------------------------------
       Google CMP bridge
       -------------------------------------------------------------------- */

    function hasGoogleCmp() {
        return typeof window.googlefc !== "undefined" ||
            typeof window.__tcfapi === "function";
    }

    function openGoogleCmp() {
        if (window.googlefc && typeof window.googlefc.showRevocationMessage === "function") {
            window.googlefc.showRevocationMessage();
            return true;
        }
        if (typeof window.__tcfapi === "function") {
            try {
                window.__tcfapi("displayConsentUi", 2, function () { });
                return true;
            } catch (err) {
                return false;
            }
        }
        return false;
    }

    /* --------------------------------------------------------------------
       Public state
       -------------------------------------------------------------------- */

    function emit() {
        var detail = get();
        document.dispatchEvent(new CustomEvent("suvnkr:consent", { detail: detail }));
        var ready = queued.splice(0, queued.length);
        ready.forEach(function (job) {
            if (detail[job.category]) {
                try { job.fn(detail); } catch (err) { /* isolate consumer errors */ }
            } else {
                queued.push(job);
            }
        });
    }

    function get() {
        return normalise(prefs);
    }

    function allows(category) {
        return get()[category] === true;
    }

    function set(next, options) {
        prefs = normalise(Object.assign({}, get(), next));
        safeWrite(prefs);
        if (!options || options.silent !== true) emit();
        renderState();
        return get();
    }

    function whenAllowed(category, fn) {
        if (typeof fn !== "function") return;
        if (allows(category)) {
            fn(get());
        } else {
            queued.push({ category: category, fn: fn });
        }
    }

    function reset() {
        prefs = null;
        safeWrite(null);
        renderState();
        open();
    }

    /* --------------------------------------------------------------------
       Markup
       -------------------------------------------------------------------- */

    function build() {
        var wrap = document.createElement("div");
        wrap.id = "sn-consent";
        wrap.setAttribute("role", "dialog");
        wrap.setAttribute("aria-modal", "false");
        wrap.setAttribute("aria-labelledby", "sn-consent-title");
        wrap.setAttribute("aria-describedby", "sn-consent-desc");
        wrap.hidden = true;

        wrap.innerHTML =
            '<div class="sn-consent-head">' +
            '<i class="fa-solid fa-cookie-bite" aria-hidden="true"></i>' +
            '<h2 id="sn-consent-title">Cookies &amp; privacy</h2>' +
            "</div>" +
            '<p id="sn-consent-desc">I use essential storage to run this site. With your permission, ' +
            "embedded media players may set cookies, and products that show ads may use Google's advertising cookies. " +
            'Read the <a href="' + legalHref("cookie-policy.html") + '">Cookie Policy</a>, ' +
            '<a href="' + legalHref("privacy-policy.html") + '">Privacy Policy</a> and ' +
            '<a href="' + legalHref("terms-of-use.html") + '">Terms of Use</a>.</p>' +
            '<div class="sn-consent-actions" data-view="summary">' +
            '<button type="button" class="sn-btn-ghost" data-action="reject">Reject non-essential</button>' +
            '<button type="button" class="sn-btn-ghost" data-action="customise">Customise</button>' +
            '<button type="button" class="sn-btn-primary" data-action="accept">Accept all</button>' +
            "</div>" +
            '<div class="sn-consent-prefs" data-view="prefs" hidden>' +
            prefRow("necessary", "Strictly necessary", "Keeps the site working and remembers this choice.", true) +
            prefRow("functional", "Preferences &amp; embeds", "Remembers display options and lets embedded video players load.", false) +
            prefRow("analytics", "Analytics", "Helps me understand which pages are useful. No analytics is active today.", false) +
            prefRow("advertising", "Advertising", "Lets Google AdSense serve and personalise ads on ad-supported products.", false) +
            "</div>" +
            '<div class="sn-consent-actions" data-view="prefs" hidden>' +
            '<button type="button" class="sn-btn-ghost" data-action="reject">Reject non-essential</button>' +
            '<button type="button" class="sn-btn-primary" data-action="save">Save choices</button>' +
            "</div>" +
            '<button type="button" class="sn-btn-text" data-action="close">Close without changing</button>';

        document.body.appendChild(wrap);
        ui = wrap;
        bind();
        return wrap;
    }

    function prefRow(key, title, desc, required) {
        return '<div class="sn-pref-row">' +
            '<div class="sn-pref-copy">' +
            '<span class="sn-pref-title">' + title + "</span>" +
            '<span class="sn-pref-desc">' + desc + "</span>" +
            "</div>" +
            (required
                ? '<span class="sn-required">Always on</span>'
                : '<label class="sn-switch"><input type="checkbox" data-pref="' + key + '" aria-label="' + title.replace(/&amp;/g, "and") + '"><span aria-hidden="true"></span></label>') +
            "</div>";
    }

    function legalHref(file) {
        /* Subdomains (gotiprep.suvnkr.in, …) host the same script but do not
           contain the legal pages, so point at the canonical copy on the root
           domain. Set window.SUVNKR_LEGAL_BASE to override. */
        if (typeof window.SUVNKR_LEGAL_BASE === "string" && window.SUVNKR_LEGAL_BASE) {
            return window.SUVNKR_LEGAL_BASE.replace(/\/+$/, "") + "/" + file;
        }
        var host = String(window.location.hostname || "").toLowerCase();
        if (host !== "suvnkr.in" && /(^|\.)suvnkr\.in$/.test(host)) {
            return "https://suvnkr.in/html/" + file;
        }
        /* Pages live at the site root or one directory down (html/). */
        var path = window.location.pathname.replace(/\\/g, "/");
        var inSubdir = /\/html\/[^/]*$/.test(path) || /\/[^/]+\/[^/]*\.html$/.test(path);
        return (inSubdir ? "" : "html/") + file;
    }

    /* --------------------------------------------------------------------
       Behaviour
       -------------------------------------------------------------------- */

    function bind() {
        ui.addEventListener("click", function (event) {
            var button = event.target.closest("[data-action]");
            if (!button) return;
            var action = button.getAttribute("data-action");

            if (action === "accept") {
                set({ analytics: true, advertising: true, functional: true });
                close();
            } else if (action === "reject") {
                set({ analytics: false, advertising: false, functional: false });
                close();
            } else if (action === "customise") {
                showPrefs(true);
            } else if (action === "save") {
                var next = {};
                ui.querySelectorAll("[data-pref]").forEach(function (input) {
                    next[input.getAttribute("data-pref")] = input.checked;
                });
                set(next);
                close();
            } else if (action === "close") {
                dismiss();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && ui && !ui.hidden) {
                dismiss();
            }
        });
    }

    /* Dismissing is never consent. On a first visit it records an explicit
       rejection so the optional categories stay off; once a choice exists it
       keeps that choice instead of silently downgrading it. */
    function dismiss() {
        if (!prefs) {
            set({ analytics: false, advertising: false, functional: false });
        }
        close();
    }

    function showPrefs(show) {
        if (!ui) return;
        ui.querySelectorAll('[data-view="summary"]').forEach(function (el) {
            el.hidden = show;
        });
        ui.querySelectorAll('[data-view="prefs"]').forEach(function (el) {
            el.hidden = !show;
        });
        renderState();
        if (show) {
            var first = ui.querySelector("[data-pref]");
            if (first) first.focus();
        }
    }

    function renderState() {
        if (!ui) return;
        var current = get();
        ui.querySelectorAll("[data-pref]").forEach(function (input) {
            input.checked = current[input.getAttribute("data-pref")] === true;
        });
    }

    function open() {
        if (hasGoogleCmp() && openGoogleCmp()) return;
        if (!ui) build();
        lastFocused = document.activeElement;
        ui.hidden = false;
        showPrefs(Boolean(get() && prefs));
        renderState();
        var primary = ui.querySelector(".sn-btn-primary");
        if (primary) primary.focus();
    }

    function close() {
        if (!ui) return;
        ui.hidden = true;
        showPrefs(false);
        if (lastFocused && typeof lastFocused.focus === "function") {
            lastFocused.focus();
        }
    }

    /* --------------------------------------------------------------------
       Boot
       -------------------------------------------------------------------- */

    function init() {
        prefs = safeRead();

        document.querySelectorAll("[data-cookie-settings]").forEach(function (el) {
            el.addEventListener("click", function (event) {
                event.preventDefault();
                open();
            });
        });

        /* If a certified CMP is already on the page, let it own the banner. */
        if (hasGoogleCmp()) {
            prefs = safeRead();
            return;
        }

        if (!prefs) {
            build();
            window.setTimeout(function () {
                /* Re-check: an async CMP may have registered in the meantime. */
                if (hasGoogleCmp()) {
                    close();
                    return;
                }
                ui.hidden = false;
                var primary = ui.querySelector(".sn-btn-primary");
                if (primary) primary.focus();
            }, 900);
        }
    }

    window.SuvnkrConsent = {
        version: VERSION,
        get: get,
        set: set,
        allows: allows,
        whenAllowed: whenAllowed,
        open: open,
        close: close,
        reset: reset
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
