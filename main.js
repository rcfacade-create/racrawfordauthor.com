const layers = document.querySelectorAll('.feathers');
const menuButtons = document.querySelectorAll('.menu-button');
const yearEl = document.getElementById('year');

const createFeathers = () => {
  layers.forEach(layer => {
    layer.innerHTML = '';
    const count = 26;
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

menuButtons.forEach(button => {
  const nav = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => {
    if (!nav) return;
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

createFeathers();
