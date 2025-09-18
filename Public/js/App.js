// ========== UTIL ==========
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ========== AÑO DINÁMICO ==========
document.addEventListener('DOMContentLoaded', () => {
  const y = $('#y');
  if (y) y.textContent = new Date().getFullYear();
});

// ========== SCROLL SUAVE EN ANCLAS ==========
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (id && id.length > 1) {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});




// ========== CARRUSEL HERO ==========
document.addEventListener('DOMContentLoaded', () => {
  const heroCarouselEl = document.getElementById('heroCarousel');
  if (!heroCarouselEl) return;

  const carousel = new bootstrap.Carousel(heroCarouselEl, {
    interval: 4500, // duración de imágenes
    ride: 'carousel',
    pause: false,
    touch: true,
    keyboard: true,
    wrap: true
  });

  // Duración fija para videos (ms)
  const VIDEO_INTERVAL = 7000; // 7 segundos

  heroCarouselEl.addEventListener('slid.bs.carousel', () => {
    // Pausar videos no activos
    heroCarouselEl.querySelectorAll('.carousel-item video').forEach(v => v.pause());

    const active = heroCarouselEl.querySelector('.carousel-item.active');
    const video = active ? active.querySelector('video') : null;

    if (video) {
      // Reiniciar y reproducir
      video.currentTime = 0;
      video.play().catch(() => {});

      // Pausar el carrusel mientras corre
      carousel.pause();

      // Cambiar después de VIDEO_INTERVAL
      setTimeout(() => {
        if (active.classList.contains('active')) {
          carousel.next();
          carousel.cycle();
        }
      }, VIDEO_INTERVAL);

    } else {
      // Si es imagen → seguir ciclo normal
      carousel.cycle();
    }
  });

  // Estado inicial
  heroCarouselEl.dispatchEvent(new Event('slid.bs.carousel'));
});


// ========== NAVBAR AUTO-HIDE SOLO APARECE EN EL TOP ==========
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  const TOP_VISIBLE = 120;  

  const onScroll = () => {
    const y = window.scrollY || 0;

    // Fondo más sólido apenas el usuario se mueva
    if (y > 8) nav.classList.add('nav-solid');
    else       nav.classList.remove('nav-solid');

    // Lógica simple: si NO estás cerca del top -> oculto
    // Solo se muestra cuando vuelves al top (<= TOP_VISIBLE)
    if (y <= TOP_VISIBLE) {
      nav.classList.remove('nav-hidden');
    } else {
      nav.classList.add('nav-hidden');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
});



