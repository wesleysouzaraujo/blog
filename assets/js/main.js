document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("products-grid");

  if (!grid || !Array.isArray(products) || products.length === 0) {
    return;
  }

  products.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img class="product-card__image" src="${product.image}" alt="${product.title}" loading="lazy">
      <div class="product-card__body">
        <h3 class="product-card__title">${product.title}</h3>
        <p class="product-card__description">${product.description}</p>
        <span class="product-card__price">${product.price}</span>
        <a class="product-card__btn" href="${product.link}" target="_blank" rel="noopener noreferrer sponsored">
          Ver no Mercado Livre
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
});
