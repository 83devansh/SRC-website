/**
 * ==========================================================================
 * Student Research Council (SRC) - Main Application Controller
 * Handles Navigation, Scroll Reveals, Counter Animations, Accordions, Toasts
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initScrollReveal();
  initAnimatedCounters();
  initAccordions();
  highlightActiveNav();
});

/* --- 1. Sticky Header with Blur on Scroll --- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- 2. Mobile Navigation Drawer --- */
function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!menuToggle || !drawer || !overlay) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    drawer.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));

  // Close when clicking nav links
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* --- 3. Scroll Reveal Animations (IntersectionObserver) --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- 4. Animated Number Counters for Statistics --- */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-counter-target'), 10);
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const easeOutQuad = (t) => t * (2 - t);

    const timer = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentVal = Math.round(target * progress);

      el.textContent = `${currentVal.toLocaleString()}${suffix}`;

      if (frame >= totalFrames) {
        clearInterval(timer);
        el.textContent = `${target.toLocaleString()}${suffix}`;
      }
    }, frameRate);
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => counterObserver.observe(el));
}

/* --- 5. Interactive Accordion (FAQs) --- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      // Close other accordions in the same group
      const parentGroup = item.closest('.accordion-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
      }

      item.classList.toggle('active', !isActive);
    });
  });
}

/* --- 6. Active Navigation Link Detection --- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-item a, .mobile-nav-item a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.parentElement.classList.add('active');
    }
  });
}

/* --- 7. Toast Notification System --- */
function showToast(message, icon = '✨') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

// Make showToast accessible globally
window.showToast = showToast;
