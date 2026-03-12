/**
 * Atlanta Fine Arts — nav.js
 * Handles: scroll state, mobile menu open/close, touch optimization
 * No dependencies. Safe to load with defer on every page.
 */
(function () {
  'use strict';

  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('mobile-menu');

  if (!nav || !toggle || !menu) return;

  /* ── Scroll state ── */
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Open / close helpers ── */
  var isOpen = false;

  function openMenu() {
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ── Hamburger toggle ──
     touchend fires ~300ms before the synthesised click on iOS/Android.
     preventDefault stops the click from double-firing. */
  toggle.addEventListener('touchend', function (e) {
    e.preventDefault();
    isOpen ? closeMenu() : openMenu();
  }, { passive: false });

  toggle.addEventListener('click', function () {
    isOpen ? closeMenu() : openMenu();
  });

  /* ── Mobile link clicks ──
     Only use click here — NOT touchend. Using touchend on links can
     cancel the navigation before the browser has a chance to follow
     the href on some mobile browsers. */
  document.querySelectorAll('[data-mobile-link]').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  /* ── Escape key ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      toggle.focus();
    }
  });

})();
