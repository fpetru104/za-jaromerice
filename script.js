// Interactive Script for ZA JAROMĚŘICE Website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Election Countdown & Post-Election Dynamic States
  // Start: October 9, 2026, 14:00 CEST
  // End: October 10, 2026, 14:00 CEST
  const electionStartDate = new Date('2026-10-09T14:00:00+02:00').getTime();
  const electionEndDate = new Date('2026-10-10T14:00:00+02:00').getTime();

  function updateElectionCountdown() {
    const urlParams = new URLSearchParams(window.location.search);
    const mockDateParam = urlParams.get('testDate');
    const now = mockDateParam ? new Date(mockDateParam).getTime() : new Date().getTime();

    const titleEl = document.querySelector('#odpocet .countdown-title');
    const gridEl = document.getElementById('election-countdown');
    const containerEl = document.querySelector('#odpocet .countdown-container');
    const jakHlasovatEl = document.getElementById('jak-hlasovat');
    const waveDividerEl = document.querySelector('#odpocet .section-wave');
    const jakHlasovatNavLinks = document.querySelectorAll('a[href="#jak-hlasovat"]');

    let msgEl = document.getElementById('election-message');

    if (now < electionStartDate) {
      // PHASE 1: Before elections (Countdown)
      const distance = electionStartDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('cd-days');
      const hoursEl = document.getElementById('cd-hours');
      const minutesEl = document.getElementById('cd-minutes');
      const secondsEl = document.getElementById('cd-seconds');

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
      if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
      if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

      if (titleEl) titleEl.style.display = '';
      if (gridEl) gridEl.style.display = '';
      if (msgEl) msgEl.remove();

      if (jakHlasovatEl) jakHlasovatEl.style.display = '';
      if (waveDividerEl) waveDividerEl.style.display = '';
      jakHlasovatNavLinks.forEach(link => link.style.display = '');

    } else if (now >= electionStartDate && now < electionEndDate) {
      // PHASE 2: During elections (Oct 9 14:00 - Oct 10 14:00)
      if (titleEl) titleEl.style.display = 'none';
      if (gridEl) gridEl.style.display = 'none';

      if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.id = 'election-message';
        msgEl.className = 'election-banner-message';
        if (containerEl) containerEl.appendChild(msgEl);
      }
      msgEl.textContent = 'Přijďte prosím k volbám!';

      if (jakHlasovatEl) jakHlasovatEl.style.display = '';
      if (waveDividerEl) waveDividerEl.style.display = '';
      jakHlasovatNavLinks.forEach(link => link.style.display = '');

    } else {
      // PHASE 3: After elections (Oct 10 14:00 onward)
      if (titleEl) titleEl.style.display = 'none';
      if (gridEl) gridEl.style.display = 'none';

      if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.id = 'election-message';
        msgEl.className = 'election-banner-message';
        if (containerEl) containerEl.appendChild(msgEl);
      }
      msgEl.textContent = 'Děkujeme za vaše hlasy!';

      // Hide voting guide section, wave divider, and nav links
      if (jakHlasovatEl) jakHlasovatEl.style.display = 'none';
      if (waveDividerEl) waveDividerEl.style.display = 'none';
      jakHlasovatNavLinks.forEach(link => link.style.display = 'none');
    }
  }

  updateElectionCountdown();
  setInterval(updateElectionCountdown, 1000);

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

  // 5. In-Page Interactive 4-Page Flipbook Flyer Modal
  const flyerModal = document.getElementById('flyer-modal');
  const flyerOpenBtns = document.querySelectorAll('.flyer-open-btn');
  const flyerCloseBtn = document.getElementById('flyer-modal-close');
  const flyerBackdrop = document.getElementById('flyer-modal-backdrop');
  const flyerTabs = document.querySelectorAll('.flyer-tab-btn');
  const flyerDots = document.querySelectorAll('.flyer-dot');
  const flyerPrevBtn = document.getElementById('flyer-prev-btn');
  const flyerNextBtn = document.getElementById('flyer-next-btn');
  const flyerFooterPrev = document.getElementById('flyer-footer-prev');
  const flyerFooterNext = document.getElementById('flyer-footer-next');
  const flyerBookStage = document.getElementById('flyer-book-stage');
  const flyerBook = document.getElementById('flyer-book');

  let currentFlyerPage = 1;
  let isFlipping = false;


  function updateFlyerUI() {
    // Tabs
    flyerTabs.forEach(tab => {
      const p = parseInt(tab.dataset.page, 10);
      tab.classList.toggle('is-active', p === currentFlyerPage);
    });

    // Dots
    flyerDots.forEach(dot => {
      const p = parseInt(dot.dataset.page, 10);
      dot.classList.toggle('is-active', p === currentFlyerPage);
    });

    // Button states
    const isFirst = currentFlyerPage === 1;
    const isLast = currentFlyerPage === 4;

    if (flyerPrevBtn) flyerPrevBtn.disabled = isFirst;
    if (flyerFooterPrev) flyerFooterPrev.disabled = isFirst;

    if (flyerNextBtn) flyerNextBtn.disabled = isLast;
    if (flyerFooterNext) {
      if (isLast) {
        flyerFooterNext.innerHTML = '<span>Začátek</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>';
      } else {
        flyerFooterNext.innerHTML = '<span>Další</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      }
    }
  }

  function flipToPage(targetPage, direction = null) {
    if (isFlipping) return;
    if (targetPage < 1 || targetPage > 4) return;
    if (targetPage === currentFlyerPage) return;

    if (!direction) {
      direction = targetPage > currentFlyerPage ? 'next' : 'prev';
    }

    const currentCard = document.querySelector(`.flyer-page-card[data-page="${currentFlyerPage}"]`);
    const targetCard = document.querySelector(`.flyer-page-card[data-page="${targetPage}"]`);

    if (!currentCard || !targetCard) {
      currentFlyerPage = targetPage;
      updateFlyerUI();
      return;
    }

    isFlipping = true;

    if (direction === 'next') {
      targetCard.classList.add('is-under', 'flipping-next-in');
      currentCard.classList.add('flipping-next-out');

      setTimeout(() => {
        currentCard.classList.remove('is-active', 'flipping-next-out');
        targetCard.classList.remove('is-under', 'flipping-next-in');
        targetCard.classList.add('is-active');

        currentFlyerPage = targetPage;
        updateFlyerUI();
        isFlipping = false;
      }, 540);
    } else {
      // Prev
      targetCard.classList.add('is-active', 'flipping-prev-in');
      currentCard.classList.add('flipping-prev-under');

      setTimeout(() => {
        currentCard.classList.remove('is-active', 'flipping-prev-under');
        targetCard.classList.remove('flipping-prev-in');

        currentFlyerPage = targetPage;
        updateFlyerUI();
        isFlipping = false;
      }, 540);
    }
  }

  window.openFlyerModal = openFlyerModal;
  window.closeFlyerModal = closeFlyerModal;
  window.flipToPage = flipToPage;

  function openFlyerModal(initialPage = 1) {
    if (!flyerModal) return;

    // Reset all cards
    document.querySelectorAll('.flyer-page-card').forEach(card => {
      const p = parseInt(card.dataset.page, 10);
      card.classList.remove('is-under', 'flipping-next-in', 'flipping-next-out', 'flipping-prev-in', 'flipping-prev-under');
      card.classList.toggle('is-active', p === initialPage);
    });

    currentFlyerPage = initialPage;
    isFlipping = false;
    updateFlyerUI();

    flyerModal.classList.add('is-open');
    flyerModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeFlyerModal() {
    if (!flyerModal) return;
    flyerModal.classList.remove('is-open');
    flyerModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // Trigger buttons
  if (flyerOpenBtns.length > 0) {
    flyerOpenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openFlyerModal(1);
      });
    });
  }

  if (flyerCloseBtn) flyerCloseBtn.addEventListener('click', closeFlyerModal);
  if (flyerBackdrop) flyerBackdrop.addEventListener('click', closeFlyerModal);

  // Prev / Next Arrows
  if (flyerPrevBtn) {
    flyerPrevBtn.addEventListener('click', () => {
      if (currentFlyerPage > 1) flipToPage(currentFlyerPage - 1, 'prev');
    });
  }
  if (flyerNextBtn) {
    flyerNextBtn.addEventListener('click', () => {
      if (currentFlyerPage < 4) flipToPage(currentFlyerPage + 1, 'next');
    });
  }

  // Footer Prev / Next
  if (flyerFooterPrev) {
    flyerFooterPrev.addEventListener('click', () => {
      if (currentFlyerPage > 1) flipToPage(currentFlyerPage - 1, 'prev');
    });
  }
  if (flyerFooterNext) {
    flyerFooterNext.addEventListener('click', () => {
      if (currentFlyerPage < 4) {
        flipToPage(currentFlyerPage + 1, 'next');
      } else {
        flipToPage(1, 'prev');
      }
    });
  }

  // Tabs
  flyerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = parseInt(tab.dataset.page, 10);
      if (target !== currentFlyerPage) {
        flipToPage(target);
      }
    });
  });

  // Dots
  flyerDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.page, 10);
      if (target !== currentFlyerPage) {
        flipToPage(target);
      }
    });
  });

  // Pointer drag-to-flip (works for mouse on PC and touch on mobile!)
  if (flyerBook) {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isPointerDown = false;

    flyerBook.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isPointerDown = true;
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
      flyerBook.classList.add('is-dragging');
      try {
        flyerBook.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    flyerBook.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      e.preventDefault();
    });

    const handlePointerEnd = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      flyerBook.classList.remove('is-dragging');
      try {
        if (flyerBook.hasPointerCapture(e.pointerId)) {
          flyerBook.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}

      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;
      const elapsed = Date.now() - startTime;

      // 1. Drag / Swipe detected
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 0.8) {
        if (diffX < 0) {
          // Dragged left -> Next page
          if (currentFlyerPage < 4) flipToPage(currentFlyerPage + 1, 'next');
        } else {
          // Dragged right -> Prev page
          if (currentFlyerPage > 1) flipToPage(currentFlyerPage - 1, 'prev');
        }
      }
      // 2. Click / Tap without significant drag
      else if (Math.abs(diffX) < 12 && Math.abs(diffY) < 12 && elapsed < 450) {
        const rect = flyerBook.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX > rect.width * 0.55) {
          if (currentFlyerPage < 4) flipToPage(currentFlyerPage + 1, 'next');
        } else if (clickX < rect.width * 0.45) {
          if (currentFlyerPage > 1) flipToPage(currentFlyerPage - 1, 'prev');
        }
      }
    };

    flyerBook.addEventListener('pointerup', handlePointerEnd);
    flyerBook.addEventListener('pointercancel', handlePointerEnd);
  }

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (!flyerModal || !flyerModal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeFlyerModal();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (currentFlyerPage > 1) flipToPage(currentFlyerPage - 1, 'prev');
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      if (currentFlyerPage < 4) flipToPage(currentFlyerPage + 1, 'next');
    } else if (e.key === 'Home') {
      flipToPage(1, 'prev');
    } else if (e.key === 'End') {
      flipToPage(4, 'next');
    }
  });
});
