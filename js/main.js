/* ============================================================
   Miriam Gakpey — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  const header     = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const revealEls  = document.querySelectorAll('.reveal');
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-list a');

  const ICON_LIST = '<svg class="icon icon-lg" aria-hidden="true"><use href="#i-list"></use></svg>';
  const ICON_CLOSE = '<svg class="icon icon-lg" aria-hidden="true"><use href="#i-x-lg"></use></svg>';

  /* Header state on scroll */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  menuToggle.addEventListener('click', function () {
    const open = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuToggle.innerHTML = open ? ICON_CLOSE : ICON_LIST;
  });
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.innerHTML = ICON_LIST;
    });
  });

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Active nav link */
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* Current year */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
