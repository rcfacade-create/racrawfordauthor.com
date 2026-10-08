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
    URL, URLSearchParams, console, Map, Intl, Blob, setTimeout: () => 0,
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
