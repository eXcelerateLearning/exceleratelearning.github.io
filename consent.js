/* ============================================================
   eXcelerate Learning — cookie consent banner
   ------------------------------------------------------------
   Drop this file on the page with:
     <script src="consent.js" defer></script>
   and include in the footer of each page a link/button:
     <a href="#" onclick="if(window.exlConsent)window.exlConsent.openPrefs();return false;">
       Cookie settings
     </a>

   Responsibilities:
     - Injects styles + banner markup
     - Reads / writes the first-party `exl_consent` cookie
     - Fires window.dispatchEvent(new CustomEvent('exl:consent', { detail }))
       so the GA4 snippet (when added) can listen for consent before loading

   GA4 wiring (when Chris is ready to add it):
   -------------------------------------------
     window.addEventListener('exl:consent', function (e) {
       if (e.detail.analytics === 'granted') {
         // load gtag.js + send config — only fires after consent
       }
     });

   Cloudflare Web Analytics is cookie-free → can load unconditionally,
   outside this file.
   ============================================================ */
(function () {
  'use strict';

  var COOKIE_NAME = 'exl_consent';
  var COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

  // ─── Cookie helpers ──────────────────────────────────────
  function readCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function writeCookie(name, value) {
    var secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie =
      name + '=' + encodeURIComponent(value) +
      '; Max-Age=' + COOKIE_MAX_AGE_SECONDS +
      '; Path=/' +
      '; SameSite=Lax' +
      secure;
  }

  function getConsent() {
    var raw = readCookie(COOKIE_NAME);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  function setConsent(state) {
    var payload = {
      essential: 'granted',
      analytics: state.analytics === 'granted' ? 'granted' : 'denied',
      v: 1,
      t: new Date().toISOString()
    };
    writeCookie(COOKIE_NAME, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent('exl:consent', { detail: payload }));
    return payload;
  }

  // ─── Styles ──────────────────────────────────────────────
  var css = [
    '.exl-consent {',
    '  position: fixed; left: 20px; right: 20px; bottom: 20px;',
    '  max-width: 520px; margin-left: auto;',
    '  background: #1E1E38; border: 1px solid rgba(255,255,255,0.09);',
    '  border-radius: 16px; padding: 22px 24px;',
    '  box-shadow: 0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,0,251,0.08);',
    '  font-family: "Open Sans", system-ui, -apple-system, sans-serif;',
    '  color: #9B9BC4; font-size: 14px; line-height: 1.6;',
    '  z-index: 9999; transform: translateY(calc(100% + 40px));',
    '  transition: transform 0.35s cubic-bezier(0.22,0.61,0.36,1);',
    '}',
    '.exl-consent.is-open { transform: translateY(0); }',
    '.exl-consent-title {',
    '  font-family: "Rowdies", cursive; font-weight: 700;',
    '  color: #fff; font-size: 18px; letter-spacing: -0.3px;',
    '  margin: 0 0 8px;',
    '}',
    '.exl-consent p { margin: 0 0 16px; color: #9B9BC4; }',
    '.exl-consent a { color: #FF00FB; text-decoration: none; border-bottom: 1px solid rgba(255,0,251,0.3); }',
    '.exl-consent a:hover { color: #fff; border-color: #fff; }',
    '.exl-consent-actions { display: flex; gap: 10px; flex-wrap: wrap; }',
    '.exl-consent-btn {',
    '  font-family: inherit; font-size: 13px; font-weight: 700;',
    '  letter-spacing: 0.3px; border-radius: 999px;',
    '  padding: 10px 18px; cursor: pointer; border: 1px solid transparent;',
    '  transition: transform 0.15s, box-shadow 0.2s, background 0.2s, color 0.2s;',
    '}',
    '.exl-consent-btn:hover { transform: translateY(-1px); }',
    '.exl-consent-btn.primary {',
    '  background: linear-gradient(135deg, #FF00FB, #FF0063); color: #fff;',
    '  box-shadow: 0 6px 18px rgba(255,0,251,0.28);',
    '}',
    '.exl-consent-btn.primary:hover { box-shadow: 0 10px 26px rgba(255,0,251,0.38); }',
    '.exl-consent-btn.secondary {',
    '  background: transparent; color: #fff;',
    '  border-color: rgba(255,255,255,0.18);',
    '}',
    '.exl-consent-btn.secondary:hover { border-color: #fff; background: rgba(255,255,255,0.04); }',
    '.exl-consent-close {',
    '  position: absolute; top: 12px; right: 14px;',
    '  width: 28px; height: 28px; padding: 0;',
    '  background: transparent; border: none; cursor: pointer;',
    '  color: #5A5A7A; font-size: 18px; line-height: 1;',
    '  transition: color 0.2s;',
    '}',
    '.exl-consent-close:hover { color: #fff; }',
    '@media (max-width: 560px) {',
    '  .exl-consent { left: 12px; right: 12px; bottom: 12px; padding: 20px; }',
    '  .exl-consent-actions { flex-direction: column; }',
    '  .exl-consent-btn { width: 100%; }',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  .exl-consent { transition: none; }',
    '}'
  ].join('\n');

  function injectStyles() {
    if (document.getElementById('exl-consent-styles')) return;
    var style = document.createElement('style');
    style.id = 'exl-consent-styles';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  // ─── Banner markup + behaviour ───────────────────────────
  var bannerEl = null;

  function buildBanner() {
    if (bannerEl) return bannerEl;
    var wrap = document.createElement('div');
    wrap.className = 'exl-consent';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Cookie consent');
    wrap.innerHTML =
      '<button class="exl-consent-close" type="button" aria-label="Close">\u2715</button>' +
      '<div class="exl-consent-title">Cookies on this site</div>' +
      '<p>We use a small number of cookies to make this site work. With your permission, we\u2019d also like to set optional analytics cookies to help us understand how the site is used. Read our <a href="cookie-policy.html">Cookie Policy</a>.</p>' +
      '<div class="exl-consent-actions">' +
        '<button class="exl-consent-btn primary" type="button" data-action="accept">Accept all</button>' +
        '<button class="exl-consent-btn secondary" type="button" data-action="reject">Reject optional</button>' +
      '</div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) {
      var target = e.target;
      if (!target || !target.getAttribute) return;
      var action = target.getAttribute('data-action');
      if (action === 'accept') {
        setConsent({ analytics: 'granted' });
        closeBanner();
      } else if (action === 'reject') {
        setConsent({ analytics: 'denied' });
        closeBanner();
      } else if (target.classList.contains('exl-consent-close')) {
        // Treat close without decision as "reject optional" for safety under PECR
        setConsent({ analytics: 'denied' });
        closeBanner();
      }
    });
    bannerEl = wrap;
    return wrap;
  }

  function openBanner() {
    injectStyles();
    buildBanner();
    // Allow the element to be painted before animating in
    requestAnimationFrame(function () {
      bannerEl.classList.add('is-open');
    });
  }

  function closeBanner() {
    if (!bannerEl) return;
    bannerEl.classList.remove('is-open');
  }

  function init() {
    var existing = getConsent();
    if (existing) {
      // Re-fire event on every page load so analytics can re-init
      window.dispatchEvent(new CustomEvent('exl:consent', { detail: existing }));
      return;
    }
    openBanner();
  }

  // ─── Public API ──────────────────────────────────────────
  window.exlConsent = {
    get: getConsent,
    set: setConsent,
    openPrefs: openBanner,
    close: closeBanner
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
