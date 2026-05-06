/* ── HEADER & HERO LOGO SCROLL ─────────────────────────────── */
(function () {
  const header   = document.getElementById('site-header');
  const heroBg   = document.querySelector('.hero-bg');
  const heroLogo = document.querySelector('.hero-logo');

  function updateHeader() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 80);

    if (heroLogo) {
      heroLogo.style.opacity = Math.max(0, 1 - y / 280);
    }
    if (heroBg && y < window.innerHeight) {
      heroBg.style.transform = `scale(1.04) translateY(${y * 0.18}px)`;
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();


/* ── NOTRE HISTOIRE — FRISE CHRONOLOGIQUE (STEP EFFECT) ────── */
(function () {
  const steps  = document.querySelectorAll('.histoire-step');
  const images = document.querySelectorAll('.histoire-img');
  if (!steps.length) return;

  function activate(index) {
    steps.forEach((s, i)  => s.classList.toggle('active', i === index));
    images.forEach((img, i) => img.classList.toggle('histoire-img--active', i === index));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.img, 10);
        activate(index);
      }
    });
  }, {
    threshold: 0.45,
  });

  steps.forEach(step => observer.observe(step));
  activate(0); // premier step actif au chargement
})();


/* ── SERVICES — SCROLL HORIZONTAL ──────────────────────────── */
(function () {
  const wrapper = document.getElementById('services-wrapper');
  const track   = document.getElementById('services-track');

  if (!wrapper || !track) return;

  function updateServicesScroll() {
    const wrapperTop   = wrapper.getBoundingClientRect().top;
    const scrolledIn   = -wrapperTop;
    const maxScroll    = wrapper.offsetHeight - window.innerHeight;
    const maxTranslate = track.scrollWidth - window.innerWidth;

    if (scrolledIn <= 0) {
      track.style.transform = 'translateX(0)';
      return;
    }
    if (scrolledIn >= maxScroll) {
      track.style.transform = `translateX(-${maxTranslate}px)`;
      return;
    }

    const progress = scrolledIn / maxScroll;
    track.style.transform = `translateX(-${progress * maxTranslate}px)`;
  }

  window.addEventListener('scroll', updateServicesScroll, { passive: true });
  updateServicesScroll(); // état initial
})();


/* ── BURGER MENU ────────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('burger-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  function close() {
    btn.classList.remove('open');
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    nav.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ── MEGA MENU HOVER ────────────────────────────────────────── */
(function () {
  const trigger = document.querySelector('.nav-services-trigger');
  const menu    = document.getElementById('mega-menu');
  if (!trigger || !menu) return;

  let timeout;
  const show = () => { clearTimeout(timeout); menu.classList.add('visible'); };
  const hide = () => { timeout = setTimeout(() => menu.classList.remove('visible'), 200); };

  trigger.addEventListener('mouseenter', show);
  trigger.addEventListener('mouseleave', hide);
  menu.addEventListener('mouseenter', show);
  menu.addEventListener('mouseleave', hide);
})();
