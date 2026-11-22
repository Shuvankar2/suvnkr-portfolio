# Shuvankar Debnath — suvnkr.in

Personal portfolio and product hub for **Shuvankar Debnath (SUVNKR)**, a Software & AI Engineer based in Kolkata, India. The site is a static, dependency-light build served from GitHub Pages on the custom domain **suvnkr.in**.

The root domain is a portfolio and is intentionally **ad-free**. Product subdomains such as `gotiprep.suvnkr.in` are separate properties within the same Google AdSense account.

🌐 **Live site**: [suvnkr.in](https://suvnkr.in)

---

## What's in here

- **Portfolio** — home, about, experience, skills, projects (web/AI, video, thumbnails, graphics), publications, products and contact.
- **AI assistant** — a chat widget that answers questions about the work. It reads `ai-context.json` and posts to a Cloudflare Worker (`suvnkr-ai.shuvankar345.workers.dev`), which calls a language-model provider. The transcript survives navigation via `sessionStorage` and expires after one hour of inactivity.
- **Consent management** — a shared, dependency-free banner that gates optional loading, defers to a Google-certified CMP when one is present, and exposes `window.SuvnkrConsent` for ad-supported properties.
- **Legal documents** — Privacy Policy, Terms of Use and Cookie Policy written as product-family documents that cover `suvnkr.in`, GotiPrep, Kagazly and any future `*.suvnkr.in` product.
- **SEO plumbing** — canonical URLs, Open Graph and Twitter cards (with a real 1200×630 `og-cover.jpg`), JSON-LD, `sitemap.xml`, `robots.txt`, and a branded `404.html`.

---

## Structure

```text
portfolio/
├── CNAME                     # GitHub Pages custom domain (suvnkr.in)
├── 404.html                  # Branded not-found page (noindex)
├── index.html                # Single-page home: hero, about, experience, skills, projects, contact
├── ads.txt                   # AdSense authorisation for the domain
├── ai-context.json           # Live knowledge manifest consumed by the AI assistant
├── robots.txt                # Crawl rules + sitemap reference
├── sitemap.xml               # 15 indexable URLs
├── css/
│   ├── style.css             # Global layout, nav, footer, hero, shared components
│   ├── about.css             # About page
│   ├── contact.css           # Contact page + guidance grid
│   ├── experience.css        # Experience timeline + certifications
│   ├── skills.css            # Skills page
│   ├── project.css           # Project galleries, lightbox, video embeds
│   ├── consent.css           # Cookie banner, preferences panel, footer trigger
│   └── legal.css             # Shared layout for the three legal pages
├── js/
│   ├── script.js             # Nav, preloader, carousels, lightbox, cert modal, AI assistant
│   └── consent.js            # Consent manager (window.SuvnkrConsent)
├── html/
│   ├── about.html
│   ├── contact.html
│   ├── experience.html
│   ├── skills.html
│   ├── projects.html
│   ├── projects-web-dev.html
│   ├── projects-video.html
│   ├── projects-thumbnail.html
│   ├── projects-graphics.html
│   ├── products.html
│   ├── publications.html
│   ├── privacy-policy.html
│   ├── terms-of-use.html
│   └── cookie-policy.html
├── img/                      # Optimised WebP assets, SVG logos, OG/Twitter card
└── uploads/                  # Downloadable PDFs (CV, published paper)
```

---

## Stack

- **Markup**: semantic HTML5
- **Styling**: hand-written CSS3 — custom properties, grid/flex layouts, gradients, reduced-motion support
- **Behaviour**: vanilla JavaScript (ES6+), no framework or bundler
- **Third-party, runtime only**: [Typed.js](https://github.com/mattboldt/typed.js/), [Font Awesome 6](https://fontawesome.com/) (cdnjs), Google Fonts
- **Hosting**: GitHub Pages with a `CNAME` custom domain

---

## Consent and privacy wiring

`js/consent.js` is loaded on every page, next to `css/consent.css`.

```js
// Read the current decision
SuvnkrConsent.get();            // { necessary, analytics, advertising, functional }
SuvnkrConsent.allows('advertising'); // false until the visitor opts in

// Load something only after the matching category is allowed
SuvnkrConsent.whenAllowed('advertising', () => {
  // inject AdSense, analytics, embeds…
});

// Re-open the banner (also wired to the footer "Cookie settings" button)
SuvnkrConsent.open();
```

Behaviour worth knowing:

- Nothing non-essential loads before a choice is recorded.
- The choice is versioned in `localStorage` under `suvnkr_consent_v1`; bump `VERSION` in `consent.js` to invalidate old decisions.
- Closing the banner or pressing <kbd>Esc</kbd> counts as **rejection**, never consent.
- If a Google-certified CMP is detected (`googlefc` or `__tcfapi`), the custom banner steps aside so the certified CMP owns TCF consent. Only a certified CMP may collect consent for personalised ads in the EEA/UK/Switzerland.
- `necessary` is always on; `analytics`, `advertising` and `functional` default to off.

### Adding ads to a product subdomain

1. Include `css/consent.css` and `js/consent.js` on the page.
2. Install Google AdSense and enable a **Google-certified CMP** (AdSense → Privacy & messaging) for EEA/UK/CH traffic.
3. Gate the ad script:

```js
SuvnkrConsent.whenAllowed('advertising', () => {
  const s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3063786907196879';
  document.head.appendChild(s);
});
```

Do not copy the AdSense loader into the root portfolio pages — the root domain is deliberately ad-free and carries only the `google-adsense-account` verification meta tag.

---

## Local preview

The site is plain static files, so any static server works. Opening `index.html` from the filesystem also works, though `file://` blocks a few browser APIs.

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000/>. Pages under `html/` are reachable at `/html/<page>.html`.

---

## Editing notes

- **Paths are document-relative.** Root pages use `html/…`, `css/…`; pages inside `html/` use `../…`. Keep that convention so the site works from a subfolder as well as a custom domain.
- **One `<h1>` per page.** Section titles are `<h2>`. `.heading h1, .heading h2` share the same styling rules.
- **Images** are WebP with explicit dimensions where they matter. `img/og-cover.jpg` is the 1200×630 social card — regenerate it rather than hand-editing the meta tags.
- **Legal pages** share `css/legal.css`; the header/footer blocks must stay in sync with the rest of the site. Legal contact is `shuvankar345@gmail.com`.
- **Consent assets** (`css/consent.css`, `js/consent.js`) and the footer "Cookie settings" button must exist on every page.
- **Line endings** — the repository stores LF. If Git rewrites to CRLF on checkout, normalise edited HTML back to LF before committing to avoid whole-file diffs.

---

## Author

- **Shuvankar Debnath (SUVNKR)**
  - Portfolio: [suvnkr.in](https://suvnkr.in)
  - GitHub: [@Shuvankar2](https://github.com/Shuvankar2)
  - LinkedIn: [shuvankardebnath](https://www.linkedin.com/in/shuvankardebnath/)
  - X: [@suvnkrr](https://x.com/suvnkrr)
  - YouTube: [@ShuvankarTechie](https://www.youtube.com/@ShuvankarTechie)
  - Instagram: [@shuvankarrr](https://www.instagram.com/shuvankarrr/)
  - Email: [shuvankar345@gmail.com](mailto:shuvankar345@gmail.com)
