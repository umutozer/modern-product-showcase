document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const contactForm = document.getElementById('contactForm');
  const productCards = document.querySelectorAll('.product-card');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  mobileToggle.addEventListener('click', function() {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const inputs = [nameInput, emailInput, phoneInput, messageInput];
    inputs.forEach(input => {
      const errorSpan = input.parentElement.querySelector('.form-error');
      errorSpan.textContent = '';
      input.classList.remove('error');
    });

    if (nameInput.value.trim().length < 3) {
      showError(nameInput, 'Ad Soyad en az 3 karakter olmalıdır');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, 'Geçerli bir e-posta adresi giriniz');
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
      showError(phoneInput, 'Geçerli bir telefon numarası giriniz');
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Mesaj en az 10 karakter olmalıdır');
      isValid = false;
    }

    if (isValid) {
      const successMsg = document.querySelector('.form-success');
      successMsg.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
      successMsg.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }
  });

  function showError(input, message) {
    input.classList.add('error');
    const errorSpan = input.parentElement.querySelector('.form-error');
    errorSpan.textContent = message;
  }
});