const layers = document.querySelectorAll('.feathers');
const menuButtons = document.querySelectorAll('.menu-button');
const yearEl = document.getElementById('year');

if (!document.querySelector('link[href*="site-polish.css"]')) {
  const polish = document.createElement('link');
  polish.rel = 'stylesheet';
  polish.href = 'site-polish.css?v=20260918a';
  document.head.appendChild(polish);
}

if (!document.querySelector('link[rel="canonical"]') && location.hostname) {
  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = `${location.origin}${location.pathname}`;
  document.head.appendChild(canonical);
}

const createFeathers = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  layers.forEach(layer => {
    layer.innerHTML = '';
    const count = window.innerWidth < 700 ? 10 : 26;
    for (let i = 0; i < count; i += 1) {
      const feather = document.createElement('span');
      feather.textContent = '🪶';
      feather.className = 'feather';
      feather.style.left = `${Math.random() * 100}vw`;
      feather.style.animationDuration = `${12 + Math.random() * 14}s`;
      feather.style.animationDelay = `${Math.random() * -20}s`;
      feather.style.fontSize = `${18 + Math.random() * 28}px`;
      feather.style.opacity = `${0.2 + Math.random() * 0.6}`;
      feather.style.setProperty('--drift', `${Math.random() * 240 - 120}px`);
      layer.appendChild(feather);
    }
  });
};

const closeMenu = (button, nav) => {
  if (!nav) return;
  nav.classList.remove('open');
  button.setAttribute('aria-expanded', 'false');
};

menuButtons.forEach(button => {
  const nav = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => {
    if (!nav) return;
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  if (nav) nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu(button, nav)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(button, nav);
  });
});

const conversionName = href => {
  if (!href) return null;
  if (href.includes('aerie/trial')) return 'trial_click';
  if (href.includes('shop.html')) return 'book_shop_click';
  if (href.includes('preorder.html')) return 'book_two_reservation_click';
  if (href.includes('#gazette')) return 'gazette_click';
  if (href.includes('amazon.co.uk')) return 'amazon_click';
  if (href.includes('blackfeather')) return 'blackfeather_click';
  return null;
};

const recordConversion = (eventName, href, label) => {
  if (!eventName) return;
  const payload = {
    event: eventName,
    href,
    label: label || '',
    page: location.pathname,
    timestamp: new Date().toISOString()
  };

  try {
    const key = 'ra_conversion_clicks';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(payload);
    localStorage.setItem(key, JSON.stringify(existing.slice(-100)));
  } catch (_) {}

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      link_url: href,
      link_text: label || '',
      page_path: location.pathname
    });
  }

  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: { href, label: label || '', page: location.pathname } });
  }
};

document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link) return;
  const href = link.href || link.getAttribute('href') || '';
  const eventName = conversionName(href);
  if (eventName) recordConversion(eventName, href, link.textContent.trim());
});

const footer = document.querySelector('.site-footer');
if (footer) {
  footer.innerHTML = `
    <div class="footer-inner">
      <p class="footer-tagline">The Raven’s Heir Trilogy · R.A. Crawford</p>
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="books.html">Books</a>
        <a href="shop.html">Shop</a>
        <a href="policies.html">Delivery &amp; Returns</a>
        <a href="press.html">Press &amp; Media</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="https://www.instagram.com/racrawfordauthor/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </nav>
      <p class="footer-meta">© <span data-footer-year></span> R.A. Crawford. All rights reserved.</p>
    </div>`;
  const footerYear = footer.querySelector('[data-footer-year]');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
}

if (yearEl) yearEl.textContent = new Date().getFullYear();

createFeathers();
