/* Sophie's Cuppa Tea — Interactions */
(function () {
  'use strict';

  /* ── Scroll reveal ── */
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-vis'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('is-vis'));
  }

  /* ── Nav scroll state ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── Mobile toggle ── */
  const burger = document.querySelector('.nav-burger');
  if (burger) {
    burger.addEventListener('click', () => nav.classList.toggle('nav-open'));
    document.querySelectorAll('.nav-center a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('nav-open'))
    );
  }

  /* ── Filter ── */
  const chips = document.querySelectorAll('.filter[data-f]');
  const cards = document.querySelectorAll('.card[data-cat]');
  chips.forEach((c) => {
    c.addEventListener('click', () => {
      const f = c.dataset.f;
      chips.forEach((x) => x.classList.remove('is-on'));
      c.classList.add('is-on');
      let i = 0;
      cards.forEach((card) => {
        const show = f === 'all' || card.dataset.cat === f;
        card.classList.toggle('is-hidden', !show);
        if (show) { card.style.transitionDelay = `${i * 0.04}s`; i++; }
      });
    });
  });

  /* ── Make tea cards clickable ── */
  document.querySelectorAll('.grid > .card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Don't navigate if clicking a link inside the card
      if (e.target.closest('a')) return;
      const name = card.querySelector('h3');
      if (name) window.location.href = 'tea.html?name=' + encodeURIComponent(name.textContent);
    });
  });

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - nav.offsetHeight - 16, behavior: 'smooth' }); }
    });
  });
})();
