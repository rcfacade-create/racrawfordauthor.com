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

      async function buildCertificateSvg(name, house, dateText) {
        const safeName = escapeXml(name || "____________________________");
        const safeHouse = escapeXml(house || "________________");
        const safeDate = escapeXml(dateText || "________________");
        const rec = houseRecords[house] || { motto:"ONE HOUSE · ONE MARK · ONE PATH", lore:"The Hall of Chronicles records every path." };
        const safeMotto = escapeXml(rec.motto);
        const safeLore = escapeXml(rec.lore);
        const houseNames=["Crow","Owl","Hawk","Falcon","Swan","Raven"];
        const sigils=await Promise.all(houseNames.map(h=>imageToDataUrl(houseSigils[h])));
        const selected=sigils[houseNames.indexOf(house)] || "";
        const accents={Crow:"#1c2638",Owl:"#315d7c",Hawk:"#9a6422",Falcon:"#356f9f",Swan:"#5b8dab",Raven:"#1b2437"};
        const accent=accents[house]||"#356f9f";
        const nameSize=name.length>42?23:name.length>30?28:34;

        const sealRow=sigils.map((src,i)=>{
          const x=110+i*180, active=houseNames[i]===house;
          return `<g opacity="${active?1:.82}">
            <circle cx="${x}" cy="707" r="${active?42:36}" fill="#ead7b5" stroke="${active?accent:"#5a4329"}" stroke-width="${active?3:1.5}"/>
            <circle cx="${x}" cy="707" r="${active?35:30}" fill="${active?accent:"#d9c5a2"}" opacity="${active?.95:.38}"/>
            <image href="${src}" x="${x-(active?30:26)}" y="${707-(active?30:26)}" width="${active?60:52}" height="${active?60:52}" preserveAspectRatio="xMidYMid meet"/>
            <text x="${x}" y="765" class="seal" text-anchor="middle">${houseNames[i].toUpperCase()}</text>
          </g>`;
        }).join("");

        const leftScenes={
          Crow:`<g transform="translate(45 176)"><path d="M0 264 V75 h18 V42 h17 V75 h21 V19 h22 v56 h22 V53 h19 v22 h24 V31 h20 v44 h25 v-9 h20 v198 M-7 264 Q21 232 51 264 Q80 226 112 264 Q143 232 176 264 Q196 243 220 264"/><path d="M10 264 V192 H39 V264 M64 264 V167 H100 V264 M126 264 V188 H157 V264 M177 264 V176 H208 V264"/></g>`,
          Owl:`<g transform="translate(48 164)"><path d="M0 275 V98 h22 V67 h18 v31 h23 V25 h23 v73 h22 V56 h20 v42 h24 V72 h19 v26 h23 V44 h22 v231"/><path d="M-8 275 Q22 242 53 275 Q82 239 114 275 Q146 243 177 275 Q200 251 226 275"/></g>`,
          Hawk:`<g transform="translate(48 165)"><path d="M0 275 V119 h25 V77 h20 v42 h22 V36 h22 v83 h26 V61 h19 v58 h28 V89 h20 v30 h31 V54 h20 v221"/><path d="M-7 275 Q29 236 65 275 Q102 233 139 275 Q175 239 213 275"/></g>`,
          Falcon:`<g transform="translate(46 172)"><path d="M0 266 V111 h20 V63 h20 v48 h24 V28 h23 v83 h27 V52 h20 v59 h27 V75 h19 v36 h28 V42 h22 v224"/><path d="M-8 266 Q25 232 58 266 Q92 226 127 266 Q161 231 195 266 Q211 247 229 266"/></g>`,
          Swan:`<g transform="translate(40 197)"><path d="M0 233 C40 196 75 188 111 207 C145 224 174 214 204 185 C221 170 238 162 257 164"/><path d="M5 233 V125 M43 220 V101 M80 211 V143 M116 213 V84 M153 208 V134 M189 194 V110 M225 181 V133"/><path d="M-8 246 C61 218 125 225 189 247 C216 256 239 254 267 244"/></g>`,
          Raven:`<g transform="translate(45 171)"><path d="M0 270 V113 h20 V57 h19 v56 h23 V22 h22 v91 h23 V51 h20 v62 h27 V79 h18 v34 h28 V39 h22 v231"/><path d="M-8 270 Q23 239 54 270 Q84 233 115 270 Q147 237 178 270 Q201 248 224 270"/></g>`
        };
        const rightScenes={
          Crow:`<path d="M755 436 L817 333 L850 365 L917 250 L978 352 L1025 296 L1092 435 M817 333 l20 38 l13 4 l17 22 M917 250 l23 57 l16 12 l21 34 M1025 296 l17 37 l18 13"/>`,
          Owl:`<path d="M758 433 L819 327 L850 358 L919 242 L982 350 L1030 290 L1096 432 M819 327 l18 36 l16 7 l18 23 M919 242 l28 62 l18 11 l20 32 M1030 290 l19 39 l17 14"/>`,
          Hawk:`<path d="M756 434 L823 318 L854 360 L926 236 L990 350 L1034 291 L1097 433 M823 318 l20 41 l17 7 l18 21 M926 236 l29 63 l17 12 l22 34 M1034 291 l21 42 l16 11"/>`,
          Falcon:`<path d="M757 434 L821 323 L856 357 L927 244 L991 351 L1034 292 L1098 433 M821 323 l21 39 l14 5 l19 22 M927 244 l28 59 l17 11 l24 36 M1034 292 l20 41 l17 13"/>`,
          Swan:`<path d="M751 438 C809 402 860 392 914 408 C960 421 1005 411 1051 383 C1069 372 1087 365 1105 365"/><path d="M781 424 V303 M820 411 V282 M861 405 V322 M904 406 V268 M947 407 V316 M989 397 V292 M1031 383 V319 M1070 376 V286"/>`,
          Raven:`<path d="M755 435 L820 326 L851 359 L918 246 L984 350 L1030 292 L1096 433 M820 326 l19 38 l15 7 l19 23 M918 246 l27 60 l17 12 l24 34 M1030 292 l20 41 l17 12"/>`
        };

        return `<svg xmlns="http://www.w3.org/2000/svg" width="3508" height="2480" viewBox="0 0 1123 794">
          <defs>
            <radialGradient id="paper" cx="50%" cy="43%" r="75%"><stop offset="0%" stop-color="#fff7e8"/><stop offset="64%" stop-color="#efdbb8"/><stop offset="100%" stop-color="#c9a46d"/></radialGradient>
            <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".62" numOctaves="3" seed="27"/><feComponentTransfer><feFuncA type="table" tableValues="0 .055"/></feComponentTransfer></filter>
            <style>
              .over{font:12px Georgia,serif;letter-spacing:4px;fill:#4a341d}.title{font:bold 46px Georgia,serif;fill:#17110c}.sub{font:11px Georgia,serif;letter-spacing:3px;fill:#4c371f}
              .body{font:17px Georgia,serif;fill:#332419}.name{font:bold italic ${nameSize}px Georgia,serif;fill:#15100c}.house{font:bold 31px Georgia,serif;fill:${accent}}.motto{font:italic 14px Georgia,serif;letter-spacing:2px;fill:#65471f}.lore{font:italic 11px Georgia,serif;fill:#4b3825}.fine{font:10px Georgia,serif;fill:#49351f}.seal{font:bold 9px Georgia,serif;letter-spacing:1.2px;fill:#342417}
            </style>
          </defs>
          <rect width="1123" height="794" fill="url(#paper)"/><rect width="1123" height="794" filter="url(#grain)" opacity=".23"/>
          <rect x="9" y="9" width="1105" height="776" fill="none" stroke="#1e160f" stroke-width="2.4"/><rect x="17" y="17" width="1089" height="760" fill="none" stroke="#b7863e" stroke-width="2"/><rect x="26" y="26" width="1071" height="742" fill="none" stroke="#39291b"/>
          <g fill="none" stroke="#1b2738" stroke-width="12" stroke-linecap="round" opacity=".94">
            <path d="M25 91 C78 58 101 34 149 27 C122 50 104 74 96 102 C127 76 163 65 201 65 C165 86 137 108 118 138 C151 121 183 119 214 126"/>
            <path d="M1098 91 C1045 58 1022 34 974 27 C1001 50 1019 74 1027 102 C996 76 960 65 922 65 C958 86 986 108 1005 138 C972 121 940 119 909 126"/>
          </g>
          <g stroke="#34281d" fill="none" stroke-width="1.45" opacity=".78">${leftScenes[house]||leftScenes.Falcon}${rightScenes[house]||rightScenes.Falcon}<path d="M36 446 C128 410 212 412 302 446 M744 446 C829 414 922 414 1090 446"/></g>
          <path d="M336 75H470 M653 75H787" stroke="#7b5527"/>
          <text x="561.5" y="70" class="over" text-anchor="middle">THE AERIE DOMINION</text>
          <text x="561.5" y="120" class="title" text-anchor="middle">Trial of the Houses</text>
          <text x="561.5" y="145" class="sub" text-anchor="middle">AETHELMAR ACADEMY · OFFICIAL RECORD</text>
          <g transform="translate(561.5 243)"><circle r="73" fill="#ead3aa" stroke="#6e4b23" stroke-width="2.2"/><circle r="63" fill="${accent}" stroke="#bf9148" stroke-width="3"/><image href="${selected}" x="-54" y="-54" width="108" height="108" preserveAspectRatio="xMidYMid meet"/></g>
          <text x="561.5" y="340" class="body" text-anchor="middle">This record certifies that</text>
          <text x="561.5" y="383" class="name" text-anchor="middle">${safeName}</text><path d="M323 396H800" stroke="#6b4a22" stroke-width="1.2"/>
          <text x="561.5" y="426" class="body" text-anchor="middle">has completed the Trial and been recognised by</text>
          <text x="561.5" y="463" class="house" text-anchor="middle">HOUSE ${safeHouse.toUpperCase()}</text>
          <text x="561.5" y="488" class="motto" text-anchor="middle">${safeMotto}</text>
          <text x="561.5" y="513" class="lore" text-anchor="middle">${safeLore}</text>
          <text x="83" y="542" class="fine">Date recorded:</text><text x="83" y="558" class="fine">${safeDate}</text><path d="M79 567H217" stroke="#6b4a22"/>
          <text x="1040" y="542" class="fine" text-anchor="end">Hall of Chronicles</text><text x="1040" y="558" class="fine" text-anchor="end">Record Verified</text><path d="M906 567H1044" stroke="#6b4a22"/>
          <path d="M70 610 C215 578 338 590 457 613 M666 613 C785 590 910 580 1052 610" fill="none" stroke="#6b4a22"/>
          ${sealRow}
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
window.ProjectAvisRewards = { records: houseRecords, sigils: houseSigils, buildCertificateSvg, downloadSvg, buildWallpaperCanvas };
})();
