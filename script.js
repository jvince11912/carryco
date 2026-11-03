const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.carousel-dot')];
let currentSlide = 0;
let autoplayId;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === currentSlide;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });

  dots.forEach((dot, dotIndex) => {
    const active = dotIndex === currentSlide;
    dot.classList.toggle('is-active', active);
    dot.setAttribute('aria-selected', String(active));
  });
}

function stopAutoplay() {
  window.clearInterval(autoplayId);
}

function startAutoplay() {
  stopAutoplay();
  autoplayId = window.setInterval(() => showSlide(currentSlide + 1), 6000);
}


dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startAutoplay();
  });
});

document.querySelector('.hero').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.hero').addEventListener('mouseleave', startAutoplay);

showSlide(0);
startAutoplay();

const emailModal = document.querySelector('#email-modal');
const emailRequestButton = document.querySelector('#email-request-button');
const emailRequestForm = document.querySelector('#email-request-form');
const formStatus = document.querySelector('#form-status');
const requestNameInput = document.querySelector('#request-name');
let lastFocusedElement = null;

function openEmailModal() {
  lastFocusedElement = document.activeElement;
  emailModal.classList.add('is-open');
  emailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => requestNameInput.focus(), 450);
}

function closeEmailModal() {
  emailModal.classList.remove('is-open');
  emailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  formStatus.textContent = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

emailRequestButton.addEventListener('click', openEmailModal);

document.querySelectorAll('[data-modal-close]').forEach((button) => {
  button.addEventListener('click', closeEmailModal);
});

emailRequestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = requestNameInput.value.trim();
  formStatus.textContent = `Thank you${name ? `, ${name}` : ''}. Your request is ready to be submitted.`;
  window.setTimeout(closeEmailModal, 900);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && emailModal.classList.contains('is-open')) {
    closeEmailModal();
  }
});
