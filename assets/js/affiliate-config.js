/**
 * FitBlog Pro – Configuração de Links de Afiliado (Mercado Livre)
 *
 * Como usar:
 *  1. Acesse o Programa de Afiliados do Mercado Livre:
 *     https://www.mercadolivre.com.br/afiliados
 *  2. Gere o link rastreado para cada produto desejado.
 *  3. Cole o link no objeto AFFILIATE_LINKS abaixo, usando o ID
 *     correspondente ao atributo  data-affiliate-product  do botão no HTML.
 *  4. Salve o arquivo — os botões serão atualizados automaticamente.
 *
 * Exemplo de link gerado pelo Mercado Livre:
 *   https://mercadolivre.com/sec/XXXXXXX
 */

(function () {
  'use strict';

  /* -------------------------------------------------------
   * Cadastre aqui os links de afiliado de cada produto.
   * Substitua os valores entre aspas pelo link real gerado
   * no painel do Programa de Afiliados do Mercado Livre.
   * ------------------------------------------------------- */
  var AFFILIATE_LINKS = {
    /* --- Creatinas --- */
    'growth-creatina': 'https://www.mercadolivre.com.br/s#D[A:growth+supplements+creatina+monohidratada]',
    'max-titanium-creatine': 'https://www.mercadolivre.com.br/s#D[A:max+titanium+creatine]',
    'on-creatine': 'https://www.mercadolivre.com.br/s#D[A:optimum+nutrition+creatine+powder]',
    'probiotica-creatina': 'https://www.mercadolivre.com.br/s#D[A:probiotica+creatina]',
    'dark-lab-creatina': 'https://www.mercadolivre.com.br/s#D[A:dark+lab+creatina+micronizada]',
    'integralmedica-creatina': 'https://www.mercadolivre.com.br/s#D[A:integralmedica+creatina]',
    'universal-creatine': 'https://www.mercadolivre.com.br/s#D[A:universal+creatine]'

    /* Adicione novos produtos aqui seguindo o mesmo padrão:
    'id-do-produto': 'https://mercadolivre.com/sec/SEU_LINK_AQUI', */
  };

  /* -------------------------------------------------------
   * Preenche automaticamente os href dos botões que usam
   * o atributo  data-affiliate-product.
   * ------------------------------------------------------- */
  function applyAffiliateLinks() {
    var buttons = document.querySelectorAll('[data-affiliate-product]');

    buttons.forEach(function (el) {
      var productId = el.getAttribute('data-affiliate-product');
      var url = AFFILIATE_LINKS[productId];

      if (url) {
        el.setAttribute('href', url);
        el.setAttribute('rel', 'nofollow noopener noreferrer');
        el.setAttribute('target', '_blank');
        el.removeAttribute('aria-disabled');
        el.removeAttribute('tabindex');
        el.classList.remove('affiliate-link-disabled');
      } else {
        /* Link ainda não configurado — mantém visual mas bloqueia clique */
        el.removeAttribute('href');
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('tabindex', '-1');
        el.classList.add('affiliate-link-disabled');
        if (el.textContent.indexOf('Em breve') === -1) {
          el.textContent = el.textContent.trim() + ' (Em breve)';
        }
        if (typeof console !== 'undefined') {
          console.warn(
            '[FitBlog Afiliados] Link do Mercado Livre não configurado para o produto: "' +
            productId + '". Edite assets/js/affiliate-config.js para adicionar o link.'
          );
        }
      }

      el.addEventListener('click', function (event) {
        if (!url) {
          event.preventDefault();
          return;
        }

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_click', {
            event_category: 'affiliate',
            event_label: productId,
            affiliate_product: productId,
            affiliate_url: url
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAffiliateLinks);
  } else {
    applyAffiliateLinks();
  }

})();
