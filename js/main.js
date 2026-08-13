// MGLASS — comportamento do site (menu mobile, header, scroll reveal, formulário)

document.addEventListener('DOMContentLoaded', () => {
  const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ano atual no rodapé
  const anoEl = document.getElementById('ano-atual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const aberto = nav.classList.toggle('active');
      toggle.classList.toggle('active', aberto);
      toggle.setAttribute('aria-expanded', String(aberto));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header: fica transparente sobre o hero e ganha fundo/sombra ao rolar
  const header = document.querySelector('.site-header');
  const aplicarEstadoHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  aplicarEstadoHeader();
  window.addEventListener('scroll', aplicarEstadoHeader, { passive: true });

  // Animação de entrada ao rolar (com atraso escalonado por grupo)
  const elementosRevelados = document.querySelectorAll('[data-reveal]');

  if (prefereMenosMovimento || !('IntersectionObserver' in window)) {
    elementosRevelados.forEach((el) => el.classList.add('is-visible'));
  } else {
    const gruposPorPai = new Map();

    elementosRevelados.forEach((el) => {
      const pai = el.parentElement;
      const indice = gruposPorPai.get(pai) || 0;
      el.style.transitionDelay = `${Math.min(indice, 6) * 80}ms`;
      gruposPorPai.set(pai, indice + 1);
    });

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('is-visible');
            observer.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    elementosRevelados.forEach((el) => observer.observe(el));
  }

  // Formulário de contato
  // TODO: este formulário ainda não envia dados para nenhum lugar.
  // Integre com um serviço (Formspree, backend próprio, etc.) substituindo
  // o bloco abaixo por uma chamada fetch() para o endpoint desejado.
  const form = document.getElementById('form-contato');
  const feedback = document.getElementById('form-feedback');

  if (form && feedback) {
    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      feedback.textContent = 'Formulário ainda não conectado a um serviço de envio (ver TODO em js/main.js). Por enquanto, use o WhatsApp ou e-mail.';
    });
  }
});
