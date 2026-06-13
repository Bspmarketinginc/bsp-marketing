(function () {

  // ── 1. CONTENT SECURITY POLICY ──────────────────────────────────────────
  // Injected via meta tag so it applies even on static hosting
  const csp = document.createElement('meta');
  csp.httpEquiv = 'Content-Security-Policy';
  csp.content = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'"
  ].join('; ');
  document.head.prepend(csp);

  // Prevent clickjacking
  const xFrame = document.createElement('meta');
  xFrame.httpEquiv = 'X-Frame-Options';
  xFrame.content = 'DENY';
  document.head.prepend(xFrame);

  // Don't leak referrer info to third parties
  const ref = document.createElement('meta');
  ref.name = 'referrer';
  ref.content = 'strict-origin-when-cross-origin';
  document.head.prepend(ref);


  // ── 2. HONEYPOT + RATE LIMITING on all forms ────────────────────────────
  const RATE_LIMIT_MS = 60000; // 1 minute between submissions
  const submissions = {};

  document.querySelectorAll('form').forEach(function (form) {

    // Add a hidden honeypot field — bots fill it in, humans don't
    const honey = document.createElement('input');
    honey.type = 'text';
    honey.name = 'website_url';
    honey.autocomplete = 'off';
    honey.tabIndex = -1;
    honey.style.cssText = 'position:absolute;left:-9999px;height:0;width:0;opacity:0;pointer-events:none;';
    honey.setAttribute('aria-hidden', 'true');
    form.appendChild(honey);

    form.addEventListener('submit', function (e) {
      // Bot check: honeypot field should be empty
      if (honey.value.trim() !== '') {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }

      // Rate limit: block if same form submitted within 1 minute
      const formId = form.id || form.action || 'form';
      const now = Date.now();
      if (submissions[formId] && now - submissions[formId] < RATE_LIMIT_MS) {
        e.preventDefault();
        e.stopImmediatePropagation();
        showError(form, 'Please wait a moment before submitting again.');
        return false;
      }

      // Sanitize all text inputs before submission
      form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(function (field) {
        field.value = sanitize(field.value);
      });

      submissions[formId] = now;
    }, true);
  });


  // ── 3. INPUT SANITIZATION ───────────────────────────────────────────────
  function sanitize(str) {
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }


  // ── 4. ERROR MESSAGE HELPER ─────────────────────────────────────────────
  function showError(form, message) {
    let err = form.querySelector('.security-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'security-error';
      err.style.cssText = 'color:#c0392b;font-size:0.85rem;margin-top:0.5rem;';
      form.appendChild(err);
    }
    err.textContent = message;
    setTimeout(function () { err.textContent = ''; }, 4000);
  }


  // ── 5. BLOCK COMMON BOT PATTERNS ───────────────────────────────────────
  // Detect if the page is being loaded inside an iframe (clickjacking)
  if (window.self !== window.top) {
    document.body.innerHTML = '';
    window.top.location = window.self.location;
  }

})();
