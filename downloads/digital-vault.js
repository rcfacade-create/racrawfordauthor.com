(() => {
  const houses={
    Crow:{motto:"UMBRAE OMNIA VIDENT",lore:"Crow walks in silence, guarding secrets and seeing what others bury."},
    Owl:{motto:"SAPIENTIA ANTE OMNIA",lore:"Owl preserves memory and reads the truths hidden in pattern and omission."},
    Raven:{motto:"VERITAS IN TENEBRIS",lore:"Raven bears a royal legacy hidden in shadow, waiting to be remembered."},
    Swan:{motto:"LUX PER VERITATEM",lore:"Swan shapes power through grace, diplomacy and the word that ends a war."},
    Falcon:{motto:"PER CAELUM VINCIMUS",lore:"Falcon is the silent path of precision, pursuit and the decisive strike."},
    Hawk:{motto:"FERRUM ET HONOR",lore:"Hawk tempers strength with discipline, command and the courage to stand first."}
  };
  const dl=(href,name)=>{const a=document.createElement("a");a.href=href;a.download=name;document.body.appendChild(a);a.click();a.remove()};
  const img=src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src});
  const blobDownload=(canvas,name)=>canvas.toBlob(b=>{const u=URL.createObjectURL(b);dl(u,name);setTimeout(()=>URL.revokeObjectURL(u),1000)},"image/png");

  async function wallpaper(house,phone=false){
    const source=await img("../aerie/assets/sigils/"+house.toLowerCase()+".png");
    const w=phone?1440:2560,h=phone?2560:1440,c=document.createElement("canvas");c.width=w;c.height=h;
    const x=c.getContext("2d"),g=x.createRadialGradient(w/2,h*.36,20,w/2,h*.45,Math.max(w,h)*.75);
    g.addColorStop(0,"#33253a");g.addColorStop(.5,"#15110d");g.addColorStop(1,"#070606");x.fillStyle=g;x.fillRect(0,0,w,h);
    const maxW=phone?w*.76:w*.34,maxH=h*.58,scale=Math.min(maxW/source.width,maxH/source.height);
    const iw=source.width*scale,ih=source.height*scale;x.globalAlpha=.98;x.drawImage(source,(w-iw)/2,h*.12,iw,ih);x.globalAlpha=1;
    x.textAlign="center";x.fillStyle="#ead9a9";x.font="700 "+Math.round(w*(phone?.06:.04))+"px Georgia";x.fillText("HOUSE "+house.toUpperCase(),w/2,h*.78);
    x.fillStyle="#c8a35a";x.font=Math.round(w*(phone?.027:.018))+"px Georgia";x.fillText(houses[house].motto,w/2,h*.835);
    x.fillStyle="#d9d0c3";x.font=Math.round(w*(phone?.018:.012))+"px Georgia";x.fillText("THE RAVEN'S HEIR · PROJECT AVIS",w/2,h*.94);
    blobDownload(c,"Project_Avis_House_"+house+"_"+(phone?"Phone":"Desktop")+"_Wallpaper.png");
  }
  async function certificate(house){
    const source=await img("../aerie/assets/sigils/"+house.toLowerCase()+".png"),w=1754,h=1240,c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");
    const g=x.createRadialGradient(w/2,h*.4,30,w/2,h*.45,w*.72);g.addColorStop(0,"#fffaf0");g.addColorStop(.72,"#ead9b9");g.addColorStop(1,"#c5a671");x.fillStyle=g;x.fillRect(0,0,w,h);
    x.strokeStyle="#21150b";x.lineWidth=6;x.strokeRect(24,24,w-48,h-48);x.strokeStyle="#9a6b28";x.lineWidth=3;x.strokeRect(42,42,w-84,h-84);
    x.textAlign="center";x.fillStyle="#5b3b16";x.font="24px Georgia";x.fillText("THE AERIE DOMINION",w/2,100);
    x.fillStyle="#20160d";x.font="700 74px Georgia";x.fillText("Trial of the Houses",w/2,185);
    x.fillStyle="#5b3b16";x.font="24px Georgia";x.fillText("AETHELMAR ACADEMY · OFFICIAL RECORD",w/2,235);
    const sc=Math.min(300/source.width,260/source.height);x.drawImage(source,(w-source.width*sc)/2,275,source.width*sc,source.height*sc);
    x.fillStyle="#43301b";x.font="30px Georgia";x.fillText("This record certifies that",w/2,620);x.strokeStyle="#6a471d";x.lineWidth=2;x.beginPath();x.moveTo(380,700);x.lineTo(w-380,700);x.stroke();
    x.fillText("has completed the Trial and been recognised by",w/2,770);x.fillStyle="#5d3511";x.font="700 48px Georgia";x.fillText("HOUSE "+house.toUpperCase(),w/2,850);
    x.fillStyle="#6a471d";x.font="italic 28px Georgia";x.fillText(houses[house].motto,w/2,900);x.fillStyle="#43301b";x.font="23px Georgia";x.fillText(houses[house].lore,w/2,950);
    x.font="20px Georgia";x.textAlign="left";x.fillText("Date recorded: ____________________",120,1080);x.textAlign="right";x.fillText("Hall of Chronicles · Record Verified",w-120,1080);
    blobDownload(c,"Project_Avis_House_"+house+"_Trial_Certificate.png");
  }
  async function lore(house){
    const source=await img("../aerie/assets/sigils/"+house.toLowerCase()+".png"),w=1240,h=1754,c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");
    x.fillStyle="#eadfc7";x.fillRect(0,0,w,h);x.strokeStyle="#3c2a18";x.lineWidth=5;x.strokeRect(30,30,w-60,h-60);x.strokeStyle="#9a6b28";x.lineWidth=2;x.strokeRect(50,50,w-100,h-100);
    x.textAlign="center";x.fillStyle="#20160d";x.font="700 70px Georgia";x.fillText("HOUSE "+house.toUpperCase(),w/2,150);x.fillStyle="#6a471d";x.font="28px Georgia";x.fillText(houses[house].motto,w/2,215);
    const sc=Math.min(650/source.width,720/source.height);x.drawImage(source,(w-source.width*sc)/2,300,source.width*sc,source.height*sc);
    x.fillStyle="#3f2d1b";x.font="30px Georgia";const words=houses[house].lore.split(" ");let line="",lines=[];for(const word of words){const t=line+word+" ";if(x.measureText(t).width>900){lines.push(line);line=word+" "}else line=t}lines.push(line);lines.forEach((l,i)=>x.fillText(l.trim(),w/2,1160+i*48));
    x.fillStyle="#6b5136";x.font="22px Georgia";x.fillText("AETHELMAR ACADEMY · HALL OF CHRONICLES",w/2,1580);
    blobDownload(c,"Project_Avis_House_"+house+"_Lore_Sheet.png");
  }
  async function crop(sourcePath,phone,name){
    const source=await img(sourcePath),w=phone?1440:2560,h=phone?2560:1440,c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");
    const scale=Math.max(w/source.width,h/source.height),sw=w/scale,sh=h/scale,sx=(source.width-sw)/2,sy=(source.height-sh)/2;x.drawImage(source,sx,sy,sw,sh,0,0,w,h);blobDownload(c,name);
  }
  async function academyDoc(type){
    const w=1240,h=1754,c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.fillStyle="#eee2c8";x.fillRect(0,0,w,h);x.strokeStyle="#3c2a18";x.lineWidth=5;x.strokeRect(30,30,w-60,h-60);x.strokeStyle="#9a6b28";x.lineWidth=2;x.strokeRect(50,50,w-100,h-100);x.textAlign="center";x.fillStyle="#20160d";x.font="700 58px Georgia";x.fillText("AETHELMAR ACADEMY",w/2,125);
    if(type==="letter"){x.font="28px Georgia";x.fillStyle="#6a471d";x.fillText("OFFICE OF INTAKE & FIRST OATHS",w/2,185);x.fillStyle="#3f2d1b";x.font="27px Georgia";["To the prospective student,","Your name has been entered into the Academy record.","You are summoned to present yourself at the Iron Gates of Aethelmar,","where the Trial of the Houses will determine the path placed before you.","Bring no title you cannot defend, no certainty you cannot question,","and no oath you are unwilling to keep.","Upon arrival, report to the Great Courtyard and await the Hall of Chronicles.","By order of the Academy Record Office."].forEach((t,i)=>x.fillText(t,w/2,360+i*125));x.font="700 30px Georgia";x.fillStyle="#6a471d";x.fillText("THE HALL REMEMBERS",w/2,1500)}
    if(type==="timetable"){x.font="28px Georgia";x.fillStyle="#6a471d";x.fillText("FIRST-TERM STUDENT TIMETABLE",w/2,185);const rows=[["First Bell","House Assembly / Notices"],["Second Bell","Weapons & Movement"],["Third Bell","Dominion History"],["Fourth Bell","Arcane Principles"],["Midday","Great Hall"],["Fifth Bell","House Discipline"],["Sixth Bell","Strategy & Fieldcraft"],["Seventh Bell","Archive / Independent Study"]];x.textAlign="left";rows.forEach((r,i)=>{const y=330+i*150;x.strokeStyle="#856332";x.strokeRect(130,y,980,110);x.fillStyle="#3f2d1b";x.font="700 24px Georgia";x.fillText(r[0],170,y+68);x.font="24px Georgia";x.fillText(r[1],500,y+68)})}
    if(type==="record"){x.font="28px Georgia";x.fillStyle="#6a471d";x.fillText("STUDENT INTAKE RECORD",w/2,185);x.textAlign="left";["NAME","HOUSE","INTAKE YEAR","TRIAL STATUS","RECORD NUMBER"].forEach((t,i)=>{const y=390+i*190;x.font="700 27px Georgia";x.fillStyle="#6a471d";x.fillText(t,160,y);x.strokeStyle="#574633";x.beginPath();x.moveTo(430,y+8);x.lineTo(1060,y+8);x.stroke()});x.textAlign="center";x.font="22px Georgia";x.fillStyle="#6b5136";x.fillText("HALL OF CHRONICLES · RECORD OFFICE",w/2,1500)}
    blobDownload(c,"Aethelmar_"+type+".png");
  }
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-download]");if(!b)return;
    const t=b.dataset.download,h=b.dataset.house;
    if(t==="desktop")wallpaper(h,false); if(t==="phone")wallpaper(h,true); if(t==="certificate")certificate(h); if(t==="lore")lore(h);
    if(t==="map-original")dl("../assets/map.jpg","Aerie_Dominion_Map.jpg");
    if(t==="map-desktop")crop("../assets/map.jpg",false,"Aerie_Dominion_Desktop_2560x1440.png");
    if(t==="map-phone")crop("../assets/map.jpg",true,"Aerie_Dominion_Phone_1440x2560.png");
    if(t==="academy-original")dl("../assets/world-brand-art.png","Aethelmar_Academy_Artwork.png");
    if(t==="academy-desktop")crop("../assets/world-brand-art.png",false,"Aethelmar_Academy_Desktop_2560x1440.png");
    if(t==="academy-phone")crop("../assets/world-brand-art.png",true,"Aethelmar_Academy_Phone_1440x2560.png");
    if(t==="academy-letter")academyDoc("letter"); if(t==="academy-timetable")academyDoc("timetable"); if(t==="academy-record")academyDoc("record");
  });
})();