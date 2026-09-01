(() => {
  const storageKey = 'hemmings-provision-basket-v1';
  const productCards = [...document.querySelectorAll('[data-product-id]')];
  const drawer = document.querySelector('[data-cart-drawer]');
  const backdrop = document.querySelector('.cart-backdrop');
  const itemsEl = document.querySelector('[data-cart-items]');
  const emptyEl = document.querySelector('[data-cart-empty]');
  const countEls = document.querySelectorAll('[data-cart-count]');
  const totalEl = document.querySelector('[data-cart-total]');
  const toast = document.querySelector('[data-shop-toast]');
  let cart = [];

  try { cart = JSON.parse(localStorage.getItem(storageKey)) || []; } catch (_) { cart = []; }

  const money = value => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
  const save = () => localStorage.setItem(storageKey, JSON.stringify(cart));
  const announce = message => {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(announce.timer);
    announce.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  };

  const render = () => {
    itemsEl.innerHTML = '';
    cart.forEach(item => {
      const line = document.createElement('div');
      line.className = 'cart-line';
      line.innerHTML = `<div><h3>${item.name}</h3><p>${money(item.price)}</p></div><button type="button" aria-label="Remove ${item.name}" data-remove="${item.id}">Remove</button>`;
      itemsEl.appendChild(line);
    });
    const count = cart.length;
    countEls.forEach(el => { el.textContent = count; });
    totalEl.textContent = money(cart.reduce((sum, item) => sum + item.price, 0));
    emptyEl.hidden = count > 0;
    itemsEl.hidden = count === 0;
    save();
  };

  const openCart = () => {
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false; document.body.classList.add('cart-open');
    drawer.querySelector('[data-cart-close]').focus();
  };
  const closeCart = () => {
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true; document.body.classList.remove('cart-open');
  };

  document.querySelectorAll('[data-add-to-cart]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('[data-product-id]');
    cart.push({ id: `${card.dataset.productId}-${Date.now()}`, sku: card.dataset.productId, name: card.dataset.name, price: Number(card.dataset.price) });
    render(); announce(`${card.dataset.name} added to the ledger`);
  }));

  itemsEl.addEventListener('click', event => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    cart = cart.filter(item => item.id !== button.dataset.remove); render();
  });

  document.querySelectorAll('[data-cart-open]').forEach(button => button.addEventListener('click', openCart));
  document.querySelectorAll('[data-cart-close]').forEach(button => button.addEventListener('click', closeCart));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });
  document.querySelector('[data-checkout]').addEventListener('click', () => { window.location.href = 'index.html#gazette'; });

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => filter.classList.remove('active'));
    button.classList.add('active');
    productCards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  }));

  render();
})();
