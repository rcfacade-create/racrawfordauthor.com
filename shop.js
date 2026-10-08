(() => {
  const cards = [...document.querySelectorAll("[data-product-id]")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  function filterProducts(category) {
    filters.forEach(button => { const active=button.dataset.filter===category; button.classList.toggle("active",active); button.setAttribute("aria-pressed",String(active)); });
    cards.forEach(card => { card.hidden=category!=="all" && card.dataset.category!==category; });
  }
  filters.forEach(button => button.addEventListener("click",()=>filterProducts(button.dataset.filter)));
  filterProducts(location.hash==="#direct-editions" ? "books" : "all");
})();
