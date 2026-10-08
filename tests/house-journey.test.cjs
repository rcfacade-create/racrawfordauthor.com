const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function environment(url, entries = {}, links = []) {
  const storage = new Map(Object.entries(entries));
  const listeners = new Map();
  const context = {
    URL, URLSearchParams, console, Map, Intl, Blob, TextEncoder, setTimeout: () => 0,
    location: new URL(url),
    sessionStorage: {getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value)},
    document: {
      readyState:'complete',
      querySelectorAll:()=>links,
      querySelector:()=>null,
      addEventListener:(name,fn)=>listeners.set(name,fn),
      createElement:()=>({}),head:{appendChild:()=>{}}
    }
  };
  context.window=context; vm.createContext(context);
  const run=file=>vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
  return {context,run,listeners,storage};
}
function link(href) {return {value:href,getAttribute(){return this.value;},setAttribute(_,value){this.value=value;}};}
test('shared sender House never awards a result to the recipient',()=>{
  const env=environment('https://racrawfordauthor.com/aerie/trial.html?source=house_share&ref_house=Swan');
  env.run('house-journey.js');
  assert.equal(env.context.ProjectAvisJourney.getHouse(),'');
  assert.equal(env.context.ProjectAvisJourney.getReferralHouse(),'Swan');
  assert.equal(env.context.ProjectAvisJourney.getSource(),'house_share');
});
test('each House survives navigation and reaches checkout attribution',()=>{
  for(const house of ['Crow','Owl','Hawk','Falcon','Swan','Raven']) {
    const reward=link('/downloads/free-house-starter.html');
    const checkout=link('https://buy.stripe.com/dRmeVdbrd2A79cpfjf2Nq0j');
    const env=environment('https://racrawfordauthor.com/shop.html',{avis_trial_house:house,avis_journey_source:'house_trial'},[reward,checkout]);
    env.run('house-journey.js');
    assert.equal(new URL(reward.value,'https://racrawfordauthor.com').searchParams.get('house'),house);
    assert.equal(new URL(checkout.value).searchParams.get('client_reference_id'),`avis_${house}_house_trial`);
    const share=new URL(env.context.ProjectAvisJourney.shareUrl(house));
    assert.equal(share.searchParams.get('ref_house'),house);
    assert.equal(share.searchParams.has('house'),false);
  }
});
test('unrecognised House and source cannot enter links',()=>{
  const next=link('/shop.html');
  const env=environment('https://racrawfordauthor.com/chapter-one.html?house=Eagle&source=unexpected',{},[next]);
  env.run('house-journey.js');assert.equal(next.value,'/shop.html');
});
test('fabricated checkout return never reports purchase or exposes session in GA config',()=>{
  const env=environment('https://racrawfordauthor.com/downloads/free-house-starter.html?session_id=not_a_paid_session&purchase=paperback');
  env.run('house-journey.js');env.run('analytics.js');
  const calls=env.context.dataLayer.map(args=>Array.from(args));
  assert.ok(calls.some(args=>args[0]==='event'&&args[1]==='checkout_return'));
  assert.ok(!calls.some(args=>args[0]==='event'&&args[1]==='purchase'));
  assert.ok(!calls.find(args=>args[0]==='config')[2].page_location.includes('session_id'));
});
test('all six certificates embed artwork and escape personalised names',async()=>{
  const env=environment('https://racrawfordauthor.com/aerie/trial.html');
  env.context.fetch=async url=>({ok:true,blob:async()=>fs.readFileSync(path.join(root,url.replace(/^\//,'')))});
  env.context.FileReader=class{readAsDataURL(bytes){this.result='data:image/png;base64,'+bytes.toString('base64');this.onload();}};
  env.run('house-rewards.js');
  for(const house of ['Crow','Owl','Hawk','Falcon','Swan','Raven']){
    const svg=await env.context.ProjectAvisRewards.buildCertificateSvg('A & <B>',house,'8 October 2026');
    assert.ok(svg.includes('A &amp; &lt;B&gt;'));
    assert.ok(svg.includes(`HOUSE ${house.toUpperCase()}`));
    assert.equal((svg.match(/href="data:image\/png;base64,/g)||[]).length,7);
    assert.ok(svg.includes('width="3508" height="2480"'));
    assert.equal((svg.match(/data-house="/g)||[]).length,6);
    const canonical = fs.readFileSync(path.join(root,'aerie/assets/certificates/book-one',house.toLowerCase()+'.webp')).toString('base64');
    assert.ok(svg.includes(canonical));
    assert.ok(svg.includes(env.context.ProjectAvisRewards.certificateHouses[house].motto));
    assert.ok(svg.includes(env.context.ProjectAvisRewards.certificateHouses[house].primary));
  }
});
test('book filter hides unrelated products and supports All wares',()=>{
  const cards=['books','digital','prints'].map(category=>({dataset:{category},hidden:false}));
  const handlers=[];
  const buttons=['all','books'].map(filter=>({dataset:{filter},classList:{toggle(){}},setAttribute(){},addEventListener(_,fn){handlers.push(fn);}}));
  const env=environment('https://racrawfordauthor.com/shop.html#direct-editions');
  env.context.document.querySelectorAll=selector=>selector==='[data-product-id]'?cards:buttons;
  env.run('shop.js');assert.deepEqual(cards.map(c=>c.hidden),[false,true,true]);
  handlers[0]();assert.deepEqual(cards.map(c=>c.hidden),[false,false,false]);
});

test('certificate PDF has valid byte offsets and an A4 landscape page',async()=>{
  const env=environment('https://racrawfordauthor.com/aerie/certificate.html');env.run('house-rewards.js');
  const jpg=fs.readFileSync(path.join(root,'aerie/assets/certificates/engraved-background.jpg'));
  const blob=env.context.ProjectAvisRewards.certificatePdf(new Uint8Array(jpg),1536,1024);
  assert.equal(blob.type,'application/pdf');
  const pdf=Buffer.from(await blob.arrayBuffer());
  assert.equal(pdf.subarray(0,8).toString(),'%PDF-1.4');
  const text=pdf.toString('latin1');
  assert.ok(text.includes('/MediaBox [0 0 841.89 595.28]'));
  const xref=Number(text.match(/startxref\n(\d+)/)[1]);
  assert.equal(pdf.subarray(xref,xref+4).toString(),'xref');
  const offsets=text.slice(xref).split('\n').slice(3,8).map(line=>Number(line.slice(0,10)));
  offsets.forEach((offset,i)=>assert.equal(pdf.subarray(offset,offset+7).toString(),`${i+1} 0 obj`));
});
test('phone save link remains available after automatic certificate download',async()=>{
  const env=environment('https://racrawfordauthor.com/aerie/certificate.html');
  const revoked=[],links=[]; let urlCounter=0;
  env.context.URL={createObjectURL:()=>`blob:certificate-${urlCounter++}`,revokeObjectURL:url=>revoked.push(url)};
  env.context.Image=class{async decode(){}};
  env.context.Uint8Array=Uint8Array;
  env.context.document.createTextNode=text=>text;
  env.context.document.createElement=tag=>tag==='canvas'?{width:0,height:0,getContext:()=>({fillRect(){},drawImage(){}}),toBlob:fn=>fn(new Blob([new Uint8Array([255,216,255,217])],{type:'image/jpeg'}))}:{click(){links.push(this);},remove(){}};
  env.run('house-rewards.js');
  const note={dataset:{},replaceChildren(...children){this.children=children;}};
  await env.context.ProjectAvisRewards.downloadCertificatePdf('<svg/>','certificate.pdf',note);
  assert.equal(links[0].download,'certificate.pdf');
  assert.equal(note.children[1],links[0]);
  assert.equal(note.children[1].textContent,'Save PDF');
  assert.ok(!revoked.includes(note.dataset.downloadUrl));
});
