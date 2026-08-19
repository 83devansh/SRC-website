/**
 * ==========================================================================
 * Student Research Council (SRC) - Contact Form Controller
 * Client-side validation, error handling, and toast feedback
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('src-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const categorySelect = document.getElementById('contact-category');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  // Input listener to clear errors on user typing
  [nameInput, emailInput, subjectInput, categorySelect, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      clearFieldError(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setFieldError(nameInput, 'Please enter your full name (minimum 2 characters).');
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setFieldError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      setFieldError(subjectInput, 'Please provide a descriptive subject (minimum 3 characters).');
      isValid = false;
    } else {
      clearFieldError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setFieldError(messageInput, 'Please enter a message of at least 10 characters.');
      isValid = false;
    } else {
      clearFieldError(messageInput);
    }

    if (!isValid) return;

    // Simulate submission state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display: inline-block; animation: spin-slow 1s linear infinite;">⏳</span>
      Submitting Inquiry...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();

      // Show success toast
      if (typeof window.showToast === 'function') {
        window.showToast('Thank you! Your research inquiry has been transmitted to SRC.', '📬');
      }
    }, 1200);
  });

  function setFieldError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    let errorMsg = group.querySelector('.form-error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('span');
      errorMsg.className = 'form-error-msg';
      group.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }

  function clearFieldError(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
  }
}
