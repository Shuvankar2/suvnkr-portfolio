

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
          'img/bg-landing.jpg',
          'img/bg-landing2.jpg',
          'img/bg-landing3.jpg'
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
            { src: 'img/resources/ongc/ongc-2.jpeg', caption: 'Industrial Electrical Control Panel & Monitoring System' },
            { src: 'img/resources/ongc/ongc-3.jpeg', caption: 'High-Voltage Machinery & Rig Power Units' },
            { src: 'img/resources/ongc/ongc-4.jpeg', caption: 'Diesel Generator Backup & Distribution Layout' },
            { src: 'img/resources/ongc/ongc-5.jpeg', caption: 'Substation Field Work & Safety Protocol Review' },
            { src: 'img/resources/ongc/ongc-6.jpeg', caption: 'Heavy Drilling Machinery & Operational Grounding' },
            { src: 'img/resources/ongc/ongc-7.jpeg', caption: 'Technical Trainee Inspection Team at ONGC Facility' }
        ]
    },
    'noteloom': {
        title: 'Eduspace (formerly Note Loom)',
        badge: 'Multi-Tenant Academic ERP & AI Platform (In Development)',
        images: [
            { src: 'img/resources/noteloom/noteloom-2.png', caption: 'Eduspace Multi-Tenant Institutional Administration Dashboard' },
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
            { src: 'img/resources/gotiprep/gp-1.png', caption: 'GotiPrep Exam Dashboard & Assessment Categories' },
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
            { src: 'img/resources/hotelease/he-4.png', caption: 'Restaurant POS Billing & Order Management Module' },
            { src: 'img/resources/hotelease/he-5.png', caption: 'Automated Itemized Invoicing & Tax Computation' },
            { src: 'img/resources/hotelease/he-6.png', caption: 'Staff Management & Local System Configuration' }
        ]
    },
    'kagazly': {
        title: 'Kagazly — Cloud Document & PDF Utilities',
        badge: 'Productivity Platform · Browser-Based WASM Tools',
        images: [
            { src: 'img/resources/kagazly/kg-1.png', caption: 'Kagazly Utility Suite & Document Workspace' },
            { src: 'img/resources/kagazly/kg-2.png', caption: 'PDF Merging, Splitting & Reorganization Tool' },
            { src: 'img/resources/kagazly/kg-3.png', caption: 'Compression Engine & Client-Side Processing' },
            { src: 'img/resources/kagazly/kg-4.png', caption: 'Watermarking & Format Conversion Interface' }
        ]
    },
    'trikal': {
        title: 'Trikal Darshi — Vedic Astrology Platform',
        badge: 'Planetary Computation & AI Interpretations',
        images: [
            { src: 'img/resources/trikal/td-1.png', caption: 'Trikal Darshi Natal Chart & Planetary Calculation View' },
            { src: 'img/resources/trikal/td-2.png', caption: 'AI-Generated Astrological Narrative & Predictions' },
            { src: 'img/resources/trikal/td-3.png', caption: 'Birth Details Input & Geolocation Coordinate Resolver' },
            { src: 'img/resources/trikal/td-4.png', caption: 'House Alignments & Dasha Timeline Breakdown' },
            { src: 'img/resources/trikal/td-5.png', caption: 'Planetary Strength & Compatibility Analysis' },
            { src: 'img/resources/trikal/td-6.png', caption: 'Mobile-Responsive Astrological Dashboard' }
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
            { src: 'img/resources/dpl/dpl-1.jpeg', caption: 'DPL Thermal Power Plant Infrastructure & Stack Overview' },
            { src: 'img/resources/dpl/dpl-2.jpeg', caption: 'High-Voltage Switchyard & Substation Transmission Lines' },
            { src: 'img/resources/dpl/dpl-3.jpeg', caption: 'Power Transformers & Regular Maintenance Inspection' },
            { src: 'img/resources/dpl/dpl-4.jpeg', caption: 'Industrial Cooling Tower & Plant Water Circulation Unit' },
            { src: 'img/resources/dpl/dpl-5.jpeg', caption: 'Coal Processing Plant & Fuel Handling Systems' }
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
    toggleBtn.setAttribute('title', 'Chat with SUVNKR AI Concierge');
    toggleBtn.innerHTML = `
        <i class="fas fa-robot"></i>
        <span class="suvnkr-ai-badge"></span>
    `;

    // 2. Create Drawer Modal
    const drawer = document.createElement('div');
    drawer.id = 'suvnkrAiDrawer';
    drawer.className = 'suvnkr-ai-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'SUVNKR AI Chat Concierge');
    drawer.innerHTML = `
        <div class="suvnkr-ai-header">
            <div class="suvnkr-ai-header-info">
                <div class="suvnkr-ai-avatar">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="suvnkr-ai-title-wrap">
                    <h4>SUVNKR AI <span class="suvnkr-ai-status-dot"></span></h4>
                    <span>Portfolio Concierge · LLaMA 3.1</span>
                </div>
            </div>
            <div class="suvnkr-ai-header-actions">
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
                    <span class="suvnkr-ai-chip" data-prompt="What cool projects has Shuvankar built?">💼 Cool Projects</span>
                    <span class="suvnkr-ai-chip" data-prompt="Tell me about his YOLO leaf research paper!">🔬 YOLO Paper</span>
                    <span class="suvnkr-ai-chip" data-prompt="What's his tech stack and engineering background?">⚡ Background</span>
                    <span class="suvnkr-ai-chip" data-prompt="How can I get in touch with Shuvankar?">📬 Say Hello</span>
                </div>
            </div>
        </div>
        <form class="suvnkr-ai-input-wrap" id="suvnkrAiForm">
            <input type="text" id="suvnkrAiInput" class="suvnkr-ai-input" placeholder="Ask about Shuvankar's work..." autocomplete="off" maxlength="300" />
            <button type="submit" class="suvnkr-ai-send-btn" id="suvnkrAiSendBtn" aria-label="Send message">
                <i class="fas fa-paper-plane"></i>
            </button>
        </form>
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

    function formatMarkdown(text) {
        if (!text) return '';
        let escaped = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
        escaped = escaped.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:2px 5px;border-radius:4px;font-size:0.85em;">$1</code>');
        escaped = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        escaped = escaped.replace(/(^|[^">])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
        escaped = escaped.replace(/\n/g, '<br>');
        return escaped;
    }

    function appendMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `suvnkr-ai-msg ${role}`;
        if (role === 'user') {
            msgDiv.textContent = text;
        } else {
            msgDiv.innerHTML = formatMarkdown(text);
        }
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
            toggleBtn.innerHTML = '<i class="fas fa-robot"></i><span class="suvnkr-ai-badge"></span>';
        }
    }

    toggleBtn.addEventListener('click', () => toggleDrawer());
    closeBtn.addEventListener('click', () => toggleDrawer(false));

    clearBtn.addEventListener('click', () => {
        conversationHistory = [];
        messagesContainer.innerHTML = `
            <div class="suvnkr-ai-msg bot">
                Hey, fresh chat! How can I help you explore Shuvankar's work?
                <div class="suvnkr-ai-chips">
                    <span class="suvnkr-ai-chip" data-prompt="What cool projects has Shuvankar built?">💼 Cool Projects</span>
                    <span class="suvnkr-ai-chip" data-prompt="Tell me about his YOLO leaf research paper!">🔬 YOLO Paper</span>
                    <span class="suvnkr-ai-chip" data-prompt="How can I get in touch with Shuvankar?">📬 Say Hello</span>
                </div>
            </div>
        `;
    });

    // Delegate chips click
    messagesContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.suvnkr-ai-chip');
        if (chip) {
            const prompt = chip.getAttribute('data-prompt');
            if (prompt) handleUserSend(prompt);
        }
    });

    async function handleUserSend(userText) {
        const text = userText || inputEl.value.trim();
        if (!text || isRequestPending) return;

        inputEl.value = '';
        appendMessage('user', text);
        conversationHistory.push({ role: 'user', content: text });

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

            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: conversationHistory.slice(-8), // Send recent context window
                    currentTime: clientTime,
                    pageTitle: document.title
                })
            });

            if (!response.ok) {
                throw new Error(`Server returned HTTP ${response.status}`);
            }

            const data = await response.json();
            loadingDiv.remove();

            const botReply = data.reply || "I didn't receive an answer. Please feel free to email Shuvankar directly at shuvankar345@gmail.com!";
            appendMessage('bot', botReply);
            conversationHistory.push({ role: 'assistant', content: botReply });
        } catch (err) {
            console.error('SUVNKR AI Error:', err);
            loadingDiv.remove();
            appendMessage('bot', `⚠️ I had a temporary issue connecting to the AI edge worker. You can reach out directly via the contact form or email at <a href="mailto:shuvankar345@gmail.com">shuvankar345@gmail.com</a>.`);
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
}

document.addEventListener('DOMContentLoaded', initSuvnkrAiWidget);
