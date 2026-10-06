(() => {
  const GA_ID = "G-BEB2CGY758";
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const s=document.createElement("script");
    s.async=true;
    s.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  const fire=(name,params={})=>{ try{ gtag("event",name,params); }catch(e){} };
  const path=location.pathname;

  if (/chapter-one\.html$/.test(path)) fire("chapter_one_view",{content_name:"The War of Feather & Shadow - Chapter One"});
  if (/shop\.html$/.test(path)) fire("shop_view",{content_name:"Hemming's Provision Shop"});
  if (/aerie\/trial\.html$/.test(path)) fire("house_trial_view",{content_name:"Trial of the Houses"});

  const products={
    "dRmeVdbrd2A79cpfjf2Nq0j":{id:"WFAS-PB-DIRECT-002",name:"Book One Paperback",price:8.99},
    "eVqcN5gLx7Ur88l7QN2Nq0k":{id:"WFAS-SPB-DIRECT-002",name:"Book One Signed Paperback",price:12.99},
    "4gM8wP52P6Qn60dc732Nq0l":{id:"WFAS-HB-DIRECT-002",name:"Book One Hardback",price:13.99},
    "14A3cveDpfmT74hfjf2Nq0m":{id:"WFAS-SHB-DIRECT-002",name:"Book One Signed Hardback",price:17.99},
    "eVq3cv1QDfmT60d3Ax2Nq09":{id:"AV-DH-CROW-001",name:"House Crow Digital Pack",price:2.99},
    "5kQfZh7aXfmT3S59YV2Nq0a":{id:"AV-DH-OWL-001",name:"House Owl Digital Pack",price:2.99},
    "8x228r2UH8Yvagt9YV2Nq0b":{id:"AV-DH-RAVEN-001",name:"House Raven Digital Pack",price:2.99},
    "5kQaEXgLxa2zbkx0ol2Nq0c":{id:"AV-DH-SWAN-001",name:"House Swan Digital Pack",price:2.99},
    "00wbJ1brda2z0FT6MJ2Nq0d":{id:"AV-DH-FALCON-001",name:"House Falcon Digital Pack",price:2.99},
    "9B63cvdzla2z1JX1sp2Nq0e":{id:"AV-DH-HAWK-001",name:"House Hawk Digital Pack",price:2.99},
    "6oU28r7aX4IfgERb2Z2Nq0f":{id:"AV-DH-ALL-001",name:"Complete Houses Collection",price:9.99},
    "aFa5kDfHt0rZ60dc732Nq0g":{id:"AV-DM-001",name:"Aerie Dominion Map Pack",price:3.99},
    "28EdR97aXfmTewJdb72Nq0h":{id:"AV-DA-001",name:"Aethelmar Academy Student Pack",price:4.99}
  };

  document.addEventListener("click",e=>{
    const a=e.target.closest("a");
    if(!a) return;
    const href=a.getAttribute("href")||"";
    const m=href.match(/buy\.stripe\.com\/([^?#]+)/);
    if(m && products[m[1]]){
      const p=products[m[1]];
      fire("begin_checkout",{
        currency:"GBP",value:p.price,
        items:[{item_id:p.id,item_name:p.name,price:p.price,quantity:1}]
      });
      fire("stripe_checkout_click",{item_id:p.id,item_name:p.name,value:p.price,currency:"GBP",source_page:path});
    }
  },true);

  document.addEventListener("submit",e=>{
    if(e.target.closest(".ml-embedded,.gilded-gazette-embed")){
      fire("generate_lead",{lead_source:"Gilded Gazette",source_page:path});
    }
  },true);

  document.addEventListener("projectAvis:trialStart",()=>fire("house_trial_start",{source_page:path}));
  document.addEventListener("projectAvis:trialComplete",e=>fire("house_trial_complete",{house:e.detail?.house||"unknown",source_page:path}));
})();