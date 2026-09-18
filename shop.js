(() => {
  const directEditionsCard = document.querySelector('[data-product-id="WFAS-PRINT-001"]');

  if (directEditionsCard) {
    const editionCards = `
      <article class="product-card edition-card" data-category="books" data-product-id="WFAS-PB-001" data-name="The War of Feather & Shadow — Paperback">
        <div class="product-image book-product edition-visual edition-paperback">
          <div class="edition-book"><img src="assets/war-of-feather-and-shadow-shop-cover.jpg" alt="The War of Feather & Shadow paperback edition" /></div>
          <span class="product-badge">Paperback</span>
          <span class="edition-format">Standard Edition</span>
        </div>
        <div class="product-copy">
          <p class="product-type">Book One · Paperback</p>
          <h3>The War of Feather &amp; Shadow</h3>
          <p class="product-description">The standard paperback edition, supplied directly by R.A. Crawford. UK delivery is £3.49.</p>
          <div class="product-bottom"><strong>£9.99</strong><a class="btn primary" href="https://buy.stripe.com/test_14A28r8jV11E3K28a98ww00" target="_blank" rel="noopener noreferrer">Buy Paperback</a></div>
        </div>
      </article>

      <article class="product-card edition-card signed-edition" data-category="books" data-product-id="WFAS-SPB-001" data-name="The War of Feather & Shadow — Signed Paperback">
        <div class="product-image book-product edition-visual edition-paperback">
          <div class="edition-book"><img src="assets/war-of-feather-and-shadow-shop-cover.jpg" alt="Signed paperback edition of The War of Feather & Shadow" /></div>
          <span class="product-badge gold">Signed</span>
          <span class="edition-format">Signed Paperback</span>
          <span class="signed-mark">Signed by R.A. Crawford</span>
        </div>
        <div class="product-copy">
          <p class="product-type">Book One · Signed Paperback</p>
          <h3>The War of Feather &amp; Shadow</h3>
          <p class="product-description">A paperback copy signed by R.A. Crawford and supplied directly from the author. UK delivery is £3.49.</p>
          <div class="product-bottom"><strong>£14.99</strong><a class="btn primary" href="https://buy.stripe.com/test_8x27sL43F6lY5Saaih8ww01" target="_blank" rel="noopener noreferrer">Buy Signed</a></div>
        </div>
      </article>

      <article class="product-card edition-card" data-category="books" data-product-id="WFAS-HB-001" data-name="The War of Feather & Shadow — Hardback">
        <div class="product-image book-product edition-visual edition-hardback">
          <div class="edition-book"><img src="assets/war-of-feather-and-shadow-shop-cover.jpg" alt="The War of Feather & Shadow hardback edition" /></div>
          <span class="product-badge violet">Hardback</span>
          <span class="edition-format">Casebound Edition</span>
        </div>
        <div class="product-copy">
          <p class="product-type">Book One · Hardback</p>
          <h3>The War of Feather &amp; Shadow</h3>
          <p class="product-description">The hardback edition for readers and collectors, supplied directly by R.A. Crawford. UK delivery is £3.49.</p>
          <div class="product-bottom"><strong>£14.99</strong><a class="btn primary" href="https://buy.stripe.com/test_fZueVd2ZB39M94m0HH8ww02" target="_blank" rel="noopener noreferrer">Buy Hardback</a></div>
        </div>
      </article>

      <article class="product-card edition-card signed-edition" data-category="books" data-product-id="WFAS-SHB-001" data-name="The War of Feather & Shadow — Signed Hardback">
        <div class="product-image book-product edition-visual edition-hardback">
          <div class="edition-book"><img src="assets/war-of-feather-and-shadow-shop-cover.jpg" alt="Signed hardback edition of The War of Feather & Shadow" /></div>
          <span class="product-badge gold">Signed Hardback</span>
          <span class="edition-format">Collector Signed Edition</span>
          <span class="signed-mark">Signed by R.A. Crawford</span>
        </div>
        <div class="product-copy">
          <p class="product-type">Book One · Signed Hardback</p>
          <h3>The War of Feather &amp; Shadow</h3>
          <p class="product-description">The hardback edition signed by R.A. Crawford — the premium direct edition for collectors. UK delivery is £3.49.</p>
          <div class="product-bottom"><strong>£19.99</strong><a class="btn primary" href="https://buy.stripe.com/test_eVq28r7fRfWy2FY6218ww03" target="_blank" rel="noopener noreferrer">Buy Signed</a></div>
        </div>
      </article>`;

    directEditionsCard.insertAdjacentHTML('afterend', editionCards);
    directEditionsCard.remove();
  }

  const kindleCard = document.querySelector('[data-product-id="WFAS-KD-001"] .product-image');
  if (kindleCard) {
    kindleCard.classList.add('edition-visual', 'edition-kindle');
    kindleCard.insertAdjacentHTML('beforeend', '<span class="edition-format">Digital Edition</span>');
  }

  const editionStyles = document.createElement('style');
  editionStyles.textContent = `
    .edition-card .product-image,
    .edition-kindle { background: radial-gradient(circle at 50% 40%, #352c1f 0%, #15110d 42%, #080706 76%); }
    .edition-visual { display:grid; place-items:center; isolation:isolate; }
    .edition-visual::before { content:""; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.035),transparent 42%,rgba(200,163,90,.06)); pointer-events:none; }
    .edition-book { position:relative; height:255px; width:168px; filter:drop-shadow(0 18px 22px rgba(0,0,0,.65)); transition:transform .35s ease; }
    .edition-book img { width:100%; height:100%; object-fit:cover; padding:0; background:none; }
    .edition-card:hover .edition-book { transform:translateY(-4px); }
    .edition-paperback .edition-book { transform:perspective(700px) rotateY(-8deg) rotateZ(-1deg); }
    .edition-paperback .edition-book::after { content:""; position:absolute; top:4px; right:-6px; width:7px; height:calc(100% - 8px); background:linear-gradient(90deg,#ddd3bc,#8c816b); transform:skewY(-28deg); transform-origin:left; opacity:.9; }
    .edition-hardback .edition-book { transform:perspective(700px) rotateY(-10deg); border:5px solid #17120d; box-shadow:5px 0 0 #b49451,9px 2px 0 #2a2117; }
    .edition-hardback .edition-book::before { content:""; position:absolute; inset:-9px -8px -9px -9px; border:1px solid rgba(217,194,138,.45); pointer-events:none; }
    .edition-kindle > img { width:162px; height:245px; object-fit:cover; padding:0; border:10px solid #151515; border-radius:8px; box-shadow:0 18px 24px rgba(0,0,0,.65), inset 0 0 0 1px #3e3e3e; }
    .edition-format { position:absolute; right:14px; bottom:14px; z-index:4; padding:6px 9px; background:rgba(5,5,5,.88); border:1px solid rgba(200,163,90,.28); color:var(--gold-soft); font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; }
    .signed-mark { position:absolute; left:50%; bottom:48px; z-index:5; transform:translateX(-50%) rotate(-3deg); width:max-content; max-width:82%; padding:7px 12px; border-top:1px solid rgba(217,194,138,.6); border-bottom:1px solid rgba(217,194,138,.6); background:rgba(5,5,5,.82); color:#ead9a9; font-style:italic; font-size:.78rem; letter-spacing:.04em; box-shadow:0 8px 20px rgba(0,0,0,.4); }
    .signed-edition { border-color:rgba(200,163,90,.42); }
    @media (max-width:600px) { .edition-book{height:292px;width:192px}.edition-kindle>img{height:286px;width:190px} }
  `;
  document.head.appendChild(editionStyles);

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
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(announce.timer);
    announce.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  };

  const render = () => {
    if (!itemsEl || !totalEl || !emptyEl) return;
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
    if (!drawer || !backdrop) return;
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false; document.body.classList.add('cart-open');
    const closeButton = drawer.querySelector('[data-cart-close]');
    if (closeButton) closeButton.focus();
  };
  const closeCart = () => {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true; document.body.classList.remove('cart-open');
  };

  document.querySelectorAll('[data-add-to-cart]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('[data-product-id]');
    cart.push({ id: `${card.dataset.productId}-${Date.now()}`, sku: card.dataset.productId, name: card.dataset.name, price: Number(card.dataset.price) });
    render(); announce(`${card.dataset.name} added to the ledger`);
  }));

  if (itemsEl) {
    itemsEl.addEventListener('click', event => {
      const button = event.target.closest('[data-remove]');
      if (!button) return;
      cart = cart.filter(item => item.id !== button.dataset.remove); render();
    });
  }

  document.querySelectorAll('[data-cart-open]').forEach(button => button.addEventListener('click', openCart));
  document.querySelectorAll('[data-cart-close]').forEach(button => button.addEventListener('click', closeCart));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });
  const checkout = document.querySelector('[data-checkout]');
  if (checkout) checkout.addEventListener('click', () => { window.location.href = 'index.html#gazette'; });

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => filter.classList.remove('active'));
    button.classList.add('active');
    productCards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  }));

  render();
})();
