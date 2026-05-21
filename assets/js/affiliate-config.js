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
    'growth-creatina':         'https://mercadolivre.com/sec/INSIRA_LINK_GROWTH_CREATINA',
    'max-titanium-creatine':   'https://mercadolivre.com/sec/INSIRA_LINK_MAX_TITANIUM',
    'on-creatine':             'https://mercadolivre.com/sec/INSIRA_LINK_ON_CREATINE',
    'probiotica-creatina':     'https://mercadolivre.com/sec/INSIRA_LINK_PROBIOTICA',
    'dark-lab-creatina':       'https://mercadolivre.com/sec/INSIRA_LINK_DARK_LAB',
    'integralmedica-creatina': 'https://mercadolivre.com/sec/INSIRA_LINK_INTEGRALMEDICA',
    'universal-creatine':      'https://mercadolivre.com/sec/INSIRA_LINK_UNIVERSAL'

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

      if (url && url.indexOf('INSIRA_LINK') === -1) {
        el.setAttribute('href', url);
        el.setAttribute('rel', 'nofollow noopener sponsored');
        el.setAttribute('target', '_blank');
        el.removeAttribute('aria-disabled');
      } else {
        /* Link ainda não configurado — mantém visual mas bloqueia clique */
        el.setAttribute('href', '#');
        el.setAttribute('aria-disabled', 'true');
        if (typeof console !== 'undefined') {
          console.warn(
            '[FitBlog Afiliados] Link do Mercado Livre não configurado para o produto: "' +
            productId + '". Edite assets/js/affiliate-config.js para adicionar o link.'
          );
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAffiliateLinks);
  } else {
    applyAffiliateLinks();
  }

})();
