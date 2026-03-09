(() => {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('networkacademy-theme');

  if (storedTheme) {
    root.setAttribute('data-theme', storedTheme);
  }

  themeToggle?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', currentTheme);
    localStorage.setItem('networkacademy-theme', currentTheme);
    themeToggle.setAttribute('aria-pressed', String(currentTheme === 'dark'));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
})();
