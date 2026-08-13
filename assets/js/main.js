/* 9nagent — shared interactions */
(function () {
  'use strict';

  /* ---------- sticky nav ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobile = document.querySelector('.nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      if (mobile.classList.contains('open')) {
        mobile.classList.remove('open');
        setTimeout(function () { mobile.classList.remove('show'); }, 300);
      } else {
        mobile.classList.add('show');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { mobile.classList.add('open'); });
        });
      }
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.classList.remove('open');
        setTimeout(function () { mobile.classList.remove('show'); }, 300);
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- animated counters ---------- */
  function fa(n) { return String(n).replace(/[0-9]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; }); }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        cio.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var dur = 1500, t0 = null;
        function tick(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var v = target % 1 !== 0 ? (target * eased).toFixed(1) : Math.round(target * eased);
          el.textContent = prefix + fa(v) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- parallax orbs (light, throttled) ---------- */
  var orbs = document.querySelectorAll('.orb');
  if (orbs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        orbs.forEach(function (o, i) {
          o.style.transform = 'translateY(' + (y * (0.04 + i * 0.025)) + 'px)';
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- FAQ / accordion ---------- */
  document.querySelectorAll('[data-acc]').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.parentElement;
      var body = item.querySelector('[data-acc-body]');
      var open = item.classList.toggle('open');
      if (body) body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
      var ic = head.querySelector('[data-acc-ico]');
      if (ic) ic.style.transform = open ? 'rotate(45deg)' : 'rotate(0)';
    });
  });

  /* ---------- catalog filter (product pages) ---------- */
  var search = document.querySelector('[data-mod-search]');
  if (search) {
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      document.querySelectorAll('table.mods tbody tr').forEach(function (tr) {
        tr.style.display = !q || tr.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none';
      });
      document.querySelectorAll('.tbl-wrap').forEach(function (w) {
        var vis = w.querySelectorAll('table.mods tbody tr:not([style*="display: none"])').length;
        w.style.display = vis ? '' : 'none';
      });
    });
  }
})();
