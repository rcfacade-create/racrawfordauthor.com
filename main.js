
const year=document.querySelector('#year'); if(year) year.textContent=new Date().getFullYear();
function feather(){ const f=document.createElement('div'); f.className='feather'; f.textContent='🪶'; f.style.left=Math.random()*100+'vw'; f.style.animationDuration=8+Math.random()*8+'s'; f.style.fontSize=12+Math.random()*18+'px'; document.body.appendChild(f); setTimeout(()=>f.remove(),17000)}
setInterval(feather,1400);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href'); if(id.length>1){e.preventDefault(); document.querySelector(id)?.scrollIntoView({behavior:'smooth'})}}));
