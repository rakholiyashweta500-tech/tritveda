/* Tritveda landing page — interactions & motion (no dependencies) */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const products = window.TRITVEDA_PRODUCTS || [];
  const notes = window.TRITVEDA_PACK_NOTES || {};

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const arrow = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const badgeIcon = {
    '100% Natural': '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 19C5 10 11 5 20 4c0 9-5 15-14 15"/><path d="m5 19 9-9"/></svg>',
    'Non-GMO': '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21V11"/><path d="M12 13c0-4-3-6.5-7-6.5 0 4 3 6.5 7 6.5Z"/><path d="M12 11c0-3.5 2.5-6 6.5-6 0 3.5-2.5 6-6.5 6Z"/></svg>',
  };

  /* ---------- Year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Product cards (rendered from data) ---------- */
  const grid = $('#product-grid');
  if (grid) {
    grid.innerHTML = products.map((p, i) => `
      <article class="pcard pcard--${esc(p.theme)} reveal" data-delay="${i + 1}" aria-labelledby="pcard-${esc(p.id)}">
        <div class="pcard__stage">
          <span class="pcard__index" aria-hidden="true">0${i + 1}</span>
          <div class="pcard__halo" aria-hidden="true"></div>
          <img class="pcard__accent" src="${esc(p.images.accent)}" alt="" aria-hidden="true" loading="lazy">
          <img class="pcard__leaf" src="${esc(p.images.leaf)}" alt="" aria-hidden="true" loading="lazy">
          <img class="pcard__pouch" src="${esc(p.images.pouch)}" alt="${esc(p.name)} pouch" width="1000" height="1710" loading="lazy">
        </div>
        <div class="pcard__body">
          <p class="pcard__sub">${esc(p.subtitle)}</p>
          <h3 class="pcard__title" id="pcard-${esc(p.id)}">${esc(p.name)}</h3>
          <p class="pcard__highlight">${esc(p.highlight)}</p>
          <ul class="badges" aria-label="Pack claims">
            ${p.badges.map((b) => `<li>${badgeIcon[b] || ''}${esc(b)}</li>`).join('')}
            ${p.netWeight ? `<li class="badges__weight"><span>Net Wt.</span> ${esc(p.netWeight.split('|')[0].trim())}</li>` : ''}
          </ul>
          <button class="btn btn--forest" type="button" data-open-product="${esc(p.id)}">
            <span>Explore Product</span>${arrow}
          </button>
        </div>
      </article>`).join('');
  }

  /* ---------- Product dialog ---------- */
  const dialog = $('#product-dialog');
  const dialogContent = $('#pdialog-content');
  let lastTrigger = null;

  function openProduct(id, trigger) {
    const p = products.find((x) => x.id === id);
    if (!p || !dialog) return;
    lastTrigger = trigger || null;
    dialogContent.innerHTML = `
      <button class="pdialog__close" type="button" aria-label="Close product details">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
      <div class="pdialog__media pdialog__media--${esc(p.theme)}">
        <img src="${esc(p.images.pouch)}" alt="${esc(p.name)} pouch" width="1000" height="1710">
      </div>
      <div class="pdialog__body">
        <p class="eyebrow">${esc(p.subtitle)}</p>
        <h2 class="pdialog__title" id="pdialog-title">${esc(p.name)}</h2>
        <p class="pdialog__highlight">${esc(p.highlight)}</p>
        <ul class="badges badges--dark">
          ${p.badges.map((b) => `<li>${badgeIcon[b] || ''}${esc(b)}</li>`).join('')}
          ${p.netWeight ? `<li class="badges__weight"><span>Net Wt.</span> ${esc(p.netWeight)}</li>` : ''}
        </ul>

        <h3>Ingredients</h3>
        <p>${esc(p.ingredients)}</p>

        <h3>Usage Directions</h3>
        <ul class="pdialog__list">${p.usage.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>

        <h3>Nutritional Information <small>(per 100g)</small></h3>
        <table class="nutri">
          <caption class="visually-hidden">Nutritional information per 100g for ${esc(p.name)}</caption>
          <tbody>${p.nutrition.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody>
        </table>

        <h3>Storage</h3>
        <p>${esc(notes.storage || '')} ${esc(notes.shelfLife || '')}</p>

        <p class="pdialog__disclaimer"><strong>Disclaimer:</strong> ${esc(notes.disclaimer || '')}</p>

        <a class="btn btn--forest" href="mailto:info@tritveda.com?subject=${encodeURIComponent('Enquiry: ' + p.name)}">
          <span>Enquire About This Product</span>${arrow}
        </a>
      </div>`;
    dialog.showModal();
    document.documentElement.classList.add('is-locked');
    $('.pdialog__close', dialog).focus();
  }

  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog || e.target.closest('.pdialog__close')) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('is-locked');
      if (lastTrigger) lastTrigger.focus();
    });
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open-product]');
    if (t) openProduct(t.dataset.openProduct, t);
  });

  /* ---------- Navigation ---------- */
  const nav = $('#nav');
  const toggle = $('#nav-toggle');
  const menu = $('#nav-menu');

  const onNavScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('is-locked', open);
  };
  toggle?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

  // Active link highlighting
  const links = $$('.nav__link');
  // Every top-level section is observed so non-nav sections (compare, experience, cta) clear the highlight.
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${en.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section[id], footer[id]').forEach((s) => spy.observe(s));

  /* ---------- Scroll-triggered reveals ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  $$('.reveal, .feature').forEach((el) => {
    if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay);
    revealIO.observe(el);
  });

  /* ---------- Ambient particles ---------- */
  $$('.particles').forEach((wrap) => {
    const n = wrap.classList.contains('particles--sm') ? 10 : 18;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.style.cssText = `--x:${Math.random() * 100}%;--y:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--t:${14 + Math.random() * 16}s;--dl:${-Math.random() * 20}s;--o:${0.25 + Math.random() * 0.45}`;
      frag.appendChild(s);
    }
    wrap.appendChild(frag);
  });

  /* ---------- Page entrance ---------- */
  const loaded = () => document.body.classList.add('is-loaded');
  const heroImgs = $$('.hero__pouch img');
  Promise.race([
    Promise.all(heroImgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))),
    new Promise((r) => setTimeout(r, 1200)),
  ]).then(() => requestAnimationFrame(loaded));

  /* ---------- Motion engine (scroll parallax + pointer depth) ---------- */
  let motionOn = false;
  let rafId = 0;
  const speedEls = $$('[data-speed]');
  const visible = new Set();
  const visIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
  }, { rootMargin: '20% 0px' });

  const hero = $('.hero');
  const stage = $('#hero-stage');
  const depthEls = $$('.hero [data-depth]');
  const pointer = { x: 0, y: 0, cx: 0, cy: 0 };

  function frame() {
    rafId = 0;
    const vh = window.innerHeight;

    // scroll parallax
    visible.forEach((el) => {
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
      el.style.translate = `0 ${offset.toFixed(1)}px`;
    });

    // hero scroll progress
    if (hero) {
      const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.85)));
      hero.style.setProperty('--hp', p.toFixed(3));
    }

    // pointer depth (lerped)
    pointer.cx += (pointer.x - pointer.cx) * 0.08;
    pointer.cy += (pointer.y - pointer.cy) * 0.08;
    depthEls.forEach((el) => {
      const d = parseFloat(el.dataset.depth);
      el.style.translate = `${(pointer.cx * d * 22).toFixed(2)}px ${(pointer.cy * d * 16).toFixed(2)}px`;
    });
    if (stage) {
      stage.style.setProperty('--ry', `${(pointer.cx * 7).toFixed(2)}deg`);
      stage.style.setProperty('--rx', `${(-pointer.cy * 5).toFixed(2)}deg`);
    }
    if (Math.abs(pointer.x - pointer.cx) > 0.001 || Math.abs(pointer.y - pointer.cy) > 0.001) request();
  }
  const request = () => { if (!rafId && motionOn) rafId = requestAnimationFrame(frame); };

  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    request();
  };

  // Magnetic buttons
  const magnets = $$('.magnetic');
  const magMove = (e) => {
    const b = e.currentTarget; const r = b.getBoundingClientRect();
    b.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`;
  };
  const magLeave = (e) => { e.currentTarget.style.translate = ''; };

  function enableMotion() {
    motionOn = true;
    speedEls.forEach((el) => visIO.observe(el));
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    if (finePointer.matches) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      magnets.forEach((m) => { m.addEventListener('pointermove', magMove); m.addEventListener('pointerleave', magLeave); });
    }
    request();
  }
  function disableMotion() {
    motionOn = false;
    cancelAnimationFrame(rafId); rafId = 0;
    window.removeEventListener('scroll', request);
    window.removeEventListener('resize', request);
    window.removeEventListener('pointermove', onPointer);
    magnets.forEach((m) => { m.removeEventListener('pointermove', magMove); m.removeEventListener('pointerleave', magLeave); m.style.translate = ''; });
    speedEls.forEach((el) => { visIO.unobserve(el); el.style.translate = ''; });
    depthEls.forEach((el) => { el.style.translate = ''; });
    visible.clear();
  }

  if (!reduceMotion.matches) enableMotion();
  reduceMotion.addEventListener('change', (m) => (m.matches ? disableMotion() : enableMotion()));
})();
