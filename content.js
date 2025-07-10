// content.js
console.log('[MyExt] content.js loaded on', location.href);

function fillPasswords() {
  console.log('[MyExt] filling all password fields');
  document.querySelectorAll("input[type='password']").forEach((input, i) => {
    input.value = 'password';
    input.dispatchEvent(new Event('input',  { bubbles: true }));
    input.dispatchEvent(new Event('change',{ bubbles: true }));
    console.log(`[MyExt] filled field #${i}`);
  });
}

function injectButton(nextTo) {
  if (document.getElementById('autoTestPasswordBtn')) {
    console.log('[MyExt] button already exists');
    return;
  }
  const btn = document.createElement('button');
  btn.id = 'autoTestPasswordBtn';
  btn.type = 'button';
  btn.textContent = 'Test';
  nextTo.parentNode.parentNode.insertBefore(btn, field.nextSibling);
  console.log('[MyExt] button injected');
  btn.addEventListener('click', fillPasswords);
}

function tryInject() {
  const pw = document.querySelector("input[type='password']");
  if (pw) {
    console.log('[MyExt] password input found:', pw);
    injectButton(pw);
    return true;
  } else {
    console.log('[MyExt] no password field yet');
    return false;
  }
}

// 1) Try once right away…
if (!tryInject()) {
  // 2) …and if that fails, watch the DOM for changes
  const observer = new MutationObserver((_, obs) => {
    if (tryInject()) obs.disconnect(); 
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
