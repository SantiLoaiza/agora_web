// Page-wide, framework-free interactions: scroll progress, header shrink,
// reveal-on-scroll, count-up stats and the hero shipment-tracking simulation.
// Runs once on load — the markup is fully server-rendered by Astro, so there is
// no need to keep re-scanning the DOM for newly mounted nodes.

function initRevealOnScroll() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const siblings = el.parentElement
          ? Array.from(el.parentElement.querySelectorAll(':scope > .reveal'))
          : [];
        const i = Math.max(0, siblings.indexOf(el));
        el.style.animationDelay = `${Math.min(i, 5) * 0.08}s`;
        el.classList.add('seen');
        io.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((n) => io.observe(n));
}

function initCountUp() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        countObs.unobserve(el);
        el.setAttribute('data-done', '1');
        if (reduced) return;
        const to = parseFloat(el.getAttribute('data-to') || '0') || 0;
        const pad = parseInt(el.getAttribute('data-pad') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          let v = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (pad) v = v.padStart(pad, '0');
          el.textContent = prefix + v + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll('.count').forEach((n) => countObs.observe(n));
}

function initScrollProgress() {
  const bar = document.getElementById('agora-progress');
  const header = document.querySelector('header');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    if (header) header.classList.toggle('shrunk', window.scrollY > 90);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initShipmentTracking() {
  const PLACES: [number, string][] = [
    [0.18, 'Villeta, Cundinamarca'],
    [0.34, 'Honda, Tolima'],
    [0.52, 'Puerto Triunfo, Antioquia'],
    [0.7, 'Cocorná, Antioquia'],
    [0.86, 'Guarne, Antioquia'],
  ];
  const TOTAL = 430;
  let p = 0.46;

  const set = (id: string, text: string) => {
    const n = document.getElementById(id);
    if (n) n.textContent = text;
  };

  const tick = () => {
    p = Math.min(0.97, p + 0.0035);
    const fill = document.getElementById('hp-fill');
    const marker = document.getElementById('hp-marker');
    if (fill) fill.style.height = `${(p * 100).toFixed(1)}%`;
    if (marker) marker.style.top = `${(p * 100).toFixed(1)}%`;
    set('hp-pct', `${Math.round(p * 100)}%`);
    set('hp-km', `${Math.max(4, Math.round(TOTAL * (1 - p)))} km`);
    let place = PLACES[0][1];
    PLACES.forEach(([threshold, label]) => {
      if (p >= threshold) place = label;
    });
    set('hp-place', place);
    set('hp-eta', '15:40');
  };

  tick();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(tick, 1400);
  }
}

function initIntentPickers() {
  document.querySelectorAll<HTMLAnchorElement>('[data-pick-intent]').forEach((el) => {
    el.addEventListener('click', (ev) => {
      ev.preventDefault();
      const intent = el.getAttribute('data-pick-intent');
      window.dispatchEvent(new CustomEvent('agora:pick-intent', { detail: intent }));
      const target = document.getElementById('contacto');
      if (target) {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });
}

export function initInteractions() {
  initRevealOnScroll();
  initCountUp();
  initScrollProgress();
  initShipmentTracking();
  initIntentPickers();
}
