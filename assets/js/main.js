/**
 * FitBlog Pro - Main JavaScript
 * Fitness & Gym Affiliate Blog
 */

(function () {
  'use strict';

  /* === Mobile Menu Toggle === */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* === FAQ Accordion === */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Close all
      faqQuestions.forEach(function (q) {
        q.classList.remove('active');
        const a = q.nextElementSibling;
        if (a) a.classList.remove('open');
      });

      // Toggle current
      if (!isActive) {
        this.classList.add('active');
        if (answer) answer.classList.add('open');
      }
    });
  });

  /* === Sticky Header Scroll Shadow === */
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      }
    }, { passive: true });
  }

  /* === Email Form Submission === */
  const emailForms = document.querySelectorAll('.email-capture-form');

  emailForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!emailInput || !emailInput.value) return;

      // Simulate form submission feedback
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Inscrito!';
      submitBtn.disabled = true;
      submitBtn.style.background = '#16a34a';

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        emailInput.value = '';
      }, 3000);
    });
  });

  /* === Contact Form Submission === */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const msg = document.getElementById('formMessage');

      if (btn) {
        btn.textContent = 'Enviando...';
        btn.disabled = true;
      }

      setTimeout(function () {
        if (msg) {
          msg.textContent = '✓ Mensagem enviada! Retornaremos em breve.';
          msg.style.display = 'block';
          msg.style.color = '#16a34a';
        }
        if (btn) {
          btn.textContent = 'Enviar Mensagem';
          btn.disabled = false;
        }
        contactForm.reset();
      }, 1500);
    });
  }

  /* === Smooth Scroll for Anchor Links === */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* === Active Nav Link === */
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a, .mobile-menu a');

  navLinks.forEach(function (link) {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });

  /* === Lazy Animation on Scroll === */
  if ('IntersectionObserver' in window) {
    const animatables = document.querySelectorAll('.card, .category-card, .review-card');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatables.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }

  /* === Affiliate Links === */
  const AFFILIATE_CONFIG = {
    mercadolivre: {
      matt_tool: '38524122'
    }
  };

  const PRODUCT_LINKS = {
    'growth-creatina-250g': {
      store: 'mercadolivre',
      url: 'https://www.mercadolivre.com.br/creatina-monohidratada-250g-growth-supplements-sem-sabor-em-po/p/MLB19603205?pdp_filters=item_id%3AMLB5872060016'
    }
  };

  function buildMercadoLivreAffiliateUrl(rawUrl) {
    if (!rawUrl) return '#';

    try {
      const url = new URL(rawUrl);
      url.searchParams.set('matt_tool', AFFILIATE_CONFIG.mercadolivre.matt_tool);
      url.hash = '';
      return url.toString();
    } catch (error) {
      return '#';
    }
  }

  function resolveAffiliateUrl(productKey) {
    const product = PRODUCT_LINKS[productKey];
    if (!product) return '#';

    if (product.store === 'mercadolivre') {
      return buildMercadoLivreAffiliateUrl(product.url);
    }

    return product.url || '#';
  }

  document.querySelectorAll('.js-affiliate-link').forEach(function (link) {
    const productKey = link.dataset.product;
    const finalUrl = resolveAffiliateUrl(productKey);

    if (finalUrl && finalUrl !== '#') {
      const updatedLink = link.cloneNode(true);
      updatedLink.href = finalUrl;
      updatedLink.setAttribute('rel', 'nofollow sponsored noopener noreferrer');
      updatedLink.setAttribute('target', '_blank');
      link.replaceWith(updatedLink);
    }
  });

})();
