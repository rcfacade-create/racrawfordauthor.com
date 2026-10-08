(() => {
"use strict";
const houseSigils = {
  Crow: "/aerie/assets/sigils/crow.png",
  Owl: "/aerie/assets/sigils/owl.png",
  Hawk: "/aerie/assets/sigils/hawk.png",
  Falcon: "/aerie/assets/sigils/falcon.png",
  Swan: "/aerie/assets/sigils/swan.png",
  Raven: "/aerie/assets/sigils/raven.png"
};

const houseRecords = {
  Crow: {
    motto: "UMBRAE OMNIA VIDENT",
    lore: "Crow walks in silence, guarding secrets and seeing what others bury."
  },
  Owl: {
    motto: "SAPIENTIA ANTE OMNIA",
    lore: "Owl preserves memory and reads the truths hidden in pattern and omission."
  },
  Hawk: {
    motto: "FERRUM ET HONOR",
    lore: "Hawk tempers strength with discipline, command and the courage to stand first."
  },
  Falcon: {
    motto: "PER CAELUM VINCIMUS",
    lore: "Falcon is the silent path of precision, pursuit and the decisive strike."
  },
  Swan: {
    motto: "LUX PER VERITATEM",
    lore: "Swan shapes power through grace, diplomacy and the word that ends a war."
  },
  Raven: {
    motto: "VERITAS IN TENEBRIS",
    lore: "Raven bears a royal legacy hidden in shadow, waiting to be remembered."
  }
};

      function escapeXml(value) {
        return String(value).replace(/[<>&'\"]/g, character => ({
          "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;"
        })[character]);
      }

      const imageCache = new Map();
      function imageToDataUrl(path) {
        if (!imageCache.has(path)) imageCache.set(path, loadImageData(path).catch(error => {imageCache.delete(path);throw error;}));
        return imageCache.get(path);
      }
      async function loadImageData(path) {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Unable to load certificate artwork.");
        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }

const certificateHouses = {
  Crow: { primary: '#173b2c', secondary: '#98998c', colours: 'Black, deep green and tarnished silver', motto: 'VERITAS IN TENEBRIS', lore: 'The Veiled Hand · Theft, infiltration and espionage', crop: [.08,.82] },
  Owl: { primary: '#60442f', secondary: '#a38b54', colours: 'Ivory, brown and tarnished brass', motto: 'SAPIENTIA ANTE OMNIA', lore: 'The Shrouded Eye · Magic, forbidden knowledge and prophecy', crop: [.10,.83] },
  Hawk: { primary: '#801f2e', secondary: '#b48a39', colours: 'Crimson and gold', motto: 'VIGILANTIA ET HONOR', lore: 'The Talon Guard · Military command and battlefield tactics', crop: [.12,.79] },
  Falcon: { primary: '#1c2b48', secondary: '#8a929b', colours: 'Steel grey and midnight blue', motto: 'CELERITAS SUPREMA VIRTUS', lore: 'The Silent Blade · Assassination', crop: [.08,.83] },
  Swan: { primary: '#80611f', secondary: '#fff8e7', colours: 'White and gold', motto: 'LUX PER VERITATEM', lore: 'The Gilded Tongue · Diplomacy and court politics', crop: [.09,.83] },
  Raven: { primary: '#452453', secondary: '#1a1520', colours: 'Black and deep violet', motto: 'IN UMBRA REGNUM', lore: 'The Ashen Throne · Rule and leadership', crop: [.11,.81] }
};
async function buildCertificateSvg(name, house, dateText) {
  if (!certificateHouses[house]) throw new Error('Choose one of the six Houses.');
  const houses = Object.keys(certificateHouses), record = certificateHouses[house];
  const [plate, ...crests] = await Promise.all([
    imageToDataUrl('/aerie/assets/certificates/engraved-background.png'),
    ...houses.map(h => imageToDataUrl('/aerie/assets/certificates/book-one/' + h.toLowerCase() + '.png'))
  ]);
  // Original, unaltered Book One image bytes. The viewport excludes the image's
  // existing heading and translation; its engraved crest and motto remain intact.
  const crest = (h, x, y, width, height, id) => {
    const [top, span] = certificateHouses[h].crop;
    return `<g transform="translate(${x} ${y}) scale(${width/1000})"><defs><clipPath id="crest-${id}"><rect width="1000" height="${span*1000}"/></clipPath></defs><g clip-path="url(#crest-${id})"><use xlink:href="#book-crest-${h}" transform="translate(0 ${-top*1000})" filter="url(#book-ink)"/></g></g>`;
  };
  const safeName = escapeXml(String(name || '________________________').trim().slice(0,80));
  const nameSize = String(name || '').length > 45 ? 25 : String(name || '').length > 30 ? 32 : 43;
  const footer = houses.map((h,i) => {
    const x = 218 + i * 220, active = h === house;
    return `<g data-house="${h}"><path d="M${x-78} 948 H${x+78}" stroke="${active ? record.primary : '#826644'}" stroke-width="${active ? 4 : 1}"/>${crest(h,x-75,785,150,174,'footer-'+i)}<text x="${x}" y="974" class="footer" text-anchor="middle" fill="${active ? record.primary : '#2c2118'}">${h.toUpperCase()}</text></g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="3508" height="2480" viewBox="0 0 1536 1086" role="img" aria-label="${house} Trial certificate with Book One crest" data-certificate-version="book-one-20261008">
  <defs><filter id="book-ink" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .055 0 0 0 0 .043 0 0 0 0 .03 -.2126 -.7152 -.0722 0 1"/></filter>
  ${houses.map((h,i)=>`<image id="book-crest-${h}" xlink:href="${crests[i]}" width="1000" height="1000" preserveAspectRatio="xMidYMid meet"/>`).join('')}
  <style>text{font-family:Garamond,Georgia,'Times New Roman',serif;fill:#251b12}.over{font-size:17px;letter-spacing:6px}.title{font-size:61px;font-weight:bold}.sub{font-size:16px;letter-spacing:4px}.body{font-size:24px}.name{font-size:${nameSize}px;font-style:italic;font-weight:bold}.house{font-size:44px;font-weight:bold;fill:${record.primary}}.motto{font-size:20px;letter-spacing:3px;fill:${record.primary}}.lore{font-size:18px;font-style:italic}.fine{font-size:18px}.footer{font-size:19px;letter-spacing:3px;font-weight:bold}</style></defs>
  <image xlink:href="${plate}" width="1536" height="1086" preserveAspectRatio="none"/>
  <text x="768" y="77" class="over" text-anchor="middle">THE AERIE DOMINION</text>
  <text x="768" y="145" class="title" text-anchor="middle">Trial of the Houses</text>
  <text x="768" y="181" class="sub" text-anchor="middle">AETHELMAR ACADEMY · OFFICIAL RECORD</text>
  <path d="M644 453 Q768 482 892 453" fill="none" stroke="${record.primary}" stroke-width="4"/><path d="M653 461 Q768 488 883 461" fill="none" stroke="${record.secondary}" stroke-width="3"/>
  ${crest(house,613,209,310,262,'selected')}
  <text x="768" y="518" class="body" text-anchor="middle">This record certifies that</text>
  <text x="768" y="569" class="name" text-anchor="middle">${safeName}</text>
  <path d="M467 586 H1069" stroke="#876539"/>
  <text x="768" y="622" class="body" text-anchor="middle">has completed the Trial and been recognised by</text>
  <text x="768" y="670" class="house" text-anchor="middle">HOUSE ${house.toUpperCase()}</text>
  <text x="768" y="705" class="motto" text-anchor="middle">${record.motto}</text>
  <text x="768" y="738" class="lore" text-anchor="middle">${escapeXml(record.lore)}</text>
  <text x="260" y="674" class="fine" text-anchor="middle">Date recorded:</text><text x="260" y="704" class="fine" text-anchor="middle">${escapeXml(dateText || '________________')}</text><path d="M145 718 H375" stroke="#876539"/>
  <text x="1276" y="674" class="fine" text-anchor="middle">Hall of Chronicles</text><text x="1276" y="704" class="fine" text-anchor="middle">Trial Record</text><path d="M1161 718 H1391" stroke="#876539"/>
  ${footer}
  </svg>`;
}

      function downloadSvg(svg, filename) {
        const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }


async function buildWallpaperCanvas(house) {
  if (!houseRecords[house]) throw new Error("Choose one of the six Houses.");
  const record = houseRecords[house];
          const img=new Image(); img.crossOrigin="anonymous";
          img.src=houseSigils[house];
          await img.decode();
          const canvas=document.createElement("canvas");
          canvas.width=1170; canvas.height=2532;
          const ctx=canvas.getContext("2d");
          const g=ctx.createRadialGradient(585,850,80,585,1266,1350);
          g.addColorStop(0,"#27222b"); g.addColorStop(.62,"#111014"); g.addColorStop(1,"#050506");
          ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height);
          ctx.strokeStyle="#9a6b28"; ctx.lineWidth=3; ctx.strokeRect(55,55,1060,2422);
          ctx.strokeStyle="rgba(200,163,90,.35)"; ctx.lineWidth=1; ctx.strokeRect(76,76,1018,2380);
          const max=620,scale=Math.min(max/img.width,max/img.height);
          const w=img.width*scale,h=img.height*scale;
          ctx.drawImage(img,(1170-w)/2,410,w,h);
          ctx.textAlign="center"; ctx.fillStyle="#c8a35a";
          ctx.font="28px Georgia"; ctx.fillText("THE AERIE DOMINION",585,230);
          ctx.fillStyle="#f4ecdd"; ctx.font="bold 72px Georgia"; ctx.fillText("HOUSE "+house.toUpperCase(),585,1190);
          ctx.fillStyle="#c8a35a"; ctx.font="italic 34px Georgia"; ctx.fillText(record.motto,585,1260);
          ctx.fillStyle="#e7dac2"; ctx.font="30px Georgia";
          const words=record.lore.split(" "); let line="",lines=[],y=1415;
          words.forEach(word=>{const test=line+word+" "; if(ctx.measureText(test).width>850){lines.push(line.trim());line=word+" ";}else line=test;}); if(line)lines.push(line.trim());
          lines.forEach(l=>{ctx.fillText(l,585,y);y+=48;});
          ctx.fillStyle="#8f806b"; ctx.font="24px Georgia"; ctx.fillText("THE RAVEN'S HEIR · R.A. CRAWFORD",585,2265);
          ctx.fillText("racrawfordauthor.com",585,2320);
  return canvas;
}
window.ProjectAvisRewards = { records: houseRecords, sigils: houseSigils, certificateHouses, buildCertificateSvg, downloadSvg, buildWallpaperCanvas };
})();
