(() => {
  "use strict";
  const houses = ["Crow", "Owl", "Hawk", "Falcon", "Swan", "Raven"];
  const sources = ["house_trial", "house_reward", "house_share", "chapter_one", "homepage"];
  const params = new URLSearchParams(location.search);
  const validHouse = value => houses.find(house => house.toLowerCase() === String(value || "").toLowerCase()) || "";
  const read = key => { try { return sessionStorage.getItem(key) || ""; } catch (_) { return ""; } };
  const write = (key, value) => { try { sessionStorage.setItem(key, value); } catch (_) {} };
  let house = validHouse(params.get("house")) || validHouse(read("avis_trial_house"));
  let source = sources.includes(params.get("source")) ? params.get("source") : read("avis_journey_source");
  if (!sources.includes(source)) source = "";
  // Referral House describes the sender; it never becomes the recipient's result.
  const referralHouse = validHouse(params.get("ref_house"));
  if (referralHouse && params.get("source") === "house_share") {
    write("avis_referral_house", referralHouse);
    write("avis_journey_source", "house_share");
  }
  if (house) write("avis_trial_house", house);
  if (source) write("avis_journey_source", source);
  const internalPaths = new Set(["/shop.html", "/chapter-one.html", "/downloads/free-house-starter.html", "/digital-products.html", "/aerie/certificate.html"]);
  const bookLinks = new Set(["dRmeVdbrd2A79cpfjf2Nq0j", "eVqcN5gLx7Ur88l7QN2Nq0k", "4gM8wP52P6Qn60dc732Nq0l", "14A3cveDpfmT74hfjf2Nq0m"]);
  function refreshLinks() {
    document.querySelectorAll("a[href]").forEach(link => {
      let url; try { url = new URL(link.getAttribute("href"), location.href); } catch (_) { return; }
      if (url.origin === location.origin && internalPaths.has(url.pathname)) {
        if (house) url.searchParams.set("house", house);
        if (source && !url.searchParams.has("source")) url.searchParams.set("source", source);
        link.setAttribute("href", url.pathname + url.search + url.hash);
      }
      if (url.hostname === "buy.stripe.com" && bookLinks.has(url.pathname.slice(1))) {
        if (house || source) url.searchParams.set("client_reference_id", "avis_" + (house || "unassigned") + "_" + (source || "direct"));
        link.setAttribute("href", url.href);
      }
    });
  }
  window.ProjectAvisJourney = {
    getHouse: () => house,
    getSource: () => source,
    getReferralHouse: () => referralHouse || validHouse(read("avis_referral_house")),
    setHouse(value) { house = validHouse(value); write("avis_trial_house", house); },
    setSource(value) { source = sources.includes(value) ? value : ""; write("avis_journey_source", source); },
    shareUrl(value) {
      const url = new URL("https://racrawfordauthor.com/aerie/trial.html");
      url.searchParams.set("source", "house_share");
      const ref = validHouse(value); if (ref) url.searchParams.set("ref_house", ref);
      return url.href;
    },
    refreshLinks
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refreshLinks);
  else refreshLinks();
})();
