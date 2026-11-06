/* Accent toggle + animated hero typing */
(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('accentToggle');
  const label = document.getElementById('accentLabel');
  const typingTarget = document.getElementById('typingText');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  // Restore the visitor's last selected accent. The page always stays dark.
  const savedAccent = localStorage.getItem('saba-portfolio-accent');
  const initialAccent = savedAccent === 'green' ? 'green' : 'orange';
  root.setAttribute('data-accent', initialAccent);
  updateToggle(initialAccent);

  function updateToggle(accent) {
    if (!toggle) return;
    const nextAccent = accent === 'orange' ? 'green' : 'orange';
    toggle.setAttribute('aria-pressed', String(accent === 'green'));
    toggle.setAttribute('aria-label', `Switch accent color to ${nextAccent === 'green' ? 'emerald green' : 'orange'}`);
    if (label) label.textContent = accent === 'green' ? 'Orange accent' : 'Green accent';
  }

  toggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-accent') === 'orange' ? 'green' : 'orange';
    root.setAttribute('data-accent', next);
    localStorage.setItem('saba-portfolio-accent', next);
    updateToggle(next);
  });

  // Simple type/delete loop for the hero introduction.
  if (typingTarget) {
    const phrases = [
      'Frontend Web Developer',
      'Exploring AI Engineering',
      'Building Responsive Websites',
      'Learning Through Projects'
    ];
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      typingTarget.textContent = phrases[0];
    } else {
      const type = () => {
        const current = phrases[phraseIndex];
        if (deleting) {
          charIndex--;
          typingTarget.textContent = current.slice(0, Math.max(0, charIndex));
          if (charIndex <= 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 350);
            return;
          }
          setTimeout(type, 42);
        } else {
          const nextPhrase = phrases[phraseIndex];
          charIndex++;
          typingTarget.textContent = nextPhrase.slice(0, charIndex);
          if (charIndex >= nextPhrase.length) {
            deleting = true;
            setTimeout(type, 1500);
            return;
          }
          setTimeout(type, 75);
        }
      };
      setTimeout(type, 1500);
    }
  }
})();
