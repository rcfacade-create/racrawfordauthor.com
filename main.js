const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

function createFeather(){
  const feather = document.createElement('div');
  feather.className = 'feather';
  feather.textContent = '᚛';
  feather.style.left = Math.random() * 100 + 'vw';
  feather.style.animationDuration = (9 + Math.random() * 9) + 's';
  feather.style.setProperty('--drift', ((Math.random() * 220) - 110) + 'px');
  feather.style.fontSize = (16 + Math.random() * 18) + 'px';
  document.body.appendChild(feather);
  setTimeout(() => feather.remove(), 19000);
}
setInterval(createFeather, 1300);
for(let i=0;i<7;i++) setTimeout(createFeather, i*450);
