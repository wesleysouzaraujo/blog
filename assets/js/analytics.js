/**
 * FitBlog Pro – Google Analytics 4 (GA4)
 *
 * CONFIGURAÇÃO:
 *  Substitua 'G-XXXXXXXXXX' pelo ID de Medição real da sua propriedade GA4.
 *  Acesse: https://analytics.google.com → Admin → Fluxos de dados → Web
 *
 * Este arquivo é carregado condicionalmente pelo cookie-consent.js:
 * o GA4 só é inicializado após o visitante aceitar os cookies analíticos.
 */

(function () {
  'use strict';

  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← substitua pelo ID real

  function loadGA4() {
    if (typeof window.gtag === 'function') return; // já carregado

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true
    });
  }

  /* Exposta globalmente para que o cookie-consent.js possa chamar */
  window.fitblogLoadGA4 = loadGA4;

})();
