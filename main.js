const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

function createFeather(){
  const feather = document.createElement('div');
  feather.className = 'feather' + (Math.random() > .55 ? ' alt' : '');
  feather.textContent = Math.random() > .5 ? '🪶' : '﹆';
  feather.style.left = Math.random() * 100 + 'vw';
  feather.style.fontSize = (14 + Math.random() * 20) + 'px';
  feather.style.animationDuration = (9 + Math.random() * 10) + 's';
  feather.style.setProperty('--drift', ((Math.random() * 260) - 130) + 'px');
  feather.style.setProperty('--spin', (180 + Math.random() * 520) + 'deg');
  document.body.appendChild(feather);
  setTimeout(() => feather.remove(), 21000);
}
setInterval(createFeather, 950);
for(let i=0;i<6;i++) setTimeout(createFeather, i*450);

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('in');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
