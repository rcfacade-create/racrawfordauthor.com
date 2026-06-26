const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) navToggle.addEventListener('click', () => nav.classList.toggle('open'));

const layer = document.getElementById('feather-layer');
const featherGlyphs = ['🪶','🪶','🪶'];
function makeFeather(){
  if(!layer) return;
  const f = document.createElement('span');
  f.className = 'feather';
  f.textContent = featherGlyphs[Math.floor(Math.random()*featherGlyphs.length)];
  f.style.left = Math.random()*100 + 'vw';
  f.style.setProperty('--drift', (Math.random()*220-110) + 'px');
  f.style.setProperty('--spin', (Math.random()*720-360) + 'deg');
  f.style.animationDuration = (10 + Math.random()*9) + 's';
  f.style.opacity = (0.35 + Math.random()*0.55).toString();
  f.style.fontSize = (18 + Math.random()*24) + 'px';
  layer.appendChild(f);
  setTimeout(()=>f.remove(), 20000);
}
setInterval(makeFeather, 900);
for(let i=0;i<8;i++) setTimeout(makeFeather, i*350);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
