(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }));
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('is-visible'));

  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('.menu-item');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    tabs.forEach(item => item.setAttribute('aria-pressed', String(item === tab)));
    items.forEach(item => { item.hidden = category !== 'all' && item.dataset.category !== category; });
  }));

  const booking = document.querySelector('#booking-form');
  if (booking) {
    const date = booking.querySelector('[name="date"]');
    if (date) {
      const today = new Date();
      const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      date.min = local;
    }
    booking.addEventListener('submit', event => {
      event.preventDefault();
      if (!booking.reportValidity()) return;
      const name = booking.elements.name.value.trim();
      const status = booking.querySelector('.form-status');
      status.textContent = `Thanks, ${name}. Your request is noted — our team will confirm by email shortly.`;
      booking.reset();
      if (date) {
        const today = new Date();
        date.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      }
    });
  }

  document.querySelectorAll('[data-demo-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    if (status) status.textContent = 'Thank you — you’re on the list.';
    form.reset();
  }));
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();