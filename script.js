document.addEventListener('DOMContentLoaded', () => {
  const scrollCue   = document.getElementById('scrollCue');
  const indexSection = document.getElementById('index');
  const cards       = document.querySelectorAll('.index-card');
  const panels      = document.querySelectorAll('[data-panel]');
  const backButtons = document.querySelectorAll('[data-back]');

  /* Scroll cue "menutup" (fade out) begitu halaman indeks mulai terlihat */
  const cueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        scrollCue.classList.add('is-closed');
      } else {
        scrollCue.classList.remove('is-closed');
      }
    });
  }, { threshold: 0.05 });

  cueObserver.observe(indexSection);

  scrollCue.addEventListener('click', () => {
    indexSection.scrollIntoView({ behavior: 'smooth' });
  });

  /* Buka panel saat kartu indeks dipencet */
  function openPanel(id) {
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.classList.add('is-open');
    panel.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeAllPanels() {
    panels.forEach((p) => p.classList.remove('is-open'));
    document.body.style.overflow = '';
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      openPanel(card.dataset.target);
    });
  });

  backButtons.forEach((btn) => {
    btn.addEventListener('click', closeAllPanels);
  });

  /* Tombol Escape juga menutup panel yang sedang terbuka */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPanels();
  });
});