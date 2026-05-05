/* ── HEADER & HERO LOGO SCROLL ─────────────────────────────── */
(function () {
  const header   = document.getElementById('site-header');
  const heroBg   = document.querySelector('.hero-bg');
  const heroLogo = document.querySelector('.hero-logo');

  function updateHeader() {
    const y = window.scrollY;

    // Blur + couleur du header après 80px de scroll
    header.classList.toggle('scrolled', y > 80);

    // Grand logo hero : disparaît sur les 280 premiers px
    const heroFade = Math.max(0, 1 - y / 280);
    heroLogo.style.opacity = heroFade;

    // Parallaxe léger sur le fond hero
    if (y < window.innerHeight) {
      heroBg.style.transform = `scale(1.04) translateY(${y * 0.18}px)`;
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // état initial
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
    const wrapperTop    = wrapper.getBoundingClientRect().top;
    const scrolledIn    = -wrapperTop;                           // px scrollés dans le wrapper
    const maxScroll     = wrapper.offsetHeight - window.innerHeight; // distance max

    if (scrolledIn <= 0) {
      track.style.transform = 'translateX(0)';
      return;
    }
    if (scrolledIn >= maxScroll) {
      track.style.transform = `translateX(-${maxScroll}px)`;
      return;
    }

    // 1 px vertical = 1 px horizontal → défilement naturel
    track.style.transform = `translateX(-${scrolledIn}px)`;
  }

  window.addEventListener('scroll', updateServicesScroll, { passive: true });
  updateServicesScroll(); // état initial
})();
