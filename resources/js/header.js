(function() {
  const header = document.getElementById('gardener-header');
  if (!header) return;

  const mobileToggle = header.querySelector('[data-mobile-toggle]');
  const mobileMenu = header.querySelector('[data-mobile-menu]');
  const menuIcon = header.querySelector('.header-menu-icon');
  const closeIcon = header.querySelector('.header-close-icon');
  const smoothScrollLinks = header.querySelectorAll('[data-smooth-scroll]');
  const consultationBtns = header.querySelectorAll('[data-consultation-btn]');

  function handleScroll() {
    const isScrolled = window.scrollY > 50;
    header.setAttribute('data-scrolled', isScrolled.toString());
    
    const logoTexts = header.querySelectorAll('.header-logo-text');
    const menuLinks = header.querySelectorAll('.header-menu-link');
    const logoIcon = header.querySelector('.header-logo-icon');
    const logoSvg = header.querySelector('.header-logo-svg');
    const mobileToggleEl = header.querySelector('.header-mobile-toggle');
    
    if (isScrolled) {
      header.classList.remove('bg-transparent');
      header.classList.add('bg-white', 'shadow-lg');
      logoTexts.forEach(el => {
        el.classList.remove('text-white');
        el.classList.add('text-gray-900');
      });
      menuLinks.forEach(el => {
        el.classList.remove('text-white', 'hover:text-green-300');
        el.classList.add('text-gray-700', 'hover:text-green-600');
      });
      if (logoIcon) {
        logoIcon.classList.remove('bg-white');
        logoIcon.classList.add('bg-green-600');
      }
      if (logoSvg) {
        logoSvg.classList.remove('text-green-600');
        logoSvg.classList.add('text-white');
      }
      if (mobileToggleEl) {
        mobileToggleEl.classList.remove('text-white');
        mobileToggleEl.classList.add('text-gray-900');
      }
    } else {
      header.classList.add('bg-transparent');
      header.classList.remove('bg-white', 'shadow-lg');
      logoTexts.forEach(el => {
        el.classList.add('text-white');
        el.classList.remove('text-gray-900');
      });
      menuLinks.forEach(el => {
        el.classList.add('text-white', 'hover:text-green-300');
        el.classList.remove('text-gray-700', 'hover:text-green-600');
      });
      if (logoIcon) {
        logoIcon.classList.add('bg-white');
        logoIcon.classList.remove('bg-green-600');
      }
      if (logoSvg) {
        logoSvg.classList.add('text-green-600');
        logoSvg.classList.remove('text-white');
      }
      if (mobileToggleEl) {
        mobileToggleEl.classList.add('text-white');
        mobileToggleEl.classList.remove('text-gray-900');
      }
    }
  }

  function toggleMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
      if (menuIcon) menuIcon.classList.toggle('hidden');
      if (closeIcon) closeIcon.classList.toggle('hidden');
    }
  }

  function handleSmoothScroll(e, url) {
    if (url.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(url);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          toggleMobileMenu();
        }
      }
    }
  }

  function handleConsultationClick() {
    const event = new CustomEvent('gardener:consultation-click');
    window.dispatchEvent(event);
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu();
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('data-smooth-scroll') || link.getAttribute('href');
      handleSmoothScroll(e, url);
    });
  });

  consultationBtns.forEach(btn => {
    btn.addEventListener('click', handleConsultationClick);
  });

  window.addEventListener('scroll', handleScroll);
  handleScroll();
})();
