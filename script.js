/* ============================================================
   script.js v2 — 親子海外ラーニングプログラム LP
   Carry Dreams / 陽だまりラボ
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const header    = document.getElementById('site-header');
  const heroSec   = document.getElementById('hero');
  const floatBtn  = document.getElementById('floating-line');
  const mobCtaBar = document.getElementById('mob-cta-bar');


  /* ----------------------------------------------------------
     1. ヒーロー: ページ読み込み後に順次フェードイン
  ---------------------------------------------------------- */
  document.querySelectorAll('.hero-section .fade-in').forEach(el => {
    el.classList.add('is-visible');
  });


  /* ----------------------------------------------------------
     2. スクロールフェードイン（Intersection Observer）
  ---------------------------------------------------------- */
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.scroll-fade').forEach(el => fadeObserver.observe(el));


  /* ----------------------------------------------------------
     3. アイテムへのstagger遅延（グループ単位）
  ---------------------------------------------------------- */
  const staggerGroups = [
    { parent: '.empathy-list',   items: '.empathy-card',  step: 0.08 },
    { parent: '.values-grid',    items: '.value-card',    step: 0.09 },
    { parent: '.steps-grid',     items: '.step-card',     step: 0.12 },
    { parent: '.exp-grid',       items: '.exp-item',      step: 0.06 },
    { parent: '.audience-list',  items: '.audience-item', step: 0.07 },
    { parent: '.support-grid',   items: '.support-card',  step: 0.08 },
    { parent: '.faq-list',       items: '.faq-item',      step: 0 },
  ];

  staggerGroups.forEach(({ parent, items, step }) => {
    const container = document.querySelector(parent);
    if (!container) return;
    container.querySelectorAll(items).forEach((el, i) => {
      el.style.transitionDelay = `${i * step}s`;
    });
  });


  /* ----------------------------------------------------------
     4. ヘッダー: スクロールで背景を表示
  ---------------------------------------------------------- */
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ----------------------------------------------------------
     5. フローティングLINEボタン & スマホ追従CTAバー
        ヒーロー通過後に表示
  ---------------------------------------------------------- */
  if (heroSec && (floatBtn || mobCtaBar)) {
    const onScrollCta = () => {
      const heroPassed = heroSec.getBoundingClientRect().bottom < 0;

      if (floatBtn) {
        floatBtn.classList.toggle('is-visible', heroPassed);
        floatBtn.setAttribute('aria-hidden', String(!heroPassed));
        const link = floatBtn.querySelector('a');
        if (link) link.tabIndex = heroPassed ? 0 : -1;
      }

      if (mobCtaBar) {
        mobCtaBar.classList.toggle('is-visible', heroPassed);
        mobCtaBar.setAttribute('aria-hidden', String(!heroPassed));
        const btn = mobCtaBar.querySelector('a');
        if (btn) btn.tabIndex = heroPassed ? 0 : -1;
      }
    };
    window.addEventListener('scroll', onScrollCta, { passive: true });
    onScrollCta();
  }


  /* ----------------------------------------------------------
     6. スムーススクロール（アンカーリンク）
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = (header ? header.offsetHeight : 0) + 16;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });


  /* ----------------------------------------------------------
     7. FAQアコーディオン
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // 他のすべてを閉じる
      document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        const ans = openItem.querySelector('.faq-a');
        if (ans) ans.setAttribute('aria-hidden', 'true');
      });

      // クリックしたものを開閉
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        const ans = item.querySelector('.faq-a');
        if (ans) ans.setAttribute('aria-hidden', 'false');
      }
    });
  });

});
