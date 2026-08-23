/**
 * FitBlog Pro – Banner de Consentimento de Cookies (LGPD/GDPR)
 *
 * Funcionalidades:
 *  - Exibe banner fixo no rodapé caso o visitante ainda não tenha decidido
 *  - "Aceitar" salva preferência em localStorage e inicializa GA4 + AdSense
 *  - "Recusar" salva preferência sem carregar scripts de rastreamento
 *  - Respeita escolha prévia em visitas subsequentes
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'fitblog_cookie_consent';

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function activateAnalytics() {
    if (typeof window.fitblogLoadGA4 === 'function') {
      window.fitblogLoadGA4();
    }
  }

  function activateAdSense() {
    /* AdSense Auto Ads: inicializa adsbygoogle caso ainda não esteja ativo */
    if (window.adsbygoogle && !window.__fitblogAdsActivated) {
      window.__fitblogAdsActivated = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }

  function applyConsent(accepted) {
    if (accepted) {
      activateAnalytics();
      activateAdSense();
    }
  }

  function hideBanner(banner) {
    banner.setAttribute('aria-hidden', 'true');
    banner.style.transform = 'translateY(100%)';
    setTimeout(function () {
      banner.style.display = 'none';
    }, 300);
  }

  function initBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (!banner) return;

    var btnAccept = document.getElementById('cookie-consent-accept');
    var btnDecline = document.getElementById('cookie-consent-decline');

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        setConsent('accepted');
        hideBanner(banner);
        applyConsent(true);
      });
    }

    if (btnDecline) {
      btnDecline.addEventListener('click', function () {
        setConsent('declined');
        hideBanner(banner);
      });
    }
  }

  function init() {
    var consent = getConsent();

    if (consent === 'accepted') {
      applyConsent(true);
    } else if (consent === 'declined') {
      /* Não faz nada — banner não é exibido */
    } else {
      /* Primeira visita: exibe banner */
      var banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.style.display = 'flex';
      }
    }

    initBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
