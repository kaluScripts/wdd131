/* ==========================================================================
   Roban Stores, Awka — main.js
   Shared behavior for every page: mobile nav toggle, active-link highlight,
   dynamic footer year, and a returning-visitor welcome message.
   ========================================================================== */

function initNavToggle() {
  const toggleBtn = document.querySelector('#navToggle');
  const nav = document.querySelector('#primaryNav');

  if (!toggleBtn || !nav) {
    return;
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', `${isOpen}`);
  });
}

function markActiveNavLink() {
  const links = Array.from(document.querySelectorAll('.primary-nav a'));
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function setFooterYear() {
  const yearEl = document.querySelector('#year');

  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = `${currentYear}`;
  }
}

function readVisitRecord() {
  const stored = localStorage.getItem('robanVisitRecord');

  if (!stored) {
    return { count: 0, lastPage: '', lastVisit: '' };
  }

  return JSON.parse(stored);
}

function saveVisitRecord(record) {
  localStorage.setItem('robanVisitRecord', JSON.stringify(record));
}

function trackVisit() {
  const badge = document.querySelector('#visitBadge');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const record = readVisitRecord();

  record.count += 1;
  record.lastPage = currentPage;
  record.lastVisit = new Date().toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  saveVisitRecord(record);

  if (!badge) {
    return;
  }

  if (record.count === 1) {
    badge.textContent = 'Welcome to Roban Stores, Awka — glad you found us!';
  } else if (record.count < 5) {
    badge.textContent = `Welcome back! This is visit number ${record.count}.`;
  } else {
    badge.textContent = `Welcome back — you've visited ${record.count} times. Thank you for shopping with Roban Stores!`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  markActiveNavLink();
  setFooterYear();
  trackVisit();
});
