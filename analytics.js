/* ============================================================
   eXcelerate Learning — analytics loader
   ------------------------------------------------------------
   Loads Google Analytics 4 (gtag.js) ONLY after the user has
   granted analytics consent via the cookie banner in consent.js.

   Drop on every page with:
     <script src="analytics.js" defer></script>
   AFTER the consent.js script tag (so the listener is registered
   before the banner dispatches its event on page load).

   How it hooks in:
     consent.js fires window CustomEvent('exl:consent', { detail })
     where detail.analytics is 'granted' | 'denied'.
     - On every page load if a stored decision exists.
     - Whenever the user accepts/rejects via the banner.

   When 'granted' is seen for the first time in a page lifetime,
   we inject gtag.js, configure the GA4 property and stop listening.

   ✏️ EDIT: replace the placeholder Measurement ID below with the
   real one from Google Analytics → Admin → Data Streams.
   Until that's done, this file is a no-op (no GA hits are sent).
   ============================================================ */
(function () {
  'use strict';

  // ✏️ EDIT — paste your GA4 Measurement ID here, e.g. 'G-ABC123XYZ'
  var GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

  // Bail out cleanly if the placeholder hasn't been replaced yet —
  // safer than firing requests to an invalid property.
  if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return;
  }

  var loaded = false;

  function loadGtag() {
    if (loaded) return;
    loaded = true;

    // Standard gtag.js bootstrap
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    // anonymize_ip not needed in GA4 (IPs are anonymised by default),
    // but we explicitly disable Google Signals & ad personalisation
    // to keep us cleanly inside UK GDPR analytics-only consent.
    gtag('config', GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  }

  function onConsent(e) {
    if (e && e.detail && e.detail.analytics === 'granted') {
      loadGtag();
      window.removeEventListener('exl:consent', onConsent);
    }
  }

  window.addEventListener('exl:consent', onConsent);
})();
