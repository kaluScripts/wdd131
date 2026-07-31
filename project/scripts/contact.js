/* ==========================================================================
   Roban Stores, Awka — contact.js
   Client-side validation, a live character counter, a localStorage draft
   save/restore, and a dynamic confirmation message on successful submit.
   ========================================================================== */

const subjectResponses = {
  'General Inquiry': "We will get back to you within one business day.",
  'Delivery Request': "Our delivery team will confirm availability for your area within 24 hours.",
  'Product Availability': "We will check current stock and reply with what's available.",
  'Feedback': "Thank you for helping us improve, a team member will follow up shortly.",
};

const formFieldIds = ['fullName', 'email', 'subject', 'message'];

function validateFullName() {
  const field = document.querySelector('#fullName');
  const value = field.value.trim();

  if (value.length < 2) {
    return 'Please enter your full name.';
  }

  return '';
}

function validateEmail() {
  const field = document.querySelector('#email');
  const value = field.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    return 'Please enter your email address.';
  }

  if (!emailPattern.test(value)) {
    return 'Please enter a valid email address.';
  }

  return '';
}

function validatePhone() {
  const field = document.querySelector('#phone');
  const value = field.value.trim();

  if (!value) {
    return '';
  }

  const phonePattern = /^[0-9+\s-]{7,15}$/;

  if (!phonePattern.test(value)) {
    return 'Please enter a valid phone number, or leave this field blank.';
  }

  return '';
}

function validateSubject() {
  const field = document.querySelector('#subject');

  if (!field.value) {
    return 'Please choose a subject.';
  }

  return '';
}

function validateMessage() {
  const field = document.querySelector('#message');
  const value = field.value.trim();

  if (value.length < 10) {
    return 'Please enter at least 15 characters so we understand your message.';
  }

  return '';
}

const validators = {
  fullName: validateFullName,
  email: validateEmail,
  phone: validatePhone,
  subject: validateSubject,
  message: validateMessage,
};

function showFieldError(fieldId, message) {
  const errorEl = document.querySelector(`#${fieldId}Error`);
  const row = document.querySelector(`#${fieldId}Row`);

  if (errorEl) {
    errorEl.textContent = message;
  }

  if (row) {
    if (message) {
      row.classList.add('has-error');
    } else {
      row.classList.remove('has-error');
    }
  }
}

function validateField(fieldId) {
  const validator = validators[fieldId];

  if (!validator) {
    return true;
  }

  const message = validator();
  showFieldError(fieldId, message);

  return message === '';
}

function initLiveValidation() {
  Object.keys(validators).forEach((fieldId) => {
    const field = document.querySelector(`#${fieldId}`);

    if (!field) {
      return;
    }

    field.addEventListener('blur', () => {
      validateField(fieldId);
    });
  });
}

function initCharCount() {
  const messageField = document.querySelector('#message');
  const counter = document.querySelector('#charCount');

  if (!messageField || !counter) {
    return;
  }

  messageField.addEventListener('input', () => {
    const length = messageField.value.length;
    counter.textContent = `${length} / 300`;
  });
}

function getDraftKey() {
  return 'robanContactDraft';
}

function collectFormData() {
  return {
    fullName: document.querySelector('#fullName').value,
    email: document.querySelector('#email').value,
    phone: document.querySelector('#phone').value,
    subject: document.querySelector('#subject').value,
    message: document.querySelector('#message').value,
  };
}

function saveDraft() {
  const data = collectFormData();
  localStorage.setItem(getDraftKey(), JSON.stringify(data));
}

function clearDraft() {
  localStorage.removeItem(getDraftKey());
}

function restoreDraft() {
  const stored = localStorage.getItem(getDraftKey());
  const draftNote = document.querySelector('#draftNote');

  if (!stored) {
    return;
  }

  const data = JSON.parse(stored);
  const hasContent = Object.values(data).some((value) => value.trim() !== '');

  if (!hasContent) {
    return;
  }

  document.querySelector('#fullName').value = data.fullName || '';
  document.querySelector('#email').value = data.email || '';
  document.querySelector('#phone').value = data.phone || '';
  document.querySelector('#subject').value = data.subject || '';
  document.querySelector('#message').value = data.message || '';

  const messageField = document.querySelector('#message');
  const counter = document.querySelector('#charCount');
  if (messageField && counter) {
    counter.textContent = `${messageField.value.length} / 300`;
  }

  if (draftNote) {
    draftNote.textContent = "We've restored the message you started earlier.";
  }
}

function initDraftAutosave() {
  const form = document.querySelector('#contactForm');

  if (!form) {
    return;
  }

  form.addEventListener('input', () => {
    saveDraft();
  });
}

function buildConfirmationMessage(data) {
  const responseLine = subjectResponses[data.subject] || "We'll get back to you shortly.";

  return `Thanks, ${data.fullName} — your message about "${data.subject}" has been received. ${responseLine}`;
}

function showConfirmation(data) {
  const form = document.querySelector('#contactForm');
  const panel = document.querySelector('#confirmationPanel');
  const text = document.querySelector('#confirmationText');

  if (text) {
    text.textContent = buildConfirmationMessage(data);
  }

  if (panel) {
    panel.classList.remove('hidden');
  }

  if (form) {
    form.classList.add('hidden');
  }
}

function focusFirstInvalidField() {
  const firstInvalidRow = document.querySelector('.form-row.has-error');

  if (firstInvalidRow) {
    const field = firstInvalidRow.querySelector('input, select, textarea');
    if (field) {
      field.focus();
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const results = formFieldIds.map((fieldId) => validateField(fieldId));
  validateField('phone');

  const allValid = results.every((isValid) => isValid === true);

  if (!allValid) {
    focusFirstInvalidField();
    return;
  }

  const data = collectFormData();
  showConfirmation(data);
  clearDraft();
}

function initForm() {
  const form = document.querySelector('#contactForm');

  if (!form) {
    return;
  }

  form.addEventListener('submit', handleSubmit);
}

document.addEventListener('DOMContentLoaded', () => {
  restoreDraft();
  initLiveValidation();
  initCharCount();
  initDraftAutosave();
  initForm();
});
