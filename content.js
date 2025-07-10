console.log('[MyExt] ⭐ content.js loaded on', location.href);

(function injectTestButton() {
  console.log('[MyExt] running injectTestButton()');

  const firstPassword = document.querySelector('input[type="password"]');
  console.log('[MyExt] firstPassword =', firstPassword);

  if (!firstPassword) return console.log('[MyExt] no password field');

  const btn = document.createElement('button');
  btn.id = 'autoTestPasswordBtn';
  btn.type = 'button';
  btn.textContent = 'Test';
  Object.assign(btn.style, {
    marginLeft: '8px',
    padding: '2px 6px',
    cursor: 'pointer',
    background: '#ffc',
    border: '1px solid #333',
    zIndex: '9999'
  });

  firstPassword.insertAdjacentElement('afterend', btn);
  console.log('[MyExt] button injected');

  btn.addEventListener('click', () => {
    console.log('[MyExt] Test button clicked — filling passwords');
    const all = document.querySelectorAll('input[type="password"]');
    console.log('[MyExt] found', all.length, 'fields');
    all.forEach((input, i) => {
      input.value = 'password';
      input.dispatchEvent(new Event('input',  { bubbles: true }));
      input.dispatchEvent(new Event('change',{ bubbles: true }));
      console.log(`[MyExt] filled #${i}`);
    });
  });
})();
