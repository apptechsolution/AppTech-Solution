// =============================================
// JSON-LD Structured Data for SEO
// =============================================
const ldJsonScript = document.createElement('script');
ldJsonScript.type = 'application/ld+json';
ldJsonScript.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AppTech Solutions",
  "url": "https://apptechofficial.github.io/AppTech/",
  "logo": "https://apptechofficial.github.io/AppTech/favicon.ico",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+260975212655",
    "contactType": "customer service",
    "areaServed": "ZM"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ndola",
    "addressCountry": "ZM"
  }
});
document.head.appendChild(ldJsonScript);

// =============================================
// Smooth Scrolling for Nav Links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =============================================
// Navbar Scroll Effect (frosted glass on scroll)
// =============================================
const navbar = document.querySelector('.navbar');
if (navbar) {
    const handleNavbarScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}

// =============================================
// Scroll Reveal — Programmatic Setup
// =============================================
/**
 * Assign .reveal + directional classes to elements that should
 * animate in on scroll. Directional variants:
 *   (default)  — fade up
 *   from-left  — fade from left
 *   from-right — fade from right
 *   scale-up   — scale + fade up
 */
function setupReveal() {
    const rules = [
        // Selector                         Extra classes
        { sel: '.section-title',            cls: [] },
        { sel: '.section-subtitle',         cls: [] },
        { sel: '.welcome-tag',              cls: [] },
        { sel: '.welcome-section h2',       cls: [] },
        { sel: '.welcome-text',             cls: [] },
        { sel: '.welcome-divider',          cls: [] },   // handled via width/opacity in CSS
        { sel: '.founder-card',             cls: ['scale-up'] },
        { sel: '.value-item',               cls: ['from-left'] },
        { sel: '.card',                     cls: ['scale-up'] },
        { sel: '.pricing-card',             cls: ['scale-up'] },
        { sel: '.net-item',                 cls: ['from-left'] },
        { sel: '.category-title',           cls: ['from-left'] },
        { sel: '.pricing-note',             cls: [] },
        { sel: '.contact-info',             cls: ['from-left'] },
        { sel: '.contact-form',             cls: ['from-right'] },
        { sel: 'footer',                    cls: [] },
    ];

    rules.forEach(({ sel, cls }) => {
        document.querySelectorAll(sel).forEach(el => {
            if (el.classList.contains('reveal')) return; // already processed
            el.classList.add('reveal', ...cls);
        });
    });
}

/**
 * Apply staggered transition-delays to child elements within grid containers.
 * This creates a cascade effect where cards appear one after another.
 * After each element reveals, its delay is reset to 0 so hover transitions
 * remain snappy.
 */
function applyStagger() {
    const groups = [
        '.grid',
        '.values-grid',
        '.pricing-row',
        '.founders-grid',
        '.networking-row',
    ];

    groups.forEach(groupSel => {
        document.querySelectorAll(groupSel).forEach(group => {
            Array.from(group.children).forEach((child, i) => {
                const delay = i * 0.12;
                child.style.transitionDelay = `${delay}s`;

                // Reset delay after animation so hover effects stay instant
                child.addEventListener('transitionend', () => {
                    if (child.classList.contains('visible')) {
                        child.style.transitionDelay = '0s';
                    }
                }, { once: true });
            });
        });
    });
}

// =============================================
// Intersection Observer — Trigger Reveals
// =============================================
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // fire once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// =============================================
// Init on DOM Ready
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    setupReveal();
    applyStagger();
    initObserver();
});
