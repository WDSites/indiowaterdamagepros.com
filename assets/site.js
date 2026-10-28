(function () {
  'use strict';
  var BP = 900; // matches the CSS breakpoint
  var root = document.documentElement;

  /* mobile drawer */
  var btn = document.querySelector('.menu-btn');
  var drawer = document.getElementById('mobdrawer');
  var overlay = document.querySelector('.mob-overlay');
  var closeBtn = document.querySelector('.mob-close');
  function setMenu(open) {
    if (!btn || !drawer || !overlay) return;
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    root.style.overflow = open ? 'hidden' : '';
  }
  if (btn) btn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > BP) setMenu(false); });
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') setMenu(false);
    });
  }

  /* FAQ accordion (max-height toggle) */
  var faqs = document.querySelectorAll('.faq');
  faqs.forEach(function (faq) {
    faq.classList.add('faq-js');
    faq.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var panel = document.getElementById(q.getAttribute('aria-controls'));
        var open = q.getAttribute('aria-expanded') === 'true';
        q.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
      });
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(function (q) {
      var panel = document.getElementById(q.getAttribute('aria-controls'));
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
})();
