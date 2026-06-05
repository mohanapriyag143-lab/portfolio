/* ============================================================
   MOHANA PRIYA G — Portfolio JavaScript
   Features: Loader, AOS, Typed.js, Theme Toggle, Counters,
             Skill Bars, Scroll Progress, Nav Highlight, Form
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────
   1. LOADING SCREEN
───────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      document.body.style.overflow = 'visible';
    }, 1900);
  }
});

document.body.style.overflow = 'hidden';

/* ─────────────────────────────────────────
   2. AOS INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
  });

  initTyped();
  initNavbar();
  initThemeToggle();
  initScrollProgress();
  initScrollTop();
  initSkillBars();
  initCounters();
  initContactForm();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initGalleryHover();
});

/* ─────────────────────────────────────────
   3. TYPED.JS — Typing Effect
───────────────────────────────────────── */
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  new Typed('#typedText', {
    strings: [
      'AI & Data Science Student',
      'Python Developer',
      'Generative AI Enthusiast',
      'Agentic AI Builder',
      'Technical Trainer',
      'n8n Automation Expert',
      'Aspiring ML Engineer',
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 500,
    loop: true,
    showCursor: false,
  });
}

/* ─────────────────────────────────────────
   4. NAVBAR — Sticky + Scrolled Class
───────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─────────────────────────────────────────
   5. MOBILE MENU
───────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const overlay   = document.getElementById('navOverlay');
  if (!hamburger || !navMenu) return;

  const close = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    if (overlay) overlay.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  if (overlay) overlay.addEventListener('click', close);

  // Close on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

/* ─────────────────────────────────────────
   6. THEME TOGGLE — Dark / Light
───────────────────────────────────────── */
function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;
  if (!btn || !icon) return;

  // Persist preference
  const saved = localStorage.getItem('mpg-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateIcon(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('mpg-theme', next);
    updateIcon(next);

    // Spin animation
    btn.style.transform = 'rotate(360deg)';
    setTimeout(() => (btn.style.transform = ''), 400);
  });

  function updateIcon(theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* ─────────────────────────────────────────
   7. SCROLL PROGRESS BAR
───────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled  = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────
   8. SCROLL-TO-TOP BUTTON
───────────────────────────────────────── */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────
   9. ACTIVE NAV LINK on Scroll
───────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ─────────────────────────────────────────
   10. SMOOTH SCROLL for anchor links
───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────
   11. SKILL PROGRESS BARS
───────────────────────────────────────── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width') || '0';
        // Short delay for stagger effect
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => {
    fill.style.width = '0%';
    observer.observe(fill);
  });
}

/* ─────────────────────────────────────────
   12. ANIMATED COUNTERS
───────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const step     = Math.ceil(target / (duration / 16));
      let current    = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + suffix;
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─────────────────────────────────────────
   13. CONTACT FORM — mailto fallback
───────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('contactName')?.value.trim()    || '';
    const email   = document.getElementById('contactEmail')?.value.trim()   || '';
    const subject = document.getElementById('contactSubject')?.value.trim() || 'Portfolio Contact';
    const message = document.getElementById('contactMessage')?.value.trim() || '';

    if (!name || !email || !message) {
      shakeForm(form);
      return;
    }

    // Set loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    // Open mailto
    const body    = encodeURIComponent(`Hi Mohana Priya,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const subject2 = encodeURIComponent(subject);
    window.location.href = `mailto:mohanapriyag143@gmail.com?subject=${subject2}&body=${body}`;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled  = false;
      if (success) {
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      }
      form.reset();
    }, 1500);
  });
}

function shakeForm(form) {
  form.style.animation = 'shake 0.4s ease';
  setTimeout(() => (form.style.animation = ''), 400);
}

/* ─────────────────────────────────────────
   14. GALLERY LIGHTBOX (simple overlay)
───────────────────────────────────────── */
function initGalleryHover() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  // Create lightbox elements
  const overlay = document.createElement('div');
  overlay.id = 'lightboxOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9998;
    background:rgba(0,0,0,0.92);
    display:flex;align-items:center;justify-content:center;
    opacity:0;visibility:hidden;
    transition:all 0.3s ease;cursor:zoom-out;
    padding:20px;
  `;

  const imgEl = document.createElement('img');
  imgEl.style.cssText = `
    max-width:90vw;max-height:88vh;
    border-radius:12px;
    box-shadow:0 20px 60px rgba(0,0,0,0.8);
    transform:scale(0.9);
    transition:transform 0.3s ease;
    object-fit:contain;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.style.cssText = `
    position:fixed;top:24px;right:24px;
    background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);
    color:#fff;width:44px;height:44px;border-radius:50%;
    font-size:1.1rem;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:all 0.2s ease;
  `;
  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = '#EF4444';
    closeBtn.style.borderColor = '#EF4444';
  });
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'rgba(255,255,255,0.1)';
    closeBtn.style.borderColor = 'rgba(255,255,255,0.3)';
  });

  overlay.appendChild(imgEl);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  const openLightbox = (src, alt) => {
    imgEl.src = src;
    imgEl.alt = alt || '';
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    imgEl.style.transform = 'scale(1)';
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    imgEl.style.transform = 'scale(0.9)';
    document.body.style.overflow = '';
    setTimeout(() => { imgEl.src = ''; }, 300);
  };

  items.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ─────────────────────────────────────────
   15. CERT CARD — View Button Style
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Add CSS for cert-view-btn dynamically (keeps HTML clean)
  const style = document.createElement('style');
  style.textContent = `
    .cert-view-btn {
      position: absolute;
      bottom: 12px;
      right: 42px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(79,70,229,0.12);
      border: 1px solid rgba(79,70,229,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-size: 0.75rem;
      transition: all 0.2s ease;
      cursor: pointer;
      text-decoration: none;
    }
    .cert-view-btn:hover {
      background: var(--primary);
      color: #fff;
      transform: scale(1.15);
    }
    .cert-card {
      position: relative;
    }

    /* Shake animation for form */
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-8px)}
      40%{transform:translateX(8px)}
      60%{transform:translateX(-5px)}
      80%{transform:translateX(5px)}
    }

    /* Nav overlay for mobile */
    .nav-overlay {
      position:fixed;inset:0;
      background:rgba(0,0,0,0.5);
      z-index:997;
      opacity:0;visibility:hidden;
      transition:all 0.3s ease;
    }
    .nav-overlay.active{opacity:1;visibility:visible;}

    /* Footer link hover */
    .footer-links a {
      display:inline-block;
      transition:all 0.2s ease;
    }
  `;
  document.head.appendChild(style);
});

/* ─────────────────────────────────────────
   16. PERFORMANCE — Lazy load polyfill
───────────────────────────────────────── */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported
} else {
  // Basic fallback for older browsers
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        io.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => io.observe(img));
}

/* ─────────────────────────────────────────
   17. Prevent right-click on photos (optional)
───────────────────────────────────────── */
document.querySelectorAll('.profile-image, .about-image').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
  img.setAttribute('draggable', 'false');
});

console.log(
  '%c👩‍💻 Mohana Priya G Portfolio',
  'color:#4F46E5;font-size:18px;font-weight:bold;font-family:Space Grotesk'
);
console.log(
  '%cAI & Data Science | Python Developer | Technical Trainer',
  'color:#06B6D4;font-size:13px'
);
console.log(
  '%c📧 mohanapriyag143@gmail.com | 🔗 linkedin.com/in/mohanapriya-g',
  'color:#94A3B8;font-size:11px'
);
