(() => {
  const cards = [...document.querySelectorAll("[data-product-id]")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  function filterProducts(category) {
    filters.forEach(button => { const active=button.dataset.filter===category; button.classList.toggle("active",active); button.setAttribute("aria-pressed",String(active)); });
    cards.forEach(card => { card.hidden=category!=="all" && card.dataset.category!==category; });
  }
  filters.forEach(button => button.addEventListener("click",()=>filterProducts(button.dataset.filter)));
  filterProducts(location.hash==="#direct-editions" ? "books" : "all");
  // A Stripe link click is not proof that a checkout session began.
  // Record it separately so GA4 can be reconciled against Stripe sessions.
  document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach(link => {
    link.addEventListener("click", () => {
      const card = link.closest("[data-product-id]");
      const productId = card?.dataset.productId || "unknown";
      const productName = card?.dataset.name || link.textContent.trim();
      if (typeof window.gtag === "function") {
        window.gtag("event", "stripe_checkout_link_click", {
          product_id: productId,
          product_name: productName,
          page_location: window.location.href
        });
      }
    });
  });
})();
