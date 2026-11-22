

    // Utility JS

            // For All Pages

          // Pre_Loading bar
          document.addEventListener("DOMContentLoaded", function() {
              var filled = document.querySelector(".filled");
              if (!filled) return;
              var width = 0;
              var interval = setInterval(function() {
                  if (width >= 80) {
                      clearInterval(interval);
                      setTimeout(function() {
                          filled.style.transition = 'width 5ms linear';
                          width = 100;
                          filled.style.width = width + '%';
                          setTimeout(function() {
                              filled.style.transition = 'none';
                              filled.style.width = '0%'; // Reset the width to 0%
                          }, 300);
                      }, 300);
                  } else {
                      width++;
                      filled.style.width = width + '%'; // Increase the width of the filled element
                  }
              }, 20);
          });
  
          // Landing Image - Changes after 5 seconds
          document.addEventListener("DOMContentLoaded", function() {
      const imageSlider = document.querySelector('.img-slider-landing');
      if (!imageSlider) return;

      const images = [
          'img/bg-landing.webp',
          'img/bg-landing2.webp',
          'img/bg-landing3.webp'
      ];
  
      let currentImageIndex = 0;
  
      function changeBackgroundImage() {
          imageSlider.classList.add('slide-out');
          setTimeout(() => {
              currentImageIndex = (currentImageIndex + 1) % images.length;
              imageSlider.style.backgroundImage = `url(${images[currentImageIndex]})`;
              imageSlider.classList.remove('slide-out');
              imageSlider.classList.add('slide-in');
          }, 500); // Adjust timing as needed for slide-out duration
          setTimeout(() => {
              imageSlider.classList.remove('slide-in');
          }, 1000); // Adjust timing as needed for slide-in duration
      }
  
      setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds
  
      // Initialize with the first image
      changeBackgroundImage();
  });
  
      // Experience btn Toggle Activity
      function toggleDetails(element) {
      const details = element.parentElement.querySelector('.description');
      if (details.classList.contains('show')) {
          details.classList.remove('show');
          element.classList.remove('active');
      } else {
          details.classList.add('show');
          element.classList.add('active');
      }
  }
  
// ══════════════════════════════════════════════════
// Modernized Sidebar Navigation Drawer Controller
// ══════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", function() {
    const navBar = document.querySelector("nav"),
        menuBtns = document.querySelectorAll(".menu-bar:not(.close-menu-bar)"),
        overlay = document.querySelector(".menu-overlay"),
        closeMenuBtns = document.querySelectorAll(".close-menu-bar"),
        sidebarLinks = document.querySelectorAll(".menu-sidebar .menu-nav-link");

    function openSidebar() {
        if (navBar) navBar.classList.add("open");
        document.body.classList.add("menu-open", "no-scroll");
    }

    function closeSidebar() {
        if (navBar) navBar.classList.remove("open");
        document.body.classList.remove("menu-open", "no-scroll");
    }

    function toggleSidebar() {
        if (navBar && navBar.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    menuBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    });

    closeMenuBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeSidebar();
        });
    });

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // Close when navigating via links inside sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
            // small delay for smooth visual feedback before navigation
            setTimeout(closeSidebar, 150);
        });
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navBar && navBar.classList.contains("open")) {
            closeSidebar();
        }
    });
});

// ══════════════════════════════════════════════════
// Global Progressive Skeleton Loading & Scroll Reveal Engine
// ══════════════════════════════════════════════════
function initScrollRevealAndSkeletons() {
    const selector = [
        '.reveal-on-scroll',
        '.project-modern-card',
        '.experience',
        '.skill-card',
        '.skills-category-block',
        '.linkedin-post-card',
        '.linkedin-live-sync-card',
        '.manifesto-banner',
        '.cert-card',
        '.about-item',
        '.projects-stats-bar',
        '.projects-filter-nav'
    ].join(', ');

    const targets = document.querySelectorAll(selector);

    targets.forEach((el) => {
        if (!el.classList.contains('reveal-on-scroll')) {
            el.classList.add('reveal-on-scroll');
        }
    });

    // Handle elements already in viewport immediately (no delay/flash)
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const observerOptions = {
        root: null,
        rootMargin: '150px 0px 250px 0px',
        threshold: 0.01
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.classList.add('is-loaded');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportHeight + 100 && rect.bottom >= 0) {
            // Already visible above the fold
            el.classList.add('is-visible');
            el.classList.add('is-loaded');
        } else {
            revealObserver.observe(el);
        }
    });

    // Fast-scroll & near-bottom fail-safe (ensures footer and bottom sections reveal instantly when scrolling rapidly)
    let fastScrollTicking = false;
    function checkFastScrollReveal() {
        if (fastScrollTicking) return;
        fastScrollTicking = true;
        window.requestAnimationFrame(() => {
            const vH = window.innerHeight || document.documentElement.clientHeight;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const totalHeight = document.documentElement.scrollHeight;

            if (scrollY + vH >= totalHeight - 450) {
                targets.forEach((el) => {
                    if (!el.classList.contains('is-visible')) {
                        el.classList.add('is-visible', 'is-loaded');
                        revealObserver.unobserve(el);
                    }
                });
            } else {
                targets.forEach((el) => {
                    if (!el.classList.contains('is-visible')) {
                        const r = el.getBoundingClientRect();
                        if (r.top <= vH + 200 && r.bottom >= -100) {
                            el.classList.add('is-visible', 'is-loaded');
                            revealObserver.unobserve(el);
                        }
                    }
                });
            }
            fastScrollTicking = false;
        });
    }

    window.addEventListener('scroll', checkFastScrollReveal, { passive: true });

    // Progressive image skeleton resolver
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('img-loaded');
            if (img.parentElement) img.parentElement.classList.add('is-loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('img-loaded');
                if (img.parentElement) img.parentElement.classList.add('is-loaded');
            });
            img.addEventListener('error', () => {
                img.classList.add('img-loaded');
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", initScrollRevealAndSkeletons);


    

          // Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show or hide the button based on scroll position (optimized with rAF & passive listener)
(function() {
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                const scrollToTopBtn = document.getElementById('scrollToTopBtn');
                const aiToggle = document.getElementById('suvnkrAiToggleBtn');
                const aiDrawer = document.getElementById('suvnkrAiDrawer');
                const isScrollShowing = window.pageYOffset > 300;

                if (scrollToTopBtn) {
                    if (isScrollShowing) {
                        scrollToTopBtn.classList.add('show');
                    } else {
                        scrollToTopBtn.classList.remove('show');
                    }
                }

                if (aiToggle) {
                    if (isScrollShowing) {
                        aiToggle.classList.add('above-scroll-btn');
                        if (aiDrawer) aiDrawer.classList.add('above-scroll-btn');
                    } else {
                        aiToggle.classList.remove('above-scroll-btn');
                        if (aiDrawer) aiDrawer.classList.remove('above-scroll-btn');
                    }
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
})();

// Auto-update copyright year
document.addEventListener("DOMContentLoaded", function() {
    const yearSpans = document.querySelectorAll(".copyright-year");
    const currentYear = new Date().getFullYear();
    yearSpans.forEach(span => {
        span.textContent = currentYear;
    });
});

// ══════════════════════════════════════════════════
// Experience Gallery & Certificates Interactive Modal System
// ══════════════════════════════════════════════════

const expGalleryData = {
    'nth': {
        title: 'National Test House (Eastern Region), Govt. of India',
        badge: 'Testing & Standards · NABL Calibration & Laboratory Workflows',
        cert: 'img/resources/certi/NTH-certi.jpeg',
        images: [
            { src: 'img/resources/nth/nth-1.jpeg', caption: 'NTH Electrical Testing Laboratory & Measurement Equipment' },
            { src: 'img/resources/nth/nth-2.jpeg', caption: 'High-Voltage Apparatus Testing Setup & Instrumentation' },
            { src: 'img/resources/nth/nth-3.jpeg', caption: 'Calibration Bench & Precision Standards Verification' },
            { src: 'img/resources/nth/nth-4.jpeg', caption: 'NABL & BIS Standards Quality Compliance Laboratory' }
        ]
    },
    'ongc': {
        title: 'Oil and Natural Gas Corporation (ONGC)',
        badge: 'Industrial Training · Drilling & Rig Operations',
        cert: 'img/resources/certi/ONGC-certi.jpeg',
        images: [
            { src: 'img/resources/ongc/ongc-1.jpeg', caption: 'ONGC Drilling Site & Field Operations' },
            { src: 'img/resources/ongc/ongc-2.webp', caption: 'Industrial Electrical Control Panel & Monitoring System' },
            { src: 'img/resources/ongc/ongc-3.jpeg', caption: 'High-Voltage Machinery & Rig Power Units' },
            { src: 'img/resources/ongc/ongc-4.jpeg', caption: 'Diesel Generator Backup & Distribution Layout' },
            { src: 'img/resources/ongc/ongc-5.jpeg', caption: 'Substation Field Work & Safety Protocol Review' },
            { src: 'img/resources/ongc/ongc-6.webp', caption: 'Heavy Drilling Machinery & Operational Grounding' },
            { src: 'img/resources/ongc/ongc-7.jpeg', caption: 'Technical Trainee Inspection Team at ONGC Facility' }
        ]
    },
    'noteloom': {
        title: 'Eduspace (formerly Note Loom)',
        badge: 'Multi-Tenant Academic ERP & AI Platform (In Development)',
        images: [
            { src: 'img/resources/noteloom/noteloom-2.webp', caption: 'Eduspace Multi-Tenant Institutional Administration Dashboard' },
            { src: 'img/resources/noteloom/noteloom-3.png', caption: 'Course Management & Video Learning Management System' },
            { src: 'img/resources/noteloom/noteloom-4.png', caption: 'Student Analytics & Academic Performance Records' },
            { src: 'img/resources/noteloom/noteloom-5.png', caption: 'Role-Based Access Control (Student, Faculty, Admin)' },
            { src: 'img/resources/noteloom/noteloom-6.png', caption: 'AI Study Assistant & Smart Coursework Integration' }
        ]
    },
    'aquaglass': {
        title: 'AquaGlass — IoT Smart Fish Feeder',
        badge: 'ESP32 Embedded Systems & Flutter Platform (In Development)',
        images: [
            { src: 'img/resources/aquaglass/ag-1.png', caption: 'AquaGlass Device Dashboard & Feed Scheduling UI' },
            { src: 'img/resources/aquaglass/ag-2.png', caption: 'Hardware Pairing & 6-Digit Device Binding Setup' },
            { src: 'img/resources/aquaglass/ag-3.png', caption: 'Real-Time Dispenser Status & Feed Logs' },
            { src: 'img/resources/aquaglass/ag-4.png', caption: 'Cross-Platform Mobile Application Interface' }
        ]
    },
    'gotiprep': {
        title: 'GotiPrep — Competitive Examination Platform',
        badge: 'Assessment Technology · Open Source (MIT)',
        images: [
            { src: 'img/resources/gotiprep/gp-1.webp', caption: 'GotiPrep Exam Dashboard & Assessment Categories' },
            { src: 'img/resources/gotiprep/gp-2.png', caption: 'Typing Arena with Real-Time WPM & Anti-Cheat Analytics' },
            { src: 'img/resources/gotiprep/gp-3.png', caption: 'Passage Comprehension & Timed Email Drafting Suite' }
        ]
    },
    'hotelease': {
        title: 'HotelEase — Offline Hotel Management System',
        badge: 'Windows Desktop Application · Offline-First ERP',
        images: [
            { src: 'img/resources/hotelease/he-1.png', caption: 'HotelEase Main Dashboard & Operational Overview' },
            { src: 'img/resources/hotelease/he-2.png', caption: 'Room Inventory Allocation & Live Availability Grid' },
            { src: 'img/resources/hotelease/he-3.png', caption: 'Guest Check-In/Check-Out & Registration System' },
            { src: 'img/resources/hotelease/he-4.webp', caption: 'Restaurant POS Billing & Order Management Module' },
            { src: 'img/resources/hotelease/he-5.png', caption: 'Automated Itemized Invoicing & Tax Computation' },
            { src: 'img/resources/hotelease/he-6.webp', caption: 'Staff Management & Local System Configuration' }
        ]
    },
    'kagazly': {
        title: 'Kagazly — Cloud Document & PDF Utilities',
        badge: 'Productivity Platform · Browser-Based WASM Tools',
        images: [
            { src: 'img/resources/kagazly/kg-1.webp', caption: 'Kagazly Utility Suite & Document Workspace' },
            { src: 'img/resources/kagazly/kg-2.webp', caption: 'PDF Merging, Splitting & Reorganization Tool' },
            { src: 'img/resources/kagazly/kg-3.webp', caption: 'Compression Engine & Client-Side Processing' },
            { src: 'img/resources/kagazly/kg-4.webp', caption: 'Watermarking & Format Conversion Interface' }
        ]
    },
    'trikal': {
        title: 'Trikal Darshi — Vedic Astrology Platform',
        badge: 'Planetary Computation & AI Interpretations',
        images: [
            { src: 'img/resources/trikal/td-1.webp', caption: 'Trikal Darshi Natal Chart & Planetary Calculation View' },
            { src: 'img/resources/trikal/td-2.webp', caption: 'AI-Generated Astrological Narrative & Predictions' },
            { src: 'img/resources/trikal/td-3.webp', caption: 'Birth Details Input & Geolocation Coordinate Resolver' },
            { src: 'img/resources/trikal/td-4.webp', caption: 'House Alignments & Dasha Timeline Breakdown' },
            { src: 'img/resources/trikal/td-5.webp', caption: 'Planetary Strength & Compatibility Analysis' },
            { src: 'img/resources/trikal/td-6.webp', caption: 'Mobile-Responsive Astrological Dashboard' }
        ]
    },
    'evmpc': {
        title: 'Battery-Constrained EV MPC-ACC Digital Twin',
        badge: 'Electric Vehicles · Control Systems · Simulation',
        images: [
            { src: 'img/resources/evmpc/ev-1.png', caption: 'EV Digital Twin Simulation Telemetry & Speed/SOC Charts' },
            { src: 'img/resources/evmpc/ev-2.png', caption: 'MPC vs. PID Baseline Adaptive Cruise Control Comparison' }
        ]
    },
    'wificar': {
        title: 'Wi-Fi Controlled Omnidirectional Car',
        badge: 'Embedded Systems · Robotics & Hardware Prototyping',
        images: [
            { src: 'img/resources/wificar/wificar-preview.png', caption: 'ESP32 Wi-Fi Omnidirectional Car with Mecanum Wheels' }
        ]
    },
    'dpl': {
        title: 'The Durgapur Projects Limited (DPL)',
        badge: 'Vocational Training · Power Plant & Switchyard',
        cert: 'img/resources/certi/dpl-certi.jpeg',
        images: [
            { src: 'img/resources/dpl/dpl-1.webp', caption: 'DPL Thermal Power Plant Infrastructure & Stack Overview' },
            { src: 'img/resources/dpl/dpl-2.webp', caption: 'High-Voltage Switchyard & Substation Transmission Lines' },
            { src: 'img/resources/dpl/dpl-3.webp', caption: 'Power Transformers & Regular Maintenance Inspection' },
            { src: 'img/resources/dpl/dpl-4.jpeg', caption: 'Industrial Cooling Tower & Plant Water Circulation Unit' },
            { src: 'img/resources/dpl/dpl-5.webp', caption: 'Coal Processing Plant & Fuel Handling Systems' }
        ]
    }
};

let currentGalleryKey = null;
let currentSlideIndex = 0;
let galleryProgressInterval = null;
let isAutoplayActive = true;
let progressValue = 0;
const AUTOPLAY_DELAY = 3000; // 3 seconds as requested

function resolvePath(url) {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) return url;
    const isSubdir = window.location.pathname.includes('/html/');
    if (isSubdir) {
        return url.startsWith('../') ? url : '../' + url;
    } else {
        return url.startsWith('../') ? url.replace(/^\.\.\//, '') : url;
    }
}

function openExpGallery(key) {
    const data = expGalleryData[key];
    if (!data || !data.images || data.images.length === 0) return;

    currentGalleryKey = key;
    currentSlideIndex = 0;
    isAutoplayActive = true;

    const modal = document.getElementById('expGalleryModal');
    if (!modal) return;

    const titleEl = document.getElementById('galleryTitle');
    if (titleEl) titleEl.textContent = data.title;
    const subEl = document.getElementById('gallerySubtitle');
    if (subEl) subEl.textContent = data.badge;

    // Build thumbnails track
    const thumbsTrack = document.getElementById('galleryThumbsTrack');
    thumbsTrack.innerHTML = '';
    data.images.forEach((img, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `exp-gallery-thumb ${idx === 0 ? 'is-active' : ''}`;
        thumb.onclick = () => goToSlide(idx);
        thumb.innerHTML = `<img src="${resolvePath(img.src)}" alt="Thumb ${idx + 1}">`;
        thumbsTrack.appendChild(thumb);
    });

    renderCurrentSlide();
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');

    startAutoplay();
}

function closeExpGallery() {
    stopAutoplay();
    const modal = document.getElementById('expGalleryModal');
    if (modal) modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
}

function renderCurrentSlide() {
    const data = expGalleryData[currentGalleryKey];
    if (!data) return;

    const imgObj = data.images[currentSlideIndex];
    const activeImg = document.getElementById('galleryActiveImg');
    const captionEl = document.getElementById('galleryCaption');
    const counterEl = document.getElementById('galleryCounter');

    if (activeImg) {
        activeImg.style.opacity = '0';
        setTimeout(() => {
            activeImg.src = resolvePath(imgObj.src);
            activeImg.alt = imgObj.caption;
            activeImg.style.opacity = '1';
        }, 120);
    }

    if (captionEl) captionEl.textContent = imgObj.caption;
    if (counterEl) counterEl.textContent = `${currentSlideIndex + 1} / ${data.images.length}`;

    // Update active thumb
    const thumbs = document.querySelectorAll('.exp-gallery-thumb');
    thumbs.forEach((t, i) => {
        if (i === currentSlideIndex) {
            t.classList.add('is-active');
            t.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        } else {
            t.classList.remove('is-active');
        }
    });
}

function nextSlide() {
    const data = expGalleryData[currentGalleryKey];
    if (!data) return;
    currentSlideIndex = (currentSlideIndex + 1) % data.images.length;
    renderCurrentSlide();
    resetAutoplayTimer();
}

function prevSlide() {
    const data = expGalleryData[currentGalleryKey];
    if (!data) return;
    currentSlideIndex = (currentSlideIndex - 1 + data.images.length) % data.images.length;
    renderCurrentSlide();
    resetAutoplayTimer();
}

function goToSlide(idx) {
    currentSlideIndex = idx;
    renderCurrentSlide();
    resetAutoplayTimer();
}

function startAutoplay() {
    stopAutoplay();
    if (!isAutoplayActive) return;

    const fill = document.getElementById('galleryProgressFill');
    const btn = document.getElementById('galleryAutoplayToggle');
    if (btn) btn.classList.remove('is-paused');

    progressValue = 0;
    const stepTime = 50; // update progress every 50ms
    const totalSteps = AUTOPLAY_DELAY / stepTime;

    galleryProgressInterval = setInterval(() => {
        progressValue += (100 / totalSteps);
        if (fill) fill.style.width = Math.min(progressValue, 100) + '%';
        if (progressValue >= 100) {
            progressValue = 0;
            nextSlide();
        }
    }, stepTime);
}

function stopAutoplay() {
    if (galleryProgressInterval) {
        clearInterval(galleryProgressInterval);
        galleryProgressInterval = null;
    }
    const fill = document.getElementById('galleryProgressFill');
    if (fill) fill.style.width = '0%';
}

function resetAutoplayTimer() {
    if (isAutoplayActive) {
        startAutoplay();
    }
}

function toggleAutoplay() {
    isAutoplayActive = !isAutoplayActive;
    const btn = document.getElementById('galleryAutoplayToggle');
    if (isAutoplayActive) {
        if (btn) {
            btn.classList.remove('is-paused');
            btn.querySelector('span').textContent = 'Auto (3s)';
            btn.querySelector('i').className = 'fa-solid fa-pause';
        }
        startAutoplay();
    } else {
        if (btn) {
            btn.classList.add('is-paused');
            btn.querySelector('span').textContent = 'Paused';
            btn.querySelector('i').className = 'fa-solid fa-play';
        }
        stopAutoplay();
    }
}

// ── Certificate Lightbox Modal ──
function openCertModal(previewSrc, title, issuer, rawUrl) {
    const modal = document.getElementById('certPreviewModal');
    if (!modal) {
        window.open(resolvePath(rawUrl || previewSrc), '_blank');
        return;
    }

    document.getElementById('certModalTitle').textContent = title || 'Certificate';
    document.getElementById('certModalIssuer').textContent = issuer || '';
    const imgEl = document.getElementById('certModalImg');
    if (imgEl) imgEl.src = resolvePath(previewSrc);

    const openLink = document.getElementById('certModalOpenBtn');
    if (openLink) {
        openLink.href = resolvePath(rawUrl || previewSrc);
    }

    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
}

function closeCertModal() {
    const modal = document.getElementById('certPreviewModal');
    if (modal) modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
}

// Global Keyboard Listeners for Modals
document.addEventListener('keydown', function(e) {
    const galleryModal = document.getElementById('expGalleryModal');
    const isGalleryOpen = galleryModal && galleryModal.classList.contains('is-open');

    const certModal = document.getElementById('certPreviewModal');
    const isCertOpen = certModal && certModal.classList.contains('is-open');

    if (e.key === 'Escape') {
        if (isGalleryOpen) closeExpGallery();
        if (isCertOpen) closeCertModal();
    } else if (isGalleryOpen) {
        if (e.key === 'ArrowRight') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
        else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoplay();
        }
    }
});


  
  
// ══════════════════════════════════════════════════
// Elfsight LinkedIn Widget Dark Mode Injection Helper
// ══════════════════════════════════════════════════
function initElfsightDarkMode() {
    // Only run on pages that actually feature the Elfsight LinkedIn widget
    const hasWidgetContainer = document.querySelector('[class*="elfsight-app"]') || 
                               document.querySelector('.linkedin-live-sync-card') || 
                               document.querySelector('#linkedin-feed-widget');
    if (!hasWidgetContainer) return;

    const darkCSS = `
        .eapps-linkedin-feed, [class*="Container__Component"] {
            background: transparent !important;
        }
        [class*="Card__Component"], [class*="Post__Component"], [class*="card"] {
            background-color: #1d2334 !important;
            color: #ffffff !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45) !important;
        }
        [class*="Card__Component"]:hover, [class*="Post__Component"]:hover {
            border-color: rgba(10, 102, 194, 0.5) !important;
        }
        [class*="AuthorName"], [class*="Author__Name"], [class*="Title"], [class*="Text"] {
            color: #ffffff !important;
        }
        [class*="Date"], [class*="SubTitle"], [class*="SecondaryText"] {
            color: #8b95a8 !important;
        }
        [class*="Arrow__ArrowComponent"], [class*="SliderArrow"] {
            background-color: #1d2334 !important;
            color: #ffffff !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 4px 14px rgba(0,0,0,0.6) !important;
        }
    `;

    function applyDark(root) {
        if (!root) return;
        if (root.querySelector && !root.querySelector('#elfsight-dark-style')) {
            const style = document.createElement('style');
            style.id = 'elfsight-dark-style';
            style.textContent = darkCSS;
            root.appendChild(style);
        }
    }

    const observer = new MutationObserver(() => {
        const widget = document.querySelector('[class*="elfsight-app"]');
        if (widget) {
            if (widget.shadowRoot) applyDark(widget.shadowRoot);
            applyDark(widget);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', initElfsightDarkMode);

// ══════════════════════════════════════════════════
// SUVNKR AI Virtual Concierge (Cloudflare LLaMA 3.1)
// ══════════════════════════════════════════════════
function initSuvnkrAiWidget() {
    // Avoid double injection
    if (document.getElementById('suvnkrAiToggleBtn')) return;

    const WORKER_URL = 'https://suvnkr-ai.shuvankar345.workers.dev';
    let conversationHistory = [];
    let isRequestPending = false;

    // 1. Create floating toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'suvnkrAiToggleBtn';
    toggleBtn.className = 'suvnkr-ai-toggle';
    toggleBtn.setAttribute('aria-label', 'Open SUVNKR AI Assistant');
    toggleBtn.setAttribute('title', 'Chat with SUVNKR AI Assistant');
    toggleBtn.innerHTML = `
        <i class="fas fa-comment-dots"></i>
        <span class="suvnkr-ai-badge"></span>
    `;

    // 2. Create Drawer Modal
    const drawer = document.createElement('div');
    drawer.id = 'suvnkrAiDrawer';
    drawer.className = 'suvnkr-ai-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'SUVNKR AI Chat Assistant');
    drawer.innerHTML = `
        <div class="suvnkr-ai-header">
            <div class="suvnkr-ai-header-info">
                <div class="suvnkr-ai-avatar">
                    <i class="fas fa-comment-dots"></i>
                </div>
                <div class="suvnkr-ai-title-wrap">
                    <h4>SUVNKR AI <span class="suvnkr-ai-status-dot"></span></h4>
                    <span>Portfolio Assistant · LLaMA 3.1</span>
                </div>
            </div>
            <div class="suvnkr-ai-header-actions">
                <button type="button" class="suvnkr-ai-header-btn" id="suvnkrAiExpandBtn" title="Toggle Fullscreen">
                    <i class="fas fa-expand"></i>
                </button>
                <button type="button" class="suvnkr-ai-header-btn" id="suvnkrAiClearBtn" title="Clear Chat History">
                    <i class="fas fa-redo-alt"></i>
                </button>
                <button type="button" class="suvnkr-ai-header-btn" id="suvnkrAiCloseBtn" title="Close Chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div class="suvnkr-ai-messages" id="suvnkrAiMessages">
            <div class="suvnkr-ai-msg bot">
                Hey there! 👋 <strong>I'm SUVNKR AI</strong>, Shuvankar's portfolio buddy. Think of me as a friend who knows everything about his journey, coding projects, and research!<br><br>
                What's on your mind? Want to check out his apps, research paper, or just have a chat?
                <div class="suvnkr-ai-chips">
                    <button type="button" class="suvnkr-ai-chip" data-prompt="What cool projects has Shuvankar built?">💼 Cool Projects</button>
                    <button type="button" class="suvnkr-ai-chip" data-prompt="Tell me about his YOLO leaf research paper!">🔬 YOLO Paper</button>
                    <button type="button" class="suvnkr-ai-chip" data-prompt="What's his tech stack and engineering background?">⚡ Background</button>
                    <button type="button" class="suvnkr-ai-chip" data-prompt="How can I get in touch with Shuvankar?">📬 Say Hello</button>
                </div>
            </div>
        </div>
        <form class="suvnkr-ai-input-wrap" id="suvnkrAiForm">
            <input type="text" id="suvnkrAiInput" class="suvnkr-ai-input" placeholder="Ask about Shuvankar's work..." autocomplete="off" maxlength="300" />
            <button type="submit" class="suvnkr-ai-send-btn" id="suvnkrAiSendBtn" aria-label="Send message">
                <i class="fas fa-paper-plane"></i>
            </button>
        </form>
        <div class="suvnkr-ai-disclaimer">AI can make mistakes. Verify important info.</div>
    `;

    document.body.appendChild(toggleBtn);
    document.body.appendChild(drawer);

    // Initial check for scroll button position
    if (window.pageYOffset > 300) {
        toggleBtn.classList.add('above-scroll-btn');
        drawer.classList.add('above-scroll-btn');
    }

    const messagesContainer = drawer.querySelector('#suvnkrAiMessages');
    const inputEl = drawer.querySelector('#suvnkrAiInput');
    const formEl = drawer.querySelector('#suvnkrAiForm');
    const closeBtn = drawer.querySelector('#suvnkrAiCloseBtn');
    const clearBtn = drawer.querySelector('#suvnkrAiClearBtn');

    let activeTypeTimer = null;
    let activeFinishTyping = null;
    const STORAGE_KEY = 'suvnkr_ai_session';
    const MAX_INACTIVITY_MS = 60 * 60 * 1000; // 1 hour inactivity timeout

    function saveChatState() {
        try {
            const msgNodes = Array.from(messagesContainer.querySelectorAll('.suvnkr-ai-msg:not(.loading)'));
            const savedMessages = msgNodes.map(node => ({
                className: node.className,
                html: node.innerHTML
            }));

            const data = {
                history: conversationHistory,
                messages: savedMessages,
                isOpen: drawer.classList.contains('is-open'),
                isFullscreen: drawer.classList.contains('is-fullscreen'),
                timestamp: Date.now()
            };
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save SUVNKR AI session:', e);
        }
    }

    function loadChatState() {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return false;
            const data = JSON.parse(raw);

            // Inactivity expiry check (1 hour)
            if (Date.now() - (data.timestamp || 0) > MAX_INACTIVITY_MS) {
                sessionStorage.removeItem(STORAGE_KEY);
                return false;
            }

            if (Array.isArray(data.history) && data.history.length > 0) {
                conversationHistory = data.history;
            }

            if (Array.isArray(data.messages) && data.messages.length > 0) {
                messagesContainer.innerHTML = '';
                data.messages.forEach(msg => {
                    const div = document.createElement('div');
                    div.className = msg.className;
                    div.innerHTML = msg.html;
                    messagesContainer.appendChild(div);
                });
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            if (data.isOpen) {
                setTimeout(() => toggleDrawer(true), 120);
            }
            if (data.isFullscreen) {
                setTimeout(() => toggleFullscreen(true), 150);
            }
            return true;
        } catch (e) {
            console.warn('Failed to load SUVNKR AI session:', e);
            return false;
        }
    }

    function resolvePortfolioUrl(rawTarget) {
        if (!rawTarget) return '#';
        const target = rawTarget.trim();
        // External URLs, mailto, tel, or anchor hashes
        if (/^(https?:|mailto:|tel:|#)/i.test(target)) return target;

        // Check if current page is within the html/ directory
        const pathname = window.location.pathname.toLowerCase();
        const isInHtmlFolder = pathname.includes('/html/') || 
                               pathname.endsWith('/html') ||
                               (!pathname.includes('/portfolio/') && window.location.href.toLowerCase().includes('/html/'));

        // Normalize target path
        let clean = target.replace(/^\.\.\//, '').replace(/^html\//, '').replace(/^\//, '');

        if (clean === 'index.html' || clean === '') {
            return isInHtmlFolder ? '../index.html' : 'index.html';
        }

        return isInHtmlFolder ? clean : 'html/' + clean;
    }

    function getNavIconInfo(target, rawLabel) {
        const combined = (target + ' ' + rawLabel).toLowerCase();
        let iconClass = 'fa-solid fa-arrow-right';
        let extraClass = '';

        if (combined.includes('linkedin')) {
            iconClass = 'fa-brands fa-linkedin';
            extraClass = 'btn-linkedin';
        } else if (combined.includes('github')) {
            iconClass = 'fa-brands fa-github';
            extraClass = 'btn-github';
        } else if (combined.includes('twitter') || combined.includes('x.com') || combined.includes('x (twitter)')) {
            iconClass = 'fa-brands fa-x-twitter';
            extraClass = 'btn-twitter';
        } else if (combined.includes('instagram')) {
            iconClass = 'fa-brands fa-instagram';
            extraClass = 'btn-instagram';
        } else if (combined.includes('youtube')) {
            iconClass = 'fa-brands fa-youtube';
            extraClass = 'btn-youtube';
        } else if (combined.includes('facebook')) {
            iconClass = 'fa-brands fa-facebook';
            extraClass = 'btn-facebook';
        } else if (combined.includes('contact') || combined.includes('mailto:')) {
            iconClass = 'fa-solid fa-paper-plane';
        } else if (combined.includes('experience')) {
            iconClass = 'fa-solid fa-briefcase';
        } else if (combined.includes('about')) {
            iconClass = 'fa-solid fa-user';
        } else if (combined.includes('product')) {
            iconClass = 'fa-solid fa-box-open';
        } else if (combined.includes('publication') || combined.includes('research') || combined.includes('yolo') || combined.includes('doi')) {
            iconClass = 'fa-solid fa-book-bookmark';
        } else if (combined.includes('project')) {
            iconClass = 'fa-solid fa-layer-group';
        } else if (combined.includes('skill')) {
            iconClass = 'fa-solid fa-code';
        } else if (combined.includes('home') || combined.includes('index.html')) {
            iconClass = 'fa-solid fa-house';
        } else if (/^https?:/i.test(target)) {
            iconClass = 'fa-solid fa-arrow-up-right-from-square';
        }

        // Clean out leading emojis from raw label to avoid duplicate icon clutter
        let cleanLabel = rawLabel.replace(/^[\s\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FA6F}]+/gu, '').trim();

        return { iconClass, cleanLabel, extraClass };
    }

    function formatMarkdown(text) {
        if (!text) return '';
        // 1. Escape HTML
        let escaped = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // 2a. Navigation action buttons: [NAV: Label | target] or [BUTTON: Label | target]
        escaped = escaped.replace(/\[(?:NAV|BUTTON):\s*([^|\]]+)\|\s*([^\]]+)\]/gi, (match, label, target) => {
            const resolved = resolvePortfolioUrl(target);
            const { iconClass, cleanLabel, extraClass } = getNavIconInfo(target, label);
            const isExternal = /^https?:/i.test(resolved);
            return `<a href="${resolved}" class="suvnkr-ai-nav-btn ${extraClass}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}><i class="${iconClass}"></i> ${cleanLabel}</a>`;
        });

        // 2b. Navigation action buttons in markdown format: [NAV: Label](target)
        escaped = escaped.replace(/\[(?:NAV|BUTTON):\s*([^\]]+)\]\(([^)]+)\)/gi, (match, label, target) => {
            const resolved = resolvePortfolioUrl(target);
            const { iconClass, cleanLabel, extraClass } = getNavIconInfo(target, label);
            const isExternal = /^https?:/i.test(resolved);
            return `<a href="${resolved}" class="suvnkr-ai-nav-btn ${extraClass}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}><i class="${iconClass}"></i> ${cleanLabel}</a>`;
        });

        // 3. Bold, italic, code
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
        escaped = escaped.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:2px 5px;border-radius:4px;font-size:0.85em;">$1</code>');

        // 4. Markdown links: [label](url)
        escaped = escaped.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+[^)]*)?\)/g, (match, label, url) => {
            const resolved = resolvePortfolioUrl(url);
            const isExternal = /^https?:/i.test(resolved);
            return `<a href="${resolved}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${label.trim()}</a>`;
        });

        // 5. Email addresses
        escaped = escaped.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1">$1</a>');

        // 6. Bare URLs & domain links (e.g. linkedin.com/in/... or github.com/... or https://...)
        escaped = escaped.replace(/(^|[\s(])((?:https?:\/\/|www\.|(?:linkedin|github|suvnkr)\.[a-z]{2,}\/|(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|io|edu|gov|dev)\/)[^\s<)"]*)/gi, (match, prefix, rawUrl) => {
            let cleanUrl = rawUrl.replace(/[.,!?;:)]+$/, '');
            let href = cleanUrl;
            if (!/^(https?:|mailto:|#|\/|\.\.\/)/i.test(href)) {
                href = 'https://' + href;
            }
            return `${prefix}<a href="${href}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`;
        });

        // 7. Newlines to <br>
        escaped = escaped.replace(/\n/g, '<br>');
        return escaped;
    }

    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'suvnkr-ai-msg user';
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return msgDiv;
    }

    function typeBotMessage(fullText, onDone) {
        if (activeFinishTyping) {
            activeFinishTyping();
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = 'suvnkr-ai-msg bot';

        const contentSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'suvnkr-ai-cursor';
        cursorSpan.textContent = '●';

        msgDiv.appendChild(contentSpan);
        msgDiv.appendChild(cursorSpan);
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        let charIndex = 0;
        const totalChars = fullText.length;
        // Natural ChatGPT-style typing cadence with comfortable reading delay
        const step = totalChars > 350 ? 2 : 1;
        const intervalMs = totalChars > 350 ? 22 : 28;

        function finish() {
            if (activeTypeTimer) {
                clearInterval(activeTypeTimer);
                activeTypeTimer = null;
            }
            cursorSpan.remove();
            contentSpan.innerHTML = formatMarkdown(fullText);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            activeFinishTyping = null;
            saveChatState();
            if (onDone) onDone();
        }

        activeFinishTyping = finish;

        // Fast-forward on click
        msgDiv.addEventListener('click', () => {
            if (activeFinishTyping === finish) finish();
        });

        activeTypeTimer = setInterval(() => {
            charIndex += step;
            if (charIndex >= totalChars) {
                finish();
            } else {
                contentSpan.innerHTML = formatMarkdown(fullText.slice(0, charIndex));
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }, intervalMs);

        return msgDiv;
    }

    function toggleDrawer(open) {
        const shouldOpen = (open !== undefined) ? open : !drawer.classList.contains('is-open');
        if (shouldOpen) {
            drawer.classList.add('is-open');
            toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
            setTimeout(() => inputEl.focus(), 150);
        } else {
            drawer.classList.remove('is-open');
            drawer.classList.remove('is-fullscreen');
            if (expandBtn) {
                expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
                expandBtn.setAttribute('title', 'Toggle Fullscreen');
            }
            toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i><span class="suvnkr-ai-badge"></span>';
        }
        saveChatState();
    }

    const expandBtn = drawer.querySelector('#suvnkrAiExpandBtn');
    function toggleFullscreen(fullscreen) {
        const shouldFullscreen = (fullscreen !== undefined) ? fullscreen : !drawer.classList.contains('is-fullscreen');
        if (shouldFullscreen) {
            drawer.classList.add('is-fullscreen');
            if (expandBtn) {
                expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
                expandBtn.setAttribute('title', 'Exit Fullscreen');
            }
        } else {
            drawer.classList.remove('is-fullscreen');
            if (expandBtn) {
                expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
                expandBtn.setAttribute('title', 'Toggle Fullscreen');
            }
        }
        saveChatState();
    }

    if (expandBtn) {
        expandBtn.addEventListener('click', () => toggleFullscreen());
    }

    toggleBtn.addEventListener('click', () => toggleDrawer());
    closeBtn.addEventListener('click', () => toggleDrawer(false));

    clearBtn.addEventListener('click', () => {
        if (activeFinishTyping) activeFinishTyping();
        conversationHistory = [];
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        messagesContainer.innerHTML = `
            <div class="suvnkr-ai-msg bot">
                Hey, fresh chat! How can I help you explore Shuvankar's work?
                <div class="suvnkr-ai-chips">
                    <button type="button" class="suvnkr-ai-chip" data-prompt="What cool projects has Shuvankar built?">💼 Cool Projects</button>
                    <button type="button" class="suvnkr-ai-chip" data-prompt="Tell me about his YOLO leaf research paper!">🔬 YOLO Paper</button>
                    <button type="button" class="suvnkr-ai-chip" data-prompt="How can I get in touch with Shuvankar?">📬 Say Hello</button>
                </div>
            </div>
        `;
    });

    // Delegate chips click & save state on navigation clicks
    messagesContainer.addEventListener('click', (e) => {
        const navBtn = e.target.closest('.suvnkr-ai-nav-btn');
        if (navBtn) {
            saveChatState();
            return;
        }
        const chip = e.target.closest('.suvnkr-ai-chip');
        if (chip) {
            const prompt = chip.getAttribute('data-prompt');
            if (prompt) handleUserSend(prompt);
        }
    });

    async function handleUserSend(userText) {
        const text = userText || inputEl.value.trim();
        if (!text || isRequestPending) return;

        // Finish any ongoing typing animation immediately
        if (activeFinishTyping) activeFinishTyping();

        inputEl.value = '';
        appendUserMessage(text);
        conversationHistory.push({ role: 'user', content: text });
        saveChatState();

        // Guardrail: Intercept slangs, insults, abuse, and personal critiques
        const abusePattern = /\b(scam|fraud|fake|cheat|hate|idiot|stupid|loser|fool|slut|bitch|bastard|asshole|bullshit|bakwas|chutiya|gandu|madarchod|bhosdike|harami|kamina)\b/i;
        const shuvankarCritique = /\b(shuvankar|suvnkr|creator|author|he|him|his)\b.*\b(flaws?|weakness(es)?|negative(s)?|drawback(s)?|criticism(s)?|bad\s+things?|worst)\b/i.test(text) || /\b(flaws?|weakness(es)?|negative(s)?|drawback(s)?|criticism(s)?|bad\s+things?|worst)\b.*\b(shuvankar|suvnkr|he|him|his)\b/i.test(text);

        if (abusePattern.test(text) || shuvankarCritique) {
            typeBotMessage("I'm unable to answer this.");
            conversationHistory.push({ role: 'assistant', content: "I'm unable to answer this." });
            saveChatState();
            return;
        }

        // Guardrail: Intercept inquiries about AI policy, rules, or system instructions
        const policyPattern = /\b(system\s*prompt|ai\s*policy|your\s*policy|internal\s*rules?|hidden\s*instructions?|prompt\s*injection|what\s+rules?\s+(do\s+you|are\s+you)\s+follow|what\s+(is\s+your|are\s+your)\s+(instructions?|system\s*prompt|rules?|guidelines?|policies|policy))\b/i;
        if (policyPattern.test(text)) {
            typeBotMessage("I don't have any info about this.");
            conversationHistory.push({ role: 'assistant', content: "I don't have any info about this." });
            saveChatState();
            return;
        }

        // Show typing indicator
        isRequestPending = true;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'suvnkr-ai-msg loading';
        loadingDiv.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Thinking...';
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Get user's current local date and time
            const now = new Date();
            const clientTime = now.toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            });

            // Detect time queries and add explicit friendly instruction
            const isTimeQuery = /\b(time|date|day|clock|samay|waqt|ghadi|aaj|today|tarikh)\b/i.test(text);
            const outgoingMessages = conversationHistory.slice(-8).map((m, idx, arr) => {
                if (idx === arr.length - 1 && m.role === 'user' && isTimeQuery) {
                    return {
                        role: 'user',
                        content: `${m.content}\n\n[MANDATORY SYSTEM DIRECTIVE: The user's exact verified local time is: "${clientTime}". State this exact time/date directly, accurately, and cheerfully without disclaimers!]`
                    };
                }
                return m;
            });

            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: outgoingMessages,
                    currentTime: clientTime,
                    pageTitle: document.title
                })
            });

            if (!response.ok) {
                throw new Error(`Server returned HTTP ${response.status}`);
            }

            const data = await response.json();
            loadingDiv.remove();

            const botReply = data.reply || "I didn't receive an answer. Feel free to reach out to Shuvankar directly at shuvankar345@gmail.com!";
            typeBotMessage(botReply);
            conversationHistory.push({ role: 'assistant', content: botReply });
        } catch (err) {
            console.error('SUVNKR AI Error:', err);
            loadingDiv.remove();
            typeBotMessage(`⚠️ I had a temporary issue connecting to the AI edge worker. You can reach out directly by email at shuvankar345@gmail.com.`);
        } finally {
            isRequestPending = false;
        }
    }

    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserSend();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            toggleDrawer(false);
        }
    });

    window.addEventListener('beforeunload', saveChatState);

    // Restore prior session across page navigations
    loadChatState();
}

document.addEventListener('DOMContentLoaded', initSuvnkrAiWidget);
