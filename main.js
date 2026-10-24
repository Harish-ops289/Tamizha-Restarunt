/* ============================================================
   TAMIZHAN RESTAURANT — main.js
   Minimal vanilla JS: nav scroll, hamburger, menu tabs
   ============================================================ */

(function () {
  'use strict';

  /* ===== NAV: Add scrolled class for shadow ===== */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ===== HAMBURGER: Toggle mobile nav ===== */
  var hamburger = document.getElementById('navHamburger');
  var navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    /* Close nav on link click */
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close nav on outside click */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== MENU TABS ===== */
  var tabSeafoods = document.getElementById('tabSeafoods');
  var tabSouthIndian = document.getElementById('tabSouthIndian');
  var panelSeafoods = document.getElementById('panelSeafoods');
  var panelSouthIndian = document.getElementById('panelSouthIndian');

  function showTab(activeTab, activePanel, inactiveTab, inactivePanel) {
    activeTab.classList.add('tab-btn--active');
    activeTab.setAttribute('aria-selected', 'true');
    inactiveTab.classList.remove('tab-btn--active');
    inactiveTab.setAttribute('aria-selected', 'false');
    activePanel.classList.remove('menu-panel--hidden');
    inactivePanel.classList.add('menu-panel--hidden');
  }

  if (tabSeafoods && tabSouthIndian && panelSeafoods && panelSouthIndian) {
    tabSeafoods.addEventListener('click', function () {
      showTab(tabSeafoods, panelSeafoods, tabSouthIndian, panelSouthIndian);
    });

    tabSouthIndian.addEventListener('click', function () {
      showTab(tabSouthIndian, panelSouthIndian, tabSeafoods, panelSeafoods);
    });
  }

  /* ===== SMOOTH SCROLL OFFSET for sticky nav ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = nav ? nav.offsetHeight : 72;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
