const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));

const layer = document.createElement('div');
layer.className = 'feather-layer';
document.body.appendChild(layer);
const featherSvg = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M54 6C35 8 18 22 9 54c15-7 31-19 45-48Z" fill="rgba(238,231,216,.88)"/><path d="M54 6C40 24 26 39 9 54" stroke="rgba(72,61,48,.85)" stroke-width="2" fill="none"/><path d="M39 21c-6 1-12 3-18 7M32 30c-5 1-10 3-15 6M25 39c-4 1-8 3-12 5" stroke="rgba(72,61,48,.55)" stroke-width="1.4" fill="none"/></svg>`;
function spawnFeather(){
  const f = document.createElement('div');
  f.className = 'feather';
  f.innerHTML = featherSvg;
  const x = Math.random()*100;
  const drift = (Math.random()*220-110)+'px';
  const rot = (Math.random()*520-260)+'deg';
  const dur = 9 + Math.random()*8;
  const scale = .55 + Math.random()*1.05;
  f.style.setProperty('--x', x+'vw');
  f.style.setProperty('--drift', drift);
  f.style.setProperty('--rot', rot);
  f.style.animationDuration = dur+'s';
  f.style.transform = `scale(${scale})`;
  f.style.opacity = String(.28 + Math.random()*.55);
  layer.appendChild(f);
  setTimeout(()=>f.remove(), dur*1000+500);
}
for(let i=0;i<10;i++) setTimeout(spawnFeather, i*350);
setInterval(spawnFeather, 1400);
