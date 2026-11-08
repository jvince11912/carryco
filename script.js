
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


/* EMAIL MODAL */
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
  //formStatus.textContent = `Thank you${name ? `, ${name}` : ''}. Your request is ready to be submitted.`;
  //window.setTimeout(closeEmailModal, 900);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && emailModal.classList.contains('is-open')) {
    closeEmailModal();
  }
});

 function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  const templateParams = {
      user_name: event.target.user_name.value,
      user_email: event.target.user_email.value,
      user_phone: event.target.user_phone.value,
      message: event.target.message.value
    };

  emailjs
        .sendForm(
          "service_qz8lcok", //"service_2ch4lu9", //"service_qz8lcok",
          "template_48t6j6q", //"template_xmpc19u", //"template_48t6j6q", 
          event.target,
          "jbLT1B_NRbaJX_8Av", //"NbrtJNH_VyntV6zw5", //"jbLT1B_NRbaJX_8Av"
     ) 
 
    .then(() => { 
       loading.classList.remove("modal__overlay--visible"); 
       success.classList += " modal__overlay--visible";
       waitForUserActivity(success);       
       emailRequestForm.reset(); 
    })
    
    .catch((error) => {
      console.log(error)
      loading.classList.remove("modal__overlay--visible");
      alert( 
        "The email service is temporarily unavailable : " + (error.message) + " . Please contact me directly on carryco888@yahoo.com"
      );
      emailRequestForm.reset(); 
    });

}

/* refactor this function  */
function waitForUserActivity(element) {
  const hideOverlay = () => {
    element.classList.remove("modal__overlay--visible");

    document.removeEventListener("pointerdown", hideOverlay);
    document.removeEventListener("keydown", hideOverlay);
    document.removeEventListener("touchstart", hideOverlay);
    document.removeEventListener("pointermove", hideOverlay);
  };

  document.addEventListener("pointerdown", hideOverlay, { once: true });
  document.addEventListener("keydown", hideOverlay, { once: true });
  document.addEventListener("touchstart", hideOverlay, { passive: true, once: true });
  document.addEventListener("pointermove", hideOverlay, { passive: true, once: true });
}

const heroContact = document.querySelector('#hero-call-or-text');
const heroContactLabel = heroContact?.querySelector('.hero-contact-label');
const phoneBreakpoint = window.matchMedia('(max-width: 900px)');

function updateHeroContactLink() {
  if (!heroContact || !heroContactLabel) return;

  if (phoneBreakpoint.matches) {
    heroContact.href =
      //'sms:+17143174740?body=Hello%2C%20I%20would%20like%20to%20request%20a%20ride.';
      'sms://+15623203552?body=Hello%2C%20I%20would%20like%20to%20request%20a%20ride.';
    heroContactLabel.textContent = 'Text (562) 320-3552';
  } else {
    heroContact.href = 'tel:+17143174740';
    heroContactLabel.textContent = 'Call (714) 317-4740';
  }
}


updateHeroContactLink();
phoneBreakpoint.addEventListener('change', updateHeroContactLink);
