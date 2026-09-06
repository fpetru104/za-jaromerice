// Interactive Script for ZA JAROMĚŘICE Website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Election Countdown Timer (October 9, 2026, 14:00)
  const electionDate = new Date('2026-10-09T14:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = electionDate - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '0';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 2. Candidate List Search Filter & Mobile Toggle
  const searchInput = document.getElementById('candidate-search');
  const candidateGrid = document.querySelector('.candidate-grid');
  const candidateCards = document.querySelectorAll('.candidate-card');
  const candidateToggleBtn = document.getElementById('candidate-toggle-btn');

  if (candidateToggleBtn && candidateGrid) {
    candidateToggleBtn.addEventListener('click', () => {
      const isExpanded = candidateGrid.classList.toggle('is-expanded');
      candidateToggleBtn.setAttribute('aria-expanded', isExpanded);
      const btnText = candidateToggleBtn.querySelector('.btn-text');
      if (btnText) {
        btnText.textContent = isExpanded ? 'Zobrazit méně' : 'Zobrazit další kandidáty (21)';
      }
      if (!isExpanded) {
        const kandidatkaSection = document.getElementById('kandidatka');
        if (kandidatkaSection) {
          const yOffset = -70;
          const y = kandidatkaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (candidateGrid && candidateToggleBtn) {
        if (term.length > 0) {
          candidateGrid.classList.add('is-expanded');
          candidateToggleBtn.style.display = 'none';
        } else {
          candidateToggleBtn.style.display = '';
        }
      }
      candidateCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 3. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
});
