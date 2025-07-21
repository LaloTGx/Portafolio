document.addEventListener("DOMContentLoaded", () => {
  
  /* ===== Config ===== */
  const totalFrames = 133;
  const frameWidth = 64;
  const animationDuration = 9000; 
  const fadeOutDuration = 1000; 

  /* ===== Cache ===== */
  const sprite = document.querySelector('.sprite');
  const intro = document.getElementById('intro');
  const mainContent = document.getElementById('main-content') || document.body;
  const typingEl = document.querySelector('.maquina-escribir');

  if (!sprite || !intro) {
    showMain();
    initMainUI();
    return;
  }

  window.addEventListener("load", () => {
    preloadSpriteBackground(sprite, () => {
      requestAnimationFrame(() => {
        startIntroAnimation();
      });
    });
  });

  /* ---------- Animación ---------- */
  function startIntroAnimation() {
    sprite.style.animation = `play-sprite ${animationDuration}ms steps(${totalFrames}) forwards`;

    sprite.addEventListener('animationend', handleIntroDone, { once: true });
  }

  function handleIntroDone() {
    sprite.style.animation = 'none';
    sprite.style.backgroundPosition = `-${frameWidth * (totalFrames - 1)}px 0`;

    typingEl?.classList.add('maquina-visible');

    intro.style.opacity = 0;
    setTimeout(() => {
      intro.style.display = 'none';
      showMain();
      initMainUI();
    }, fadeOutDuration);
  }

  function showMain() {
    if (mainContent && mainContent.style) {
      mainContent.style.display = 'block';
      requestAnimationFrame(() => mainContent.classList.add('show'));
    }
  }

  /* ---------- Preload helper para background-image ---------- */
  function preloadSpriteBackground(el, cb) {
    const bg = getComputedStyle(el).backgroundImage;
    const match = /url\\([\"']?(.*?)[\"']?\\)/.exec(bg);
    const src = match ? match[1] : null;
    if (!src) {
      cb();
      return;
    }
    const img = new Image();
    img.onload = cb;
    img.onerror = cb;
    img.src = src;
  }

  /* =====================================================
   * UI principal (se corre después de la intro)
   * ===================================================== */
  function initMainUI() {
    initProjectToggles();
    initTicker();
    initFilters();
    initStickyHeader();
    // initSectionFade();
    disableContextMenu();
  }

  /* ---- Multimedia ---- */
  function initProjectToggles() {
    document.querySelectorAll('.btn-verproyecto').forEach(button => {
      button.addEventListener('click', () => {
        const contenedorProyecto = button.closest('.descproyec')?.querySelector('.contproyect');
        if (!contenedorProyecto) return;
        contenedorProyecto.classList.toggle('activo');
        button.textContent = contenedorProyecto.classList.contains('activo') ? 'Cerrar ✕' : 'Multimedia ↓';
      });
    });
  }

  /* ---- Ticker ---- */
  function initTicker() {
    const ticker = document.querySelector(".ticker-inner");
    if (!ticker) return;
    if (!ticker.dataset.clonado) {
      ticker.innerHTML += ticker.innerHTML;
      ticker.dataset.clonado = "1";
    }
  }

  /* ---- Filtros ---- */
  function initFilters() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    burgerBtn?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('active');
    });

    const buttons = document.querySelectorAll('.filtro-navbar button, .filtro-navbar-mobile button');
    const cats = document.querySelectorAll('.categoria');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        const isActive = btn.classList.contains('active-filter');

        buttons.forEach(b => b.classList.remove('active-filter'));

        if (isActive) {
          cats.forEach(cat => cat.style.display = 'block');
        } else {
          btn.classList.add('active-filter');
          cats.forEach(cat => {
            cat.style.display = (cat.getAttribute('data-tech') === filter) ? 'block' : 'none';
          });
        }
      });
    });
  }

  /* ---- Sticky Header ---- */
  function initStickyHeader() {
    const header = document.getElementById("stickyHeader");
    const perfil = document.getElementById("perfil");
    if (!header || !perfil) return;

    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          header.classList.toggle("hidden", entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    headerObserver.observe(perfil);
  }

  /* ---- Fade secciones (opcional desde la UI principal) ---- */
  function initSectionFade() {
    const elementosAnimados = document.querySelectorAll('.perfil, .about-me, .proyectos, .constancias');
    if (!elementosAnimados.length) return;

    const animacionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('fade-visible', entry.isIntersecting);
        entry.target.classList.toggle('fade-hidden', !entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    elementosAnimados.forEach(el => {
      el.classList.add('fade-hidden');
      animacionObserver.observe(el);
    });
  }

  /* ---- Context menu ---- */
  function disableContextMenu() {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
});