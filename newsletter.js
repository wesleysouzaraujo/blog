/**
 * Envio assíncrono do formulário de newsletter (Formspree ou similar).
 * Requer que o <form> tenha id="newsletter-form", action apontando para
 * o endpoint real, e um elemento id="newsletter-feedback" para mensagens.
 *
 * Se existir mais de um formulário de newsletter na página (ex: um no
 * hero e outro na seção final), dê a cada um um id único e repita o
 * bloco abaixo, ou generalize com document.querySelectorAll('.email-capture-form').
 */
document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('.email-capture-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var feedback = form.parentElement.querySelector('#newsletter-feedback') ||
                      document.getElementById('newsletter-feedback');
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (response) {
          if (response.ok) {
            showFeedback(feedback, '✅ Inscrição confirmada! Verifique seu e-mail.', true);
            form.reset();
          } else {
            return response.json().then(function (data) {
              var message =
                data && data.errors
                  ? data.errors.map(function (e) { return e.message; }).join(', ')
                  : 'Não foi possível concluir sua inscrição.';
              showFeedback(feedback, '⚠️ ' + message, false);
            });
          }
        })
        .catch(function () {
          showFeedback(feedback, '⚠️ Erro de conexão. Tente novamente em instantes.', false);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        });
    });
  });

  function showFeedback(el, text, success) {
    if (!el) return;
    el.textContent = text;
    el.style.display = 'block';
    el.style.color = success ? '#16a34a' : '#E63946';
  }
});
