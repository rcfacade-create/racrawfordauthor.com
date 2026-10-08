# Trial certificate correction — 8 October 2026

The previous journey repair retained the simplified SVG certificate. This change replaces that drawing with an engraved parchment plate derived from the approved `House Falcon Academy Certificate.png` reference and composes it with the original, unaltered Book One crest image bytes. Names and dates remain editable vector text. Exactly six Houses appear in the footer.

Canonical source: `The War of Feather and Shadow - Book I - Version 2.docx`, opening Six Great Houses section. Its embedded images map Crow=image3, Owl=image7, Hawk=image6, Falcon=image4, Swan=image2, Raven=image1. The PNGs are copied without modification to `aerie/assets/certificates/book-one`. SVG clipping removes the duplicated titles/translations; a luminance filter renders the original black artwork over parchment without a white box.

| House | Book One colours | Motto on original crest |
| --- | --- | --- |
| Crow | Black, deep green, tarnished silver | VERITAS IN TENEBRIS |
| Owl | Ivory, brown, tarnished brass | SAPIENTIA ANTE OMNIA |
| Hawk | Crimson, gold | VIGILANTIA ET HONOR |
| Falcon | Steel grey, midnight blue | CELERITAS SUPREMA VIRTUS |
| Swan | White, gold | LUX PER VERITATEM |
| Raven | Black, deep violet | IN UMBRA REGNUM |

All certificate entry points load the new version: personalised Trial preview/download/print, blank certificates and Starter Pack certificate buttons. The certificate palette is scoped to certificates; unrelated wallpaper and share art are not silently redesigned.

Validation: all six SVG outputs rendered and visually checked for border and crest/text separation. Tests verify the exact source crest bytes are embedded, all six footer Houses, matching motto/colour, escaped personal names and 3508 × 2480 output geometry. SVG text remains vector; the decorative background itself is a 1536 × 1024 raster plate, so the export dimensions are not a claim of native 300-dpi background detail.

## Phone download reliability follow-up

The original self-contained SVG was approximately 10.6 MB and revoked its download URL after one second. Downloads now produce an A4 landscape PDF, with a persistent explicit Save PDF link on the Trial and blank page (also the Starter Pack). The automatic handoff is an attempt, not a claim that the file reached the user's device. Original PNGs remain archived; served crests are lossless WebP copies with decoded RGBA equality verified. The background is encoded as quality-94 JPEG without changing dimensions or composition. Text stays vector in the page preview; the downloadable PDF flattens the certificate at 2400 × 1697 and embeds a JPEG. Print / Save as PDF remains available for browser-native vector text.
