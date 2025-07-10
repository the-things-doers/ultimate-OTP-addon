(function injectTestButton() {
  // 1. Locate the first password field
  const firstPassword = document.querySelector('input[type="password"]');
  if (!firstPassword) return;   // nothing to do if no password inputs

  // 2. Create and style the button
  const btn = document.createElement('button');
  btn.id = 'autoTestPasswordBtn';
  btn.type = 'button';
  btn.textContent = 'Test';
  // (optional) simple styling so it doesn't look raw
  btn.style.marginLeft = '8px';
  btn.style.padding = '2px 6px';
  btn.style.cursor = 'pointer';

  // 3. Insert it right after the first password field
  firstPassword.insertAdjacentElement('afterend', btn);

  // 4. When clicked, fill in *all* password fields
  btn.addEventListener('click', () => {
    const allPasswords = document.querySelectorAll('input[type="password"]');
    if (allPasswords.length === 0) return alert('No password fields found!');
    allPasswords.forEach(input => {
      input.value = 'password';
      // For frameworks (React/Vue) that listen to events:
      input.dispatchEvent(new Event('input',  { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
})();