import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfSVWxUFRLc-mWbmeBGqzkXrX3tysqrgc",
  authDomain: "srcwebsite-7ab50.firebaseapp.com",
  projectId: "srcwebsite-7ab50",
  storageBucket: "srcwebsite-7ab50.firebasestorage.app",
  messagingSenderId: "123629821798",
  appId: "1:123629821798:web:0ce724222ad17de7a3f2a7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// CONTACT FORM
// ============================================================

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
  const phoneInput = document.getElementById('contact-phone');


  // Clear errors while typing
  [nameInput, emailInput, phoneInput, subjectInput, categorySelect, messageInput]
    .forEach(input => {

      if (!input) return;

      input.addEventListener('input', () => {
        clearFieldError(input);
      });

    });


  // ==========================================================
  // FORM SUBMIT
  // ==========================================================

  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    let isValid = true;


    // --------------------------------------------------------
    // Validate Name
    // --------------------------------------------------------

    if (
      !nameInput.value.trim() ||
      nameInput.value.trim().length < 2
    ) {

      setFieldError(
        nameInput,
        'Please enter your full name (minimum 2 characters).'
      );

      isValid = false;

    } else {

      clearFieldError(nameInput);

    }


    // --------------------------------------------------------
    // Validate Email
    // --------------------------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailInput.value.trim() ||
      !emailRegex.test(emailInput.value.trim())
    ) {

      setFieldError(
        emailInput,
        'Please enter a valid email address.'
      );

      isValid = false;

    } else {

      clearFieldError(emailInput);

    }

    const phoneRegex = /^[6-9]\d{9}$/;

if (
  !phoneInput.value.trim() ||
  !phoneRegex.test(phoneInput.value.trim())
) {

  setFieldError(
    phoneInput,
    'Please enter a valid 10-digit mobile number.'
  );

  isValid = false;

} else {

  clearFieldError(phoneInput);

}


    // --------------------------------------------------------
    // Validate Subject
    // --------------------------------------------------------

    if (
      !subjectInput.value.trim() ||
      subjectInput.value.trim().length < 3
    ) {

      setFieldError(
        subjectInput,
        'Please provide a descriptive subject (minimum 3 characters).'
      );

      isValid = false;

    } else {

      clearFieldError(subjectInput);

    }


    // --------------------------------------------------------
    // Validate Message
    // --------------------------------------------------------

    if (
      !messageInput.value.trim() ||
      messageInput.value.trim().length < 10
    ) {

      setFieldError(
        messageInput,
        'Please enter a message of at least 10 characters.'
      );

      isValid = false;

    } else {

      clearFieldError(messageInput);

    }


    // Stop if validation failed
    if (!isValid) return;


    // ========================================================
    // FIREBASE SUBMISSION
    // ========================================================

    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
      <span style="
        display:inline-block;
        animation:spin-slow 1s linear infinite;
      ">⏳</span>
      Sending...
    `;


    try {

      // Add document to Firestore
     console.log("Sending data to Firebase...");

const docRef = await addDoc(
  collection(db, "contact_submissions"),
  {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    subject: subjectInput.value.trim(),
    category: categorySelect ? categorySelect.value : "",
    message: messageInput.value.trim(),
    submittedAt: serverTimestamp()
  }
);

console.log("Firebase document created:", docRef.id);


      // ======================================================
      // SUCCESS
      // ======================================================

      form.reset();

      submitBtn.disabled = false;

      submitBtn.innerHTML = originalBtnText;


      if (typeof window.showToast === 'function') {

        window.showToast(
          'Thank you! Your research inquiry has been submitted successfully.',
          '📬'
        );

      }


    } catch (error) {

      console.error(
        "Firebase submission error:",
        error
      );


      // ======================================================
      // ERROR
      // ======================================================

      submitBtn.disabled = false;

      submitBtn.innerHTML = originalBtnText;


      if (typeof window.showToast === 'function') {

        window.showToast(
          'Something went wrong. Please try again.',
          '⚠️'
        );

      }

    }

  });


  // ==========================================================
  // FIELD ERROR FUNCTIONS
  // ==========================================================

  function setFieldError(input, message) {

    const group = input.closest('.form-group');

    if (!group) return;

    group.classList.add('has-error');

    let errorMsg =
      group.querySelector('.form-error-msg');

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