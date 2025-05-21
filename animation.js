document.addEventListener("DOMContentLoaded", function () {
    const sprite = document.querySelector('.sprite');
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');

    const totalFrames = 121;
    const frameWidth = 64;
    const animationDuration = 9000;
    const fadeOutDuration = 1000;

    sprite.style.animation = `play-sprite ${animationDuration}ms steps(${totalFrames}) 1`;

    setTimeout(() => {
        sprite.style.animation = 'none';
        sprite.style.backgroundPosition = `-${frameWidth * (totalFrames - 1)}px 0`;
        intro.style.opacity = 0;

        setTimeout(() => {
            intro.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => mainContent.classList.add('show'), 10);
        }, fadeOutDuration);
    }, animationDuration);

    setTimeout(() => {
        document.querySelector('.maquina-escribir').classList.add('maquina-visible');
      }, 12000);
      
});
// -----------------------
  const ticker = document.querySelector(".ticker-inner");
  ticker.innerHTML += ticker.innerHTML;
// -----------------------

let hasIntroPlayed = false;

window.addEventListener("load", () => {
  setTimeout(() => {
    hasIntroPlayed = true;
    observer.observe(perfil);
  }, 12000); 
});

const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.filtro-navbar button, .filtro-navbar-mobile button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    const isActive = btn.classList.contains('active-filter');

    document.querySelectorAll('.filtro-navbar button, .filtro-navbar-mobile button').forEach(b =>
    b.classList.remove('active-filter')
    );

    if (isActive) {
        document.querySelectorAll('.categoria').forEach(cat => {
        cat.style.display = 'block';
      });
    } else {
      btn.classList.add('active-filter');
      document.querySelectorAll('.categoria').forEach(cat => {
        cat.style.display = cat.getAttribute('data-tech') === filter
          ? 'block'
          : 'none';
      });
    }
  });
});

const header = document.getElementById("stickyHeader");
const perfil = document.getElementById("perfil");

const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
    });
  },
  {
    root: null,
    threshold: 0.5,
  }
);
headerObserver.observe(perfil);

const elementosAnimados = document.querySelectorAll('.perfil, .about-me, .proyectos, .constancias');

const animacionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-visible');
      entry.target.classList.remove('fade-hidden');
    } else {
      entry.target.classList.remove('fade-visible');
      entry.target.classList.add('fade-hidden');
    }
  });
}, {
  threshold: 0.1,
});

elementosAnimados.forEach(el => {
  el.classList.add('fade-hidden');
  animacionObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn-verproyecto').forEach(button => {
    button.addEventListener('click', () => {
      const contenedorProyecto = button.closest('.descproyec').querySelector('.contproyect');
      contenedorProyecto.classList.toggle('activo');

      if (contenedorProyecto.classList.contains('activo')) {
        button.textContent = 'Cerrar ✕';
      } else {
        button.textContent = 'Multimedia ↓';
      }
    });
  });
});

document.addEventListener('contextmenu', event => event.preventDefault());