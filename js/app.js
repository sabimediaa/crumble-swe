/* Exempelstäd – sidor, priskalkyl, formulär. Allt innehåll kommer från js/data.js. */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const kr = (n) => Math.round(n).toLocaleString("sv-SE") + " kr";
  const num = (n, d = 0) => n.toLocaleString("sv-SE", { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ---------- Ikoner ---------- */
  const P = {
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    box: '<path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
    window: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M10 21v-3h4v3"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    bucket: '<path d="M5 8h14l-1.5 12h-11z"/><path d="M5 8a7 4 0 0 1 14 0"/><path d="M9 4l1 4M15 4l-1 4"/>',
    handshake: '<path d="M2 12l4-4 4 2 4-2 4 2 4 2"/><path d="M6 8v6l5 4 3-2 4-3"/><path d="M11 18l-2-2"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>'
  };
  const icon = (name) => `<svg focusable="false" class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.sparkle}</svg>`;

  /* ---------- Illustrationer (byt gärna mot riktiga bilder) ---------- */
  const INK = "#0D114F", MINT = "#CFE8F8", DEEP = "#2E7A4B", MIST = "#F4F9FD", W = "#fff", GOLD = "#F2B634";
  const spark = (x, y, s = 1, c = W) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-14L3.5-3.5 14 0 3.5 3.5 0 14-3.5 3.5-14 0-3.5-3.5z" fill="${c}"/>`;
  const SCENES = {
    hero: `<svg viewBox="0 0 400 400"><circle cx="200" cy="210" r="170" fill="${W}" opacity=".5"/>
      <rect x="60" y="250" width="280" height="22" rx="11" fill="${INK}" opacity=".12"/>
      <g><rect x="196" y="150" width="96" height="112" rx="16" fill="${DEEP}"/><path d="M196 172h96" stroke="${INK}" stroke-width="5" opacity=".25"/>
      <path d="M186 150a58 30 0 0 1 116 0" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><ellipse cx="244" cy="150" rx="48" ry="9" fill="${MINT}"/>
      <circle cx="226" cy="140" r="14" fill="${W}"/><circle cx="246" cy="134" r="17" fill="${W}"/><circle cx="266" cy="141" r="12" fill="${W}"/></g>
      <g transform="rotate(-10 140 200)"><rect x="96" y="128" width="78" height="134" rx="22" fill="${W}"/><rect x="96" y="176" width="78" height="56" fill="${MINT}"/>
      <path d="M118 128v-22h36v22" fill="${INK}"/><path d="M110 106h58l12 16h-30" fill="${INK}"/><rect x="104" y="98" width="20" height="12" rx="3" fill="${INK}"/>
      <text x="135" y="210" text-anchor="middle" font-family="Fraunces,serif" font-weight="700" font-size="20" fill="${INK}">ren</text></g>
      <path d="M60 104 C 74 98 82 92 92 100" stroke="${W}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".9"/>
      ${spark(70, 86, 1.1)}${spark(320, 98, 1.4)}${spark(338, 214, .8)}${spark(48, 220, .9, DEEP)}${spark(300, 300, .7)}</svg>`,
    spray: `<svg viewBox="0 0 200 200"><g transform="rotate(-8 100 110)"><rect x="60" y="70" width="80" height="116" rx="22" fill="${W}"/><rect x="60" y="110" width="80" height="44" fill="${DEEP}"/><path d="M80 70V48h40v22" fill="${INK}"/><path d="M72 48h60l14 16h-34" fill="${INK}"/></g>${spark(40, 50, 1.1)}${spark(170, 40, .8)}</svg>`,
    calc: `<svg viewBox="0 0 200 200"><rect x="44" y="20" width="112" height="160" rx="22" fill="${INK}"/><rect x="58" y="36" width="84" height="38" rx="10" fill="${MINT}"/><text x="134" y="64" text-anchor="end" font-family="Outfit,sans-serif" font-weight="700" font-size="20" fill="${INK}">−50%</text>${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${58 + c * 30}" y="${86 + r * 30}" width="24" height="24" rx="7" fill="${r === 2 && c === 2 ? GOLD : W}" opacity="${r === 2 && c === 2 ? 1 : .9}"/>`).join("")).join("")}</svg>`,
    star: `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="${W}"/><path d="M100 46l15 33 36 4-27 24 8 35-32-19-32 19 8-35-27-24 36-4z" fill="${GOLD}"/>${spark(170, 40, .9, INK)}</svg>`,
    heart: `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="${W}"/><path d="M100 150s-50-30-50-62a26 26 0 0 1 50-10 26 26 0 0 1 50 10c0 32-50 62-50 62z" fill="${DEEP}"/>${spark(160, 46, .9, INK)}</svg>`,
    phone: `<svg viewBox="0 0 200 200"><rect x="56" y="20" width="88" height="160" rx="20" fill="${INK}"/><rect x="64" y="38" width="72" height="118" rx="8" fill="${MINT}"/><rect x="74" y="54" width="52" height="10" rx="5" fill="${W}"/><rect x="74" y="72" width="40" height="10" rx="5" fill="${W}" opacity=".7"/><rect x="74" y="120" width="52" height="22" rx="11" fill="${INK}"/><circle cx="100" cy="168" r="5" fill="${W}" opacity=".5"/>${spark(160, 50, .9)}</svg>`,
    team: `<svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice"><rect width="400" height="340" fill="${MINT}"/><circle cx="330" cy="70" r="40" fill="${W}" opacity=".5"/>
      ${[[110, DEEP], [200, INK], [290, DEEP]].map(([x, c], i) => `<g transform="translate(${x} ${i === 1 ? 150 : 170})"><circle r="34" fill="#F3D3B5"/><path d="M-34-4a34 34 0 0 1 68 0c0-14-14-30-34-30s-34 16-34 30z" fill="${INK}"/><path d="M-60 170v-70a60 50 0 0 1 120 0v70z" fill="${c}"/><rect x="-20" y="70" width="40" height="26" rx="6" fill="${W}" opacity=".9"/></g>`).join("")}
      ${spark(60, 70, 1.2)}${spark(350, 200, .9)}</svg>`,
    kitchen: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="${MIST}"/><rect y="200" width="400" height="100" fill="#DCEFEA"/><rect x="40" y="120" width="320" height="90" rx="6" fill="${W}"/><rect x="40" y="112" width="320" height="12" rx="4" fill="${INK}"/><rect x="60" y="140" width="80" height="56" rx="6" fill="${MINT}"/><rect x="160" y="140" width="80" height="56" rx="6" fill="${MINT}"/><rect x="260" y="140" width="80" height="56" rx="6" fill="${INK}"/><rect x="272" y="150" width="56" height="34" rx="4" fill="#244B47"/><rect x="60" y="30" width="120" height="60" rx="6" fill="${W}"/><rect x="220" y="30" width="120" height="60" rx="6" fill="${W}"/><circle cx="300" cy="104" r="6" fill="${DEEP}"/>${spark(90, 160, 1)}${spark(330, 60, 1.2, DEEP)}${spark(200, 100, .7, GOLD)}</svg>`,
    office: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#E6F4F0"/><rect x="0" y="40" width="400" height="110" fill="${W}"/><path d="M100 40v110M200 40v110M300 40v110" stroke="${MINT}" stroke-width="6"/><rect y="220" width="400" height="80" fill="#D5ECE6"/>${[60, 200, 340].map((x) => `<g transform="translate(${x} 0)"><rect x="-50" y="170" width="100" height="10" rx="3" fill="${INK}"/><rect x="-44" y="180" width="6" height="50" fill="${INK}"/><rect x="38" y="180" width="6" height="50" fill="${INK}"/><rect x="-20" y="140" width="40" height="28" rx="3" fill="${DEEP}"/></g>`).join("")}${spark(350, 70, 1.1, DEEP)}${spark(130, 250, .8)}</svg>`,
    bath: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="${W}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 50} 0v220" stroke="${MIST}" stroke-width="3"/>`).join("")}${Array.from({ length: 5 }, (_, i) => `<path d="M0 ${i * 50}h400" stroke="${MIST}" stroke-width="3"/>`).join("")}<rect y="220" width="400" height="80" fill="${MINT}"/><rect x="40" y="150" width="200" height="80" rx="30" fill="${W}" stroke="${INK}" stroke-width="5"/><path d="M200 150v-70h20" stroke="${INK}" stroke-width="6" fill="none"/><rect x="280" y="60" width="70" height="90" rx="35" fill="${MIST}" stroke="${DEEP}" stroke-width="5"/>${spark(110, 120, 1.1, DEEP)}${spark(320, 190, .9, GOLD)}${spark(70, 60, .8, DEEP)}</svg>`,
    living: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#F4FBF9"/><rect y="215" width="400" height="85" fill="#E2F2EE"/><rect x="250" y="30" width="110" height="130" rx="6" fill="${MINT}" opacity=".6"/><path d="M305 30v130M250 95h110" stroke="${W}" stroke-width="5"/><rect x="40" y="150" width="190" height="70" rx="20" fill="${DEEP}"/><rect x="30" y="140" width="34" height="80" rx="14" fill="${INK}"/><rect x="206" y="140" width="34" height="80" rx="14" fill="${INK}"/><circle cx="290" cy="200" r="22" fill="${GOLD}"/><rect x="284" y="200" width="12" height="30" fill="${INK}"/>${spark(120, 100, 1.1, DEEP)}${spark(370, 190, .8, DEEP)}</svg>`,
    window: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#EAF4F7"/><rect x="90" y="30" width="220" height="230" rx="8" fill="${W}"/><rect x="104" y="44" width="192" height="202" fill="#CDEBF3"/><path d="M200 44v202M104 145h192M152 44v202M248 44v202M104 94h192M104 196h192" stroke="${W}" stroke-width="6"/><path d="M120 60l50 50M130 60l60 60" stroke="${W}" stroke-width="5" opacity=".8"/><rect x="80" y="258" width="240" height="14" rx="4" fill="${INK}"/>${spark(330, 70, 1.3, DEEP)}${spark(60, 200, .9, DEEP)}</svg>`,
    stairs: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="${MIST}"/>${Array.from({ length: 6 }, (_, i) => `<rect x="${40 + i * 50}" y="${250 - i * 36}" width="${360 - i * 50}" height="36" fill="${i % 2 ? W : "#DDEFEA"}"/>`).join("")}<path d="M50 230 L330 30" stroke="${INK}" stroke-width="6"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${60 + i * 50} ${222 - i * 36}v-30" stroke="${INK}" stroke-width="4"/>`).join("")}${spark(80, 70, 1.2, DEEP)}${spark(340, 210, .9, GOLD)}</svg>`
  };
  const scene = (k) => (SCENES[k] || SCENES.living).replace("<svg ", '<svg aria-hidden="true" focusable="false" ');

  /* ---------- Globala texter ---------- */
  $$("[data-site]").forEach((el) => (el.textContent = S[el.dataset.site] ?? ""));
  $$("[data-phone-link]").forEach((el) => (el.href = "tel:" + S.phoneHref));
  $$("[data-phone-label]").forEach((el) => el.setAttribute("aria-label", "Ring oss på " + S.phone));
  $$("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  $$("[data-scene]").forEach((el) => (el.innerHTML = scene(el.dataset.scene)));
  $("#year").textContent = new Date().getFullYear();
  const trialPrice = `${S.trial.pricePerHour} kr/tim`;
  $$("[data-trial-price]").forEach((el) => (el.textContent = "från " + trialPrice));
  const hoursHTML = (sep = "<br>") => S.hours.map(([d, h]) => `${esc(d)} ${esc(h)}`).join(sep);

  const svcById = Object.fromEntries(S.services.map((s) => [s.id, s]));
  const fromPrice = (s) => (s.perWindow ? `${s.perWindow} kr/fönster` : `${kr(s.rut ? s.min / 2 : s.min)}`);
  const ratingAvg = S.reviews.reduce((a, r) => a + r.stars, 0) / S.reviews.length;
  const ratingStat = S.stats.find((x) => x.label.includes("betyg"));
  const stars = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
  const srOnly = (t) => `<span class="sr-only">${t}</span>`;
  const NEW_TAB = srOnly(" (öppnas i ny flik)");

  /* ---------- Hem ---------- */
  // Siffrorna visas i egen sektion direkt under hero – ingen dubblering här
  if ($("#hero-trust")) $("#hero-trust").innerHTML = S.stats.slice(0, 3).map((s) => `<div><strong>${num(s.value, s.decimals || 0)}${s.suffix}</strong>${esc(s.label.replace(" varje månad", "").replace(" med kollektivavtal", ""))}</div>`).join("");
  // Statisk förtroenderad i stället för rullande remsa – samma budskap, ingen rörelse
  $("#usps").innerHTML = ["Kvalitetsgaranti", "Städmaterial ingår", "Kollektivavtal", "Samma städare", "RUT direkt på fakturan"].map((w) => `<li>${icon("check")}${esc(w)}</li>`).join("");
  if (S.demo) $("#demo-bar").hidden = false;

  $("#stats").innerHTML = S.stats.map((s, i) => `<div class="stat"><strong data-count="${s.value}" data-dec="${s.decimals || 0}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</strong><span>${esc(s.label)}</span>${s === ratingStat ? `<span class="stars" aria-hidden="true">${stars(s.value)}</span>` : ""}</div>`).join("");
  const counted = new WeakSet();
  const runCount = (el) => {
    if (counted.has(el)) return; counted.add(el);
    const to = +el.dataset.count, dec = +el.dataset.dec, suf = el.dataset.suffix, t0 = performance.now(), dur = 1400;
    const tick = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = num(to * e, dec) + suf; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && runCount(e.target)), { threshold: .4 });
    $$("[data-count]").forEach((el) => io.observe(el));
  } else $$("[data-count]").forEach((el) => (el.textContent = num(+el.dataset.count, +el.dataset.dec) + el.dataset.suffix));

  $("#offers").innerHTML = S.offers.map((o) => `<article class="offer"><span class="tag">${esc(o.tag)}</span><h3>${esc(o.title)}</h3><p>${esc(o.text)}</p><a href="#kontakt?typ=offert">Ta del av erbjudandet →</a></article>`).join("");
  $("#reasons").innerHTML = S.reasons.map((r) => `<div class="reason"><span class="ic">${icon(r.icon)}</span><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p></div>`).join("");
  $("#svc-home").innerHTML = S.services.map((s) => `<button class="svc" type="button" data-svc="${s.id}"><span class="ic">${icon(s.icon)}</span><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><span class="from">från <b>${fromPrice(s)}</b>${s.rut && !s.perWindow ? " med RUT" : ""}</span></button>`).join("");

  const reviewHTML = (r) => `<figure class="review"><span class="stars" aria-hidden="true">${stars(r.stars)}</span>${srOnly(`Betyg ${r.stars} av 5.`)}<blockquote>”${esc(r.text)}”</blockquote><figcaption><span class="avatar">${esc(r.name[0])}</span><span>${esc(r.name)}<small>${esc(r.service)} · ${esc(r.place)}</small></span></figcaption></figure>`;
  $("#reviews-home").innerHTML = S.reviews.slice(0, 3).map(reviewHTML).join("");
  $("#reviews-all").innerHTML = S.reviews.map(reviewHTML).join("");
  const ratingLine = `<span class="reco"><span class="stars" aria-hidden="true">★</span> ${num(ratingStat ? ratingStat.value : ratingAvg, 1)} av 5</span> i snittbetyg på Reco`;
  $("#rating-line").innerHTML = ratingLine; $("#rating-line-2").innerHTML = ratingLine;

  $("#trial").innerHTML = `<div class="trial-copy"><span class="eyebrow">Provstädning</span><h2>Boka provstädning från <em>${trialPrice}</em></h2><p>${esc(S.trial.text)}</p>
      <ul>${["Ingen bindningstid", `Minst ${S.trial.minHours} timmar`, "Pris efter RUT-avdrag", "Städmaterial ingår"].map((t) => `<li>${icon("check")}${t}</li>`).join("")}</ul>
      <div class="hero-actions"><a class="btn btn-ink" href="#kontakt?typ=prov">Boka provstädning</a><a class="btn btn-ghost-dark" href="#pris">Räkna fast pris i stället</a></div></div>
    <div class="trial-price" aria-hidden="true"><span>från</span><strong>${S.trial.pricePerHour}</strong><span>kr/tim efter RUT</span></div>`;
  const O = S.office;
  $("#info-cards").innerHTML = `<div class="icard"><span class="ic">${icon("clock")}</span><h3>Öppettider</h3><dl>${S.hours.map(([d, h]) => `<dt>${esc(d)}</dt><dd>${esc(h)}</dd>`).join("")}</dl><p>Telefon och kundtjänst. Städning sker även utanför dessa tider.</p></div>
    <div class="icard"><span class="ic">${icon(O.hasOffice ? "building" : "pin")}</span><h3>${O.hasOffice ? "Vårt kontor" : "Inget kontor"}</h3><p>${O.hasOffice ? `<b>${esc(O.address)}</b><br>${esc(O.visiting)}` : "Vi har inget kontor att besöka – vi kommer alltid hem till dig."}</p>${O.hasOffice ? `<a class="link-arrow" href="#om-oss" data-jump-office>Se karta</a>` : ""}</div>
    <div class="icard"><span class="ic">${icon("pin")}</span><h3>Här städar vi</h3><p>${esc(S.area)}.</p><a class="link-arrow" href="#pris">Kolla ditt postnummer</a></div>`;

  /* ---------- Tjänster ---------- */
  $("#svc-list").innerHTML = S.services.map((s) => `<article class="svc-row" id="tjanst-${s.id}"><span class="ic">${icon(s.icon)}</span>
    <div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></div>
    <ul>${s.includes.map((i) => `<li>${icon("check")}${esc(i)}</li>`).join("")}</ul>
    <div class="side"><span class="from">från<b>${fromPrice(s)}</b>${s.rut ? '<span class="rut">RUT-avdrag</span>' : "Faktura till företag"}</span><a class="btn btn-ink btn-sm" href="#pris?tjanst=${s.id}">Räkna pris</a></div></article>`).join("");

  const dlg = $("#svc-dialog");
  function openService(id) {
    const s = svcById[id]; if (!s) return;
    dlg.innerHTML = `<button class="close" aria-label="Stäng">×</button><div class="info-grid"><div class="info-art"><span class="big-ic">${icon(s.icon)}</span><span class="price">från ${fromPrice(s)}</span><small>${s.rut ? "med RUT-avdrag" : "faktura, inkl. moms"}</small></div>
      <div class="info-body"><span class="eyebrow">Tjänst</span><h2 id="svc-dlg-title">${esc(s.name)}</h2><p class="desc">${esc(s.desc)}</p><div><h4>Det här ingår</h4><ul>${s.includes.map((i) => `<li>${icon("check")}${esc(i)}</li>`).join("")}</ul></div>
      <div class="info-actions"><a class="btn btn-ink" href="#pris?tjanst=${s.id}">Räkna pris</a><a class="btn btn-ghost-dark" href="#kontakt?typ=offert&tjanst=${s.id}">Få offert</a></div></div></div>`;
    dlg.showModal();
  }
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".close") || e.target.closest("a")) dlg.close(); });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-svc]"); if (b) openService(b.dataset.svc); });

  /* ---------- Referenser ---------- */
  let galFilter = "Alla";
  const cats = ["Alla", ...new Set(S.projects.map((p) => p.service))];
  function renderGallery() {
    $("#gal-filters").innerHTML = cats.map((c) => `<button type="button" class="chip ${c === galFilter ? "on" : ""}" aria-pressed="${c === galFilter}" data-f="${esc(c)}">${esc(c)}</button>`).join("");
    $("#gallery").innerHTML = S.projects.filter((p) => galFilter === "Alla" || p.service === galFilter).map((p) => `<figure class="proj"><div class="pic">${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy">` : scene(p.scene)}<span class="tag">${esc(p.service)}</span></div><figcaption><small>${esc(p.area)} · ${esc(p.size)}</small><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></figcaption></figure>`).join("");
  }
  $("#gal-filters").addEventListener("click", (e) => { const b = e.target.closest("[data-f]"); if (b) { galFilter = b.dataset.f; renderGallery(); } });
  renderGallery();

  /* ---------- Om oss, karta, FAQ ---------- */
  $("#about-text").innerHTML = `<span class="eyebrow">Vilka vi är</span><h2>${esc(S.about.title)}</h2>${S.about.text.map((t) => `<p>${esc(t)}</p>`).join("")}<div><a class="btn btn-ink" href="#kontakt">Kontakta oss</a></div>`;
  $("#values").innerHTML = S.about.values.map((v) => `<div class="value"><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></div>`).join("");
  $("#faq").innerHTML = S.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
  $("#rights").innerHTML = S.staffRights.map((r) => `<div class="right">${icon("check")}<div><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p></div></div>`).join("");
  if (!O.hasOffice) $("#office-sec").hidden = true;
  $("#office-title").textContent = "Vårt kontor";
  let mapLoaded = false;
  function loadMap() {
    if (mapLoaded || !O.hasOffice) return; mapLoaded = true;
    const { lat, lon } = S.map, d = 0.012;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d * 1.8},${lat - d},${lon + d * 1.8},${lat + d}&layer=mapnik&marker=${lat},${lon}`;
    $("#map").innerHTML = `<iframe title="Karta till ${esc(S.name)}" src="${src}" loading="lazy"></iframe>`;
  }
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(O.address)}`;
  $("#map-info").innerHTML = `<h3>${esc(S.name)}</h3><p style="opacity:.8;font-size:.92rem">${esc(O.visiting)}</p><dl><dt>Adress</dt><dd>${esc(O.address)}</dd>${S.hours.map(([d, h]) => `<dt>${esc(d)}</dt><dd>${esc(h)}</dd>`).join("")}</dl><p style="opacity:.8;font-size:.92rem">Vi städar i ${esc(S.area)}.</p><a class="btn btn-brand" href="${mapsUrl}" target="_blank" rel="noopener">Öppna i Google Maps${NEW_TAB}</a>`;

  /* ---------- Kontakt: info + sociala ---------- */
  $("#cinfo").innerHTML = `<a href="tel:${S.phoneHref}"><small>Ring</small><span>${esc(S.phone)}</span></a><a href="mailto:${esc(S.email)}"><small>Mejla</small><span>${esc(S.email)}</span></a>${O.hasOffice ? `<div><small>Kontor</small><span>${esc(O.address)}</span></div>` : `<div><small>Område</small><span>${esc(S.area)}</span></div>`}<div><small>Öppettider</small><span>${hoursHTML()}</span></div>`;
  const igTiles = ["kitchen", "bath", "window", "living", "office", "stairs"];
  $("#social-card").innerHTML = `<h2 class="card-title">Följ oss för före & efter</h2><p>Vi visar städtips, före-och-efter-bilder och erbjudanden som bara finns i våra kanaler. Ta en titt innan du bokar!</p>
    <div class="ig-grid" aria-hidden="true">${igTiles.map((k) => `<span>${scene(k)}</span>`).join("")}</div>
    <div class="social-links"><a href="${S.instagram.url}" target="_blank" rel="noopener">${icon("instagram")}<span>Instagram<small>${esc(S.instagram.handle)}</small>${NEW_TAB}</span></a><a href="${S.facebook.url}" target="_blank" rel="noopener">${icon("facebook")}<span>Facebook<small>${esc(S.facebook.handle)}</small>${NEW_TAB}</span></a></div>`;
  $("#foot-socials").innerHTML = `<a href="${S.instagram.url}" target="_blank" rel="noopener" aria-label="${esc(S.name)} på Instagram (öppnas i ny flik)">${icon("instagram")}</a><a href="${S.facebook.url}" target="_blank" rel="noopener" aria-label="${esc(S.name)} på Facebook (öppnas i ny flik)">${icon("facebook")}</a><a href="tel:${S.phoneHref}" aria-label="Ring oss">${icon("phone")}</a>`;
  $("#foot-services").innerHTML = S.services.map((s) => `<a href="#tjanster" data-jump="tjanst-${s.id}">${esc(s.name)}</a>`).join("");
  $("#foot-contact").insertAdjacentHTML("beforeend", `<a href="tel:${S.phoneHref}">${esc(S.phone)}</a><a href="mailto:${esc(S.email)}">${esc(S.email)}</a>${O.hasOffice ? `<span>${esc(O.address)}</span>` : ""}<span style="margin-top:.4rem">${hoursHTML()}</span>`);

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); }

  /* =========================================================
     Priskalkyl – steg för steg
     ========================================================= */
  const STEPS = ["Tjänst", "Storlek", "Hur ofta", "Tillval", "Adress"];
  const calc = { step: 0, svc: null, size: 70, windows: 8, freq: "w2", when: "snart", date: "", extras: new Set(), zip: "", rut: true };

  function priceOf(c = calc) {
    const s = svcById[c.svc]; if (!s) return null;
    const recurring = s.recurring && c.freq !== "once";
    const f = S.frequencies.find((x) => x.id === (s.recurring ? c.freq : "once"));
    const base = s.perWindow ? Math.max(s.min, s.perWindow * c.windows) : Math.max(s.min, s.perSqm * c.size);
    const visit = base * f.factor;
    const extras = S.extras.filter((x) => c.extras.has(x.id)).reduce((a, x) => a + x.price, 0);
    const before = visit + extras;
    const rutOn = s.rut && c.rut;
    const after = rutOn ? before / 2 : before;
    return { s, f, base, visit, extras, before, after, rutOn, recurring, perMonth: recurring ? after * f.perMonth : 0 };
  }

  function stepHTML() {
    const s = svcById[calc.svc];
    switch (calc.step) {
      case 0: return `<h2>Vad vill du ha städat?</h2><p class="sub">Välj en tjänst – du kan alltid ändra.</p>
        <div class="opts">${S.services.map((x) => `<button class="opt" type="button" data-pick-svc="${x.id}" aria-pressed="${calc.svc === x.id}"><span class="ic">${icon(x.icon)}</span><strong>${esc(x.name)}</strong><small>${esc(x.short)}</small></button>`).join("")}</div>`;
      case 1: return s.perWindow
        ? `<h2>Hur många fönster?</h2><p class="sub">Räkna varje fönsterbåge. Kopplade fönster räknas som ett.</p>
          <div class="size-box"><div class="size-row"><span class="size-val" id="size-val">${calc.windows} <small>fönster</small></span><div class="stepper"><button type="button" data-win="-1" aria-label="Färre">−</button><b>${calc.windows}</b><button type="button" data-win="1" aria-label="Fler">+</button></div></div>
          <input type="range" min="1" max="40" value="${calc.windows}" id="win-range" aria-label="Antal fönster"></div>`
        : `<h2>Hur stor är ${s.id === "kontor" ? "lokalen" : "bostaden"}?</h2><p class="sub">Ungefär räcker – vi bekräftar i offerten.</p>
          <div class="size-box"><div class="size-row"><span class="size-val" id="size-val">${calc.size} <small>kvm</small></span><div class="stepper"><button type="button" data-sz="-5" aria-label="Mindre">−</button><b id="size-b">${calc.size}</b><button type="button" data-sz="5" aria-label="Större">+</button></div></div>
          <input type="range" min="20" max="${s.id === "kontor" ? 1000 : 300}" step="5" value="${calc.size}" id="size-range" aria-label="Storlek i kvm"></div>`;
      case 2: return s.recurring
        ? `<h2>Hur ofta?</h2><p class="sub">Återkommande städning ger rabatt och samma städare varje gång.</p>
          <div class="opts">${S.frequencies.map((f) => `<button class="opt" type="button" data-freq="${f.id}" aria-pressed="${calc.freq === f.id}"><strong>${esc(f.label)}</strong><small>${f.note ? `<span class="note">${esc(f.note)}</span> per tillfälle` : f.id === "once" ? "Engångsstädning" : "Ordinarie pris"}</small></button>`).join("")}</div>`
        : `<h2>När passar det?</h2><p class="sub">${esc(s.name)} bokas som ett tillfälle.</p>
          <div class="opts">${[["snart", "Så snart som möjligt", "Oftast inom en vecka"], ["2v", "Inom två veckor", "Flexibel tid"], ["datum", "Ett visst datum", "Välj nedan"]].map(([id, l, d]) => `<button class="opt" type="button" data-when="${id}" aria-pressed="${calc.when === id}"><strong>${l}</strong><small>${d}</small></button>`).join("")}</div>
          ${calc.when === "datum" ? `<label class="lbl">Datum<input type="text" id="when-date" inputmode="numeric" placeholder="ÅÅÅÅ-MM-DD" value="${esc(calc.date)}"></label>` : ""}`;
      case 3: return `<h2>Vill du lägga till något?</h2><p class="sub">Valfritt. Priserna gäller per tillfälle, före RUT.</p>
        <div class="checks">${S.extras.map((x) => `<label class="check-row"><span><input type="checkbox" data-extra="${x.id}" ${calc.extras.has(x.id) ? "checked" : ""}>${esc(x.label)}</span><b>+ ${kr(x.price)}</b></label>`).join("")}</div>`;
      case 4: return `<h2>Var ska vi städa?</h2><p class="sub">Vi kollar att vi hinner till dig.</p>
        <label class="lbl">Postnummer<input type="text" id="zip" inputmode="numeric" maxlength="6" placeholder="123 45" value="${esc(calc.zip)}" autocomplete="postal-code"></label><div id="zip-msg"></div>
        ${s.rut ? `<div class="toggle-row"><span><b>Använd RUT-avdrag</b><small>Du betalar halva arbetskostnaden. Gäller privatpersoner.</small></span><button type="button" class="switch" role="switch" aria-checked="${calc.rut}" id="rut-sw" aria-label="RUT-avdrag"></button></div>` : `<p class="sub" style="margin:0">Kontorsstäd faktureras företaget. RUT gäller inte.</p>`}`;
    }
  }

  function zipMsg() {
    const z = calc.zip.replace(/\s/g, ""), el = $("#zip-msg"); if (!el) return;
    if (!z) el.innerHTML = "";
    else if (!/^\d{5}$/.test(z)) el.innerHTML = `<span class="zip-bad">Ange fem siffror.</span>`;
    else if (S.serviceZipPrefixes.some((p) => z.startsWith(p))) el.innerHTML = `<span class="zip-ok">✓ Vi städar i ditt område.</span>`;
    else el.innerHTML = `<span class="zip-bad">Du verkar bo utanför vårt område – skicka ändå, så hör vi av oss.</span>`;
  }

  function canNext() {
    if (calc.step === 0) return !!calc.svc;
    if (calc.step === 2 && !svcById[calc.svc].recurring && calc.when === "datum") return /^\d{4}-\d{2}-\d{2}$/.test(calc.date);
    if (calc.step === 4) return /^\d{5}$/.test(calc.zip.replace(/\s/g, ""));
    return true;
  }

  let liveT;
  function announcePrice() {
    clearTimeout(liveT);
    liveT = setTimeout(() => { const p = priceOf(); $("#calc-live").textContent = p ? `Du betalar ${kr(p.after)} per tillfälle${p.rutOn ? " efter RUT-avdrag" : ""}.` : ""; }, 700);
  }
  function renderSummary() {
    announcePrice();
    const p = priceOf(), el = $("#calc-summary");
    if (!p) { el.innerHTML = `<h3>Ditt pris</h3><p style="opacity:.75">Välj en tjänst så räknar vi direkt.</p><ul class="sum-lines"><li><span>Städmaterial</span><span>Ingår</span></li><li><span>Garanti</span><span>Ingår</span></li><li><span>Försäkring</span><span>Ingår</span></li></ul>`; return; }
    const whenLabel = p.s.recurring ? p.f.label : ({ snart: "Så snart som möjligt", "2v": "Inom två veckor", datum: calc.date || "Välj datum" })[calc.when];
    el.innerHTML = `<h3>${esc(p.s.name)}</h3>
      <ul class="sum-lines"><li><span>Storlek</span><span>${p.s.perWindow ? calc.windows + " fönster" : calc.size + " kvm"}</span></li><li><span>${p.s.recurring ? "Frekvens" : "När"}</span><span>${esc(whenLabel)}</span></li>
      ${S.extras.filter((x) => calc.extras.has(x.id)).map((x) => `<li><span>${esc(x.label)}</span><span>+ ${kr(x.price)}</span></li>`).join("")}
      <li><span>Städmaterial</span><span>Ingår</span></li></ul>
      <div class="totals"><div><span>Pris per tillfälle</span><span>${kr(p.before)}</span></div>${p.rutOn ? `<div><span>RUT-avdrag −50 %</span><span>− ${kr(p.before - p.after)}</span></div>` : ""}
      <div class="grand"><span>Du betalar</span><span>${kr(p.after)}</span></div>${p.recurring ? `<div><span>Ca per månad</span><span>${kr(p.perMonth)}</span></div>` : ""}</div>
      <a class="btn btn-brand" href="#kontakt?typ=offert&kalkyl=1" id="book-btn">${calc.step === 4 && canNext() ? "Boka med det här priset →" : "Skicka som offertförfrågan →"}</a>
      <p class="note">Ungefärligt pris inkl. moms. Du får ett fast pris i offerten.</p>`;
  }

  let calcStarted = false;
  function renderCalc(animate = true) {
    $("#calc-progress").innerHTML = STEPS.map((t, i) => `<li class="${i < calc.step ? "done" : i === calc.step ? "on" : ""}" ${i === calc.step ? 'aria-current="step"' : ""}>${i < calc.step ? `<span aria-hidden="true">✓ </span>` : `${i + 1}. `}${t}${i < calc.step ? srOnly(" (klart)") : ""}</li>`).join("");
    const box = $("#calc-step");
    box.innerHTML = stepHTML();
    const h2 = $("h2", box); if (h2) { h2.tabIndex = -1; h2.id = "calc-step-title"; if (animate && calcStarted) h2.focus({ preventScroll: false }); }
    box.setAttribute("aria-labelledby", "calc-step-title");
    if (animate) { box.classList.remove("enter"); void box.offsetWidth; box.classList.add("enter"); }
    $("#calc-back").style.visibility = calc.step ? "visible" : "hidden";
    const next = $("#calc-next");
    next.textContent = calc.step === STEPS.length - 1 ? "Gå vidare och boka →" : "Nästa →";
    next.disabled = !canNext();
    zipMsg();
    renderSummary();
  }
  const refresh = () => { $("#calc-next").disabled = !canNext(); renderSummary(); };

  $("#calc-step").addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.pickSvc) { calc.svc = t.dataset.pickSvc; if (!svcById[calc.svc].rut) calc.rut = false; else calc.rut = true; calc.step = 1; renderCalc(); }
    else if (t.dataset.sz) { const s = svcById[calc.svc]; calc.size = Math.min(s.id === "kontor" ? 1000 : 300, Math.max(20, calc.size + +t.dataset.sz)); renderCalc(false); }
    else if (t.dataset.win) { calc.windows = Math.min(40, Math.max(1, calc.windows + +t.dataset.win)); renderCalc(false); }
    else if (t.dataset.freq) { calc.freq = t.dataset.freq; renderCalc(false); }
    else if (t.dataset.when) { calc.when = t.dataset.when; renderCalc(false); }
    else if (t.id === "rut-sw") { calc.rut = !calc.rut; t.setAttribute("aria-checked", calc.rut); refresh(); }
  });
  $("#calc-step").addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "size-range") { calc.size = +t.value; $("#size-val").innerHTML = `${calc.size} <small>kvm</small>`; $("#size-b").textContent = calc.size; refresh(); }
    else if (t.id === "win-range") { calc.windows = +t.value; $("#size-val").innerHTML = `${calc.windows} <small>fönster</small>`; t.previousElementSibling.querySelector("b").textContent = calc.windows; refresh(); }
    else if (t.dataset.extra) { t.checked ? calc.extras.add(t.dataset.extra) : calc.extras.delete(t.dataset.extra); refresh(); }
    else if (t.id === "zip") { calc.zip = t.value; zipMsg(); refresh(); }
    else if (t.id === "when-date") { calc.date = t.value.trim(); refresh(); }
  });
  $("#calc-back").addEventListener("click", () => { if (calc.step) { calc.step--; renderCalc(); } });
  $("#calc-next").addEventListener("click", () => {
    if (!canNext()) return;
    if (calc.step < STEPS.length - 1) { calc.step++; renderCalc(); }
    else location.hash = "#kontakt?typ=offert&kalkyl=1";
  });

  /* =========================================================
     Formulär – offert, ring upp, kontakt
     ========================================================= */
  let formType = "offert", attachCalc = false, preSvc = null, sent = false;
  const svcOptions = (sel) => S.services.map((s) => `<option value="${s.id}" ${sel === s.id ? "selected" : ""}>${esc(s.name)}</option>`).join("");

  function calcText() {
    const p = priceOf(); if (!p) return "";
    return `${p.s.name}, ${p.s.perWindow ? calc.windows + " fönster" : calc.size + " kvm"}, ${p.s.recurring ? p.f.label.toLowerCase() : "engång"} – ca ${kr(p.after)}${p.rutOn ? " efter RUT" : ""} per tillfälle`;
  }

  function renderForm() {
    sent = false;
    $$("#form-tabs button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.type === formType));
    const f = $("#lead-form");
    const honeypot = `<div class="hp" aria-hidden="true"><label>Lämna tomt<input name="webbplats" tabindex="-1" autocomplete="off"></label></div>`;
    const consent = honeypot + `<label class="consent"><input type="checkbox" name="samtycke" required><span>Jag godkänner att ${esc(S.name)} sparar mina uppgifter för att kunna svara på förfrågan.</span></label>`;
    if (formType === "offert") {
      const p = attachCalc ? priceOf() : null;
      const picked = new Set(p ? [p.s.id] : preSvc ? [preSvc] : []);
      f.innerHTML = `<h2 class="form-title">Begär offert</h2><p class="lead">Fast pris inom en arbetsdag. Helt kostnadsfritt.</p>
        ${p ? `<div class="calc-attached"><span>Från priskalkylen:<br><b>${esc(calcText())}</b></span><button type="button" id="detach">Ta bort</button></div>` : ""}
        <fieldset class="pick-set"><legend>Vilka tjänster gäller det? <span class="req" aria-hidden="true">*</span></legend><div class="svc-pick" id="svc-pick">${S.services.map((s) => `<button type="button" data-v="${s.id}" aria-pressed="${picked.has(s.id)}">${esc(s.name)}</button>`).join("")}</div></fieldset>
        <div class="row2"><label>Namn<input name="namn" autocomplete="name" required></label><label>Telefon<input name="telefon" type="tel" autocomplete="tel" required></label></div>
        <div class="row2"><label>E-post<input name="epost" type="email" autocomplete="email" required></label><label>Postnummer<input name="postnummer" inputmode="numeric" autocomplete="postal-code" value="${esc(p ? calc.zip : "")}" required></label></div>
        <div class="row2"><label>Storlek (kvm)<input name="kvm" inputmode="numeric" value="${p && !p.s.perWindow ? calc.size : ""}"></label><label>Önskad start<select name="start"><option>Så snart som möjligt</option><option>Inom två veckor</option><option>Inom en månad</option><option>Jag är flexibel</option></select></label></div>
        <label>Något mer vi bör veta?<textarea name="meddelande" placeholder="T.ex. husdjur, nyckel, portkod eller särskilda önskemål"></textarea></label>
        ${consent}<div id="ferr"></div><button class="btn btn-ink" type="submit">Skicka offertförfrågan</button>`;
    } else if (formType === "prov") {
      const hs = [3, 4, 5, 6];
      f.innerHTML = `<h2 class="form-title">Boka provstädning</h2><p class="lead">Från ${trialPrice} efter RUT. Ingen bindningstid – minst ${S.trial.minHours} timmar.</p>
        <div class="row2"><label>Typ av städning<select name="tjanst"><option value="hemstad">Hemstädning</option><option value="kontor">Kontorsstädning</option></select></label><label>Antal timmar<select name="timmar" id="prov-h">${hs.map((h) => `<option value="${h}">${h} timmar</option>`).join("")}</select></label></div>
        <div class="calc-attached" id="prov-sum"></div>
        <div class="row2"><label>Namn<input name="namn" autocomplete="name" required></label><label>Telefon<input name="telefon" type="tel" autocomplete="tel" required></label></div>
        <div class="row2"><label>E-post<input name="epost" type="email" autocomplete="email" required></label><label>Postnummer<input name="postnummer" inputmode="numeric" autocomplete="postal-code" required></label></div>
        <label>Önskad dag<select name="start"><option>Så snart som möjligt</option><option>Nästa vecka</option><option>Inom två veckor</option><option>Jag är flexibel</option></select></label>
        <label>Önskemål<textarea name="meddelande" placeholder="Vad vill du att vi fokuserar på?"></textarea></label>
        ${consent}<div id="ferr"></div><button class="btn btn-ink" type="submit">Boka provstädning</button>`;
      const upd = () => { const h = +$("#prov-h").value, office = f.tjanst.value === "kontor"; $("#prov-sum").innerHTML = `<span>${h} timmar × ${office ? S.trial.pricePerHour * 2 + " kr/tim (ingen RUT för företag)" : trialPrice}</span><b>${kr(h * S.trial.pricePerHour * (office ? 2 : 1))}</b>`; };
      f.timmar.addEventListener("change", upd); f.tjanst.addEventListener("change", upd); upd();
    } else if (formType === "ring") {
      f.innerHTML = `<h2 class="form-title">Bli uppringd</h2><p class="lead">Lämna ditt nummer så ringer vi upp – oftast samma dag.</p>
        <div class="row2"><label>Namn<input name="namn" autocomplete="name" required></label><label>Telefon<input name="telefon" type="tel" autocomplete="tel" required></label></div>
        <div class="row2"><label>Bästa tid att ringa<select name="tid"><option>Förmiddag (8–12)</option><option>Eftermiddag (12–17)</option><option>Kväll (17–19)</option></select></label><label>Det gäller<select name="tjanst"><option value="">Vet inte än</option>${svcOptions(preSvc)}</select></label></div>
        <label>E-post (för bekräftelse)<input name="epost" type="email" autocomplete="email"></label>
        ${consent}<div id="ferr"></div><button class="btn btn-ink" type="submit">Ring upp mig</button>`;
    } else {
      f.innerHTML = `<h2 class="form-title">Skriv till oss</h2><p class="lead">Frågor om tjänster, fakturor eller något annat.</p>
        <div class="row2"><label>Namn<input name="namn" autocomplete="name" required></label><label>E-post<input name="epost" type="email" autocomplete="email" required></label></div>
        <label>Ämne<select name="amne"><option>Allmän fråga</option><option>Befintlig kund</option><option>Faktura</option><option>Jobba hos oss</option></select></label>
        <label>Meddelande<textarea name="meddelande" required></textarea></label>
        ${consent}<div id="ferr"></div><button class="btn btn-ink" type="submit">Skicka meddelande</button>`;
    }
  }

  function decorateForm(f) {
    $$("[required]", f).forEach((i) => {
      i.setAttribute("aria-required", "true");
      const lab = i.closest("label");
      if (lab && i.type !== "checkbox" && !lab.querySelector(".req")) {
        const t = lab.firstChild;
        if (t && t.nodeType === 3) {
          const wrap = document.createElement("span"); wrap.className = "lbl-text";
          const star = Object.assign(document.createElement("span"), { className: "req", textContent: " *" }); star.setAttribute("aria-hidden", "true");
          t.replaceWith(wrap); wrap.append(t, star);
        }
      }
    });
    const err = $("#ferr", f); if (err) { err.setAttribute("role", "alert"); }
  }
  new MutationObserver(() => decorateForm($("#lead-form"))).observe($("#lead-form"), { childList: true });

  $("#form-tabs").addEventListener("click", (e) => { const b = e.target.closest("button[data-type]"); if (b) { formType = b.dataset.type; renderForm(); } });
  $("#lead-form").addEventListener("click", (e) => {
    const b = e.target.closest("#svc-pick button"); if (b) b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true");
    if (e.target.id === "detach") { attachCalc = false; renderForm(); }
  });

  const LABELS = { offert: "Offertförfrågan", prov: "Provstädning", ring: "Ring upp", kontakt: "Kontakt" };
  $("#lead-form").addEventListener("submit", async (e) => {
    e.preventDefault(); if (sent) return;
    const f = e.currentTarget, err = $("#ferr", f), data = Object.fromEntries(new FormData(f));
    if (data.webbplats) return; // fältet syns inte för människor – är det ifyllt är det en bot
    delete data.webbplats;
    data.typ = LABELS[formType];
    if (formType === "offert") data.tjanster = $$("#svc-pick button[aria-pressed=true]", f).map((b) => svcById[b.dataset.v].name).join(", ");
    if (formType === "offert" && attachCalc) data.kalkyl = calcText();
    if (data.tjanst) data.tjanst = svcById[data.tjanst]?.name || "";
    const problems = [];
    $$("[aria-invalid]", f).forEach((i) => { i.removeAttribute("aria-invalid"); i.removeAttribute("aria-describedby"); });
    $$(".field-err", f).forEach((x) => x.remove());
    const flag = (input, msg) => {
      problems.push({ input, msg });
      if (!input) return;
      const id = "err-" + (input.name || input.id);
      input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", id);
      // aria-hidden så felet inte blir en del av fältets namn – det läses upp via aria-describedby
      const m = Object.assign(document.createElement("span"), { className: "field-err", id, textContent: msg });
      m.setAttribute("aria-hidden", "true");
      (input.closest("label") || input.closest("fieldset")).appendChild(m);
    };
    const labelText = (i) => (i.closest("label")?.firstChild?.textContent || "Fältet").replace("*", "").trim();
    $$("[required]", f).forEach((i) => {
      if (i.type === "checkbox" ? !i.checked : !i.value.trim()) flag(i, i.type === "checkbox" ? "Du behöver godkänna för att vi ska kunna svara." : `Fyll i ${labelText(i).toLowerCase()}.`);
    });
    if (data.epost && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.epost)) flag(f.epost, "Skriv e-post som namn@exempel.se.");
    if (data.telefon && data.telefon.replace(/\D/g, "").length < 7) flag(f.telefon, "Telefonnumret är för kort.");
    if (formType === "offert" && !data.tjanster) flag($("#svc-pick button", f), "Välj minst en tjänst.");
    if (problems.length) {
      problems.sort((a, b) => (a.input && b.input ? (a.input.compareDocumentPosition(b.input) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1) : 0));
      err.innerHTML = `<div class="ferr"><b>${problems.length === 1 ? "1 sak" : problems.length + " saker"} behöver rättas:</b><ul>${problems.map((p) => `<li>${esc(p.msg)}</li>`).join("")}</ul></div>`;
      const first = problems[0].input; if (first) first.focus();
      return;
    }
    err.innerHTML = "";
    const btn = $("button[type=submit]", f); btn.disabled = true; btn.textContent = "Skickar…";
    let ok = true;
    if (S.formEndpoint) {
      try {
        const res = await fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, email: data.epost, _subject: `${data.typ} från ${data.namn}` }) });
        ok = res.ok;
      } catch { ok = false; }
    } else await new Promise((r) => setTimeout(r, 600));
    if (!ok) { btn.disabled = false; btn.textContent = "Försök igen"; err.innerHTML = `<div class="ferr">Det gick inte att skicka. Ring oss på ${esc(S.phone)} så hjälper vi dig.</div>`; return; }
    sent = true;
    const first = (data.namn || "").split(" ")[0];
    const mail = [
      `Hej ${first}!`, "",
      formType === "prov" ? `Tack för din bokning av provstädning (${data.timmar} timmar). Vi ringer och bekräftar dag och tid.` : formType === "ring" ? `Tack – vi ringer dig på ${data.telefon} (${data.tid.toLowerCase()}).` : formType === "offert" ? "Tack för din offertförfrågan. Du får ett fast pris inom en arbetsdag." : "Tack för ditt meddelande. Vi svarar inom en arbetsdag.",
      data.tjanster ? `Tjänster: ${data.tjanster}` : "", data.kalkyl ? `Kalkyl: ${data.kalkyl}` : "", "",
      `Vänliga hälsningar,`, `${S.name} · ${S.phone}`
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
    f.innerHTML = `<div class="thanks"><span class="ok" aria-hidden="true">${icon("check")}</span><h3 tabindex="-1" id="thanks-title">${S.formEndpoint ? `Tack, ${esc(first)}!` : "Formuläret fungerar"}</h3>
      ${S.formEndpoint
        ? `<p>${formType === "ring" ? "Vi ringer upp dig så snart vi kan." : "Vi har tagit emot din förfrågan och återkommer inom en arbetsdag."}${data.epost ? ` En bekräftelse har skickats till <b>${esc(data.epost)}</b>.` : ""}</p>`
        : `<p class="demo-note"><b>Demo-läge:</b> inget skickades och inget mejl gick ut. När formuläret kopplas till en e-posttjänst får kunden det här bekräftelsemejlet:</p>`}
      ${data.epost ? `<div class="mail-preview"><small>${S.formEndpoint ? "Bekräftelsemejl" : "Förhandsvisning av bekräftelsemejl"}</small><pre>${esc(mail)}</pre></div>` : ""}
      <button class="btn btn-ghost-dark" type="button" id="again">Skicka en till</button></div>`;
    $("#thanks-title").focus();
    $("#again").addEventListener("click", () => { attachCalc = false; renderForm(); $("input, select, textarea", f)?.focus(); });
    toast(S.formEndpoint ? "Skickat!" : "Demo – inget skickades");
  });

  /* =========================================================
     Routing med hash-länkar (#pris, #kontakt?typ=ring …)
     ========================================================= */
  const TITLES = { hem: `${S.name} – Hemstädning, kontorsstädning, flyttstädning och fönsterputs`, tjanster: "Tjänster", pris: "Räkna ut pris", referenser: "Referenser & recensioner", "om-oss": "Om oss", kontakt: "Kontakt & offert" };
  function route() {
    const raw = location.hash.slice(1) || "hem";
    const [name, qs] = raw.split("?");
    const view = TITLES[name] ? name : "hem";
    const q = new URLSearchParams(qs || "");
    $$(".view").forEach((v) => { const on = v.dataset.view === view; v.hidden = !on; v.classList.toggle("enter", on); });
    $$(".navlinks a").forEach((a) => { const on = a.getAttribute("href") === "#" + view; a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"); });
    document.body.className = "on-" + view;
    document.title = view === "hem" ? TITLES.hem : `${TITLES[view]} – ${S.name}`;
    if (view === "pris") {
      const t = q.get("tjanst");
      if (t && svcById[t]) { calc.svc = t; calc.rut = svcById[t].rut; calc.step = 1; }
      renderCalc();
    }
    if (view === "kontakt") {
      const typ = q.get("typ"); if (["offert", "prov", "ring", "kontakt"].includes(typ)) formType = typ;
      attachCalc = q.get("kalkyl") === "1" && !!calc.svc;
      preSvc = svcById[q.get("tjanst")] ? q.get("tjanst") : null;
      renderForm();
    }
    if (view === "om-oss") loadMap();
    if (!route.first) {
      window.scrollTo({ top: 0, behavior: "instant" });
      // Flytta fokus till sidans rubrik så skärmläsare och tangentbord börjar rätt
      const h1 = $(`.view[data-view="${view}"] h1`);
      if (h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); }
    }
    if (view === "pris") calcStarted = true;
    route.first = false;
  }
  route.first = true;
  $(".skip").addEventListener("click", (e) => { e.preventDefault(); const m = $("#main"); m.focus(); m.scrollIntoView(); });
  window.addEventListener("hashchange", route);
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-jump]"); if (!a) return;
    e.preventDefault(); location.hash = "#tjanster";
    setTimeout(() => document.getElementById(a.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-jump-office]")) return;
    e.preventDefault(); location.hash = "#om-oss";
    setTimeout(() => $("#office-sec").scrollIntoView({ behavior: "smooth" }), 60);
  });

  /* =========================================================
     Sökmotor – söker i tjänster, priser, frågor och sidor
     ========================================================= */
  const IDX = [
    ...S.services.map((s) => ({ t: s.name, d: s.short, k: [s.desc, ...s.includes, s.rut ? "rut" : ""].join(" "), href: `#tjanster`, jump: `tjanst-${s.id}`, g: "Tjänst" })),
    { t: `Provstädning från ${trialPrice}`, d: S.trial.text, k: "prov test timpris timme", href: "#kontakt?typ=prov", g: "Boka" },
    { t: "Räkna ut pris", d: "Priskalkyl steg för steg med RUT-avdrag.", k: "pris kostnad kalkyl rut avdrag kvm", href: "#pris", g: "Sida" },
    { t: "Begär offert", d: "Fast pris inom en arbetsdag.", k: "offert pris förfrågan", href: "#kontakt?typ=offert", g: "Boka" },
    { t: "Bli uppringd", d: "Lämna ditt nummer så ringer vi.", k: "ring telefon samtal", href: "#kontakt?typ=ring", g: "Kontakt" },
    { t: "Öppettider", d: S.hours.map(([d, h]) => `${d} ${h}`).join(" · "), k: "öppet öppettider tider stängt helg", href: "#kontakt", g: "Info" },
    ...(O.hasOffice ? [{ t: "Vårt kontor", d: O.address, k: "kontor adress karta besök hitta", href: "#om-oss", g: "Info", office: true }] : []),
    { t: "Personalens rättigheter", d: "Kollektivavtal, pension, försäkring och fasta tjänster.", k: S.staffRights.map((r) => r.title + " " + r.text).join(" ") + " personal anställda villkor", href: "#om-oss", g: "Om oss" },
    { t: "Referenser och recensioner", d: `${S.reviews.length} omdömen och ${S.projects.length} referensprojekt.`, k: "recension omdöme betyg reco galleri bilder", href: "#referenser", g: "Sida" },
    ...S.faq.map((f) => ({ t: f.q, d: f.a, k: "", href: "#om-oss", g: "Fråga" })),
    ...S.offers.map((o) => ({ t: o.title, d: o.text, k: "erbjudande rabatt", href: "#hem", g: "Erbjudande" }))
  ];
  const norm = (x) => x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const sdlg = $("#search-dlg"), sq = $("#search-q"), sres = $("#search-res");
  function doSearch() {
    setTimeout(() => { const n = $$("#search-res a").length; $("#search-live").textContent = sq.value.trim() ? (n ? `${n} träffar` : "Inga träffar") : ""; }, 300);
    const words = norm(sq.value.trim()).split(/\s+/).filter(Boolean);
    const hits = !words.length ? IDX.filter((i) => ["Tjänst", "Boka"].includes(i.g)) : IDX.map((i) => {
      const t = norm(i.t), all = norm(`${i.t} ${i.d} ${i.k}`);
      if (!words.every((w) => all.includes(w))) return null;
      return { ...i, score: words.reduce((a, w) => a + (t.includes(w) ? 3 : 1), 0) };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
    sres.innerHTML = hits.length ? hits.slice(0, 8).map((h, n) => `<a href="${h.href}" ${h.jump ? `data-sjump="${h.jump}"` : ""} ${h.office ? "data-jump-office" : ""}><small>${esc(h.g)}</small><b>${esc(h.t)}</b><span>${esc(h.d)}</span></a>`).join("")
      : `<p class="search-empty">Inga träffar på ”${esc(sq.value)}”. <a href="#kontakt?typ=kontakt">Fråga oss direkt →</a></p>`;
  }
  function openSearch() { sq.value = ""; doSearch(); sdlg.showModal(); sq.focus(); }
  $("#search-open").addEventListener("click", openSearch);
  sq.addEventListener("input", doSearch);
  sq.addEventListener("keydown", (e) => { if (e.key === "Enter") { const a = $("a", sres); if (a) a.click(); } });
  sdlg.addEventListener("click", (e) => {
    if (e.target === sdlg || e.target.closest(".search-close")) return sdlg.close();
    const a = e.target.closest("a"); if (!a) return;
    sdlg.close();
    if (a.dataset.sjump) { e.preventDefault(); location.hash = "#tjanster"; setTimeout(() => document.getElementById(a.dataset.sjump)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))) { e.preventDefault(); openSearch(); }
  });

  /* =========================================================
     Animationer: scroll-reveal, header, progress, parallax
     ========================================================= */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RV = ".section-head, .stat, .offer, .reason, .svc, .steps li, .review, .trial, .icard, .band, .svc-row, .proj, .value, .right, .about-text, .about-art, .map, .map-info, .faq details, .cinfo > *, .social-card, .form-card, .calc, .summary, .foot-top > *";
  const rvIO = !reduce && "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in"); rvIO.unobserve(e.target);
  }), { threshold: .12, rootMargin: "0px 0px -6% 0px" }) : null;
  function scanReveal(root = document) {
    if (!rvIO || !root.querySelectorAll) return;
    const list = $$(RV, root); if (root.matches && root.matches(RV)) list.push(root);
    list.forEach((el) => {
      if (el.classList.contains("rv")) return;
      const sibs = Array.from(el.parentElement.children).filter((c) => c.matches(RV));
      el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * 70 + "ms");
      el.classList.add("rv"); rvIO.observe(el);
    });
  }
  if (rvIO) new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && scanReveal(n)))).observe(document.body, { childList: true, subtree: true });

  const topBar = $(".top"), bar = document.createElement("div");
  bar.className = "progress"; document.body.appendChild(bar);
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    topBar.classList.toggle("scrolled", y > 12);
    document.documentElement.classList.toggle("past-hero", y > 650); // fasta knappen visas först när hero-knapparna är ur bild
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Liten puls på totalpriset när det ändras
  let lastGrand = "";
  new MutationObserver(() => {
    const g = $("#calc-summary .grand span:last-child"); if (!g || reduce) return;
    if (g.textContent !== lastGrand) { if (lastGrand) g.animate([{ color: "#A8E0B8" }, { color: "#fff" }], { duration: 600, easing: "ease-out" }); lastGrand = g.textContent; }
  }).observe($("#calc-summary"), { childList: true });

  const motionBtns = $$("[data-motion-toggle]");
  const setMotion = (paused, save) => {
    document.documentElement.classList.toggle("no-motion", paused);
    motionBtns.forEach((b) => { b.setAttribute("aria-pressed", paused); b.textContent = paused ? "Starta rörelse" : "Pausa rörelse"; });
    if (paused) $$(".rv").forEach((el) => el.classList.add("in"));
    if (save) try { localStorage.setItem("pausaRorelse", paused ? "1" : "0"); } catch {}
  };
  let savedPause = false; try { savedPause = localStorage.getItem("pausaRorelse") === "1"; } catch {}
  setMotion(savedPause || reduce, false);
  motionBtns.forEach((b) => b.addEventListener("click", () => setMotion(!document.documentElement.classList.contains("no-motion"), true)));

  renderCalc(false); renderForm(); route(); scanReveal();

  /* ---------- Google: strukturerad data ---------- */
  const DAYS = { "mån": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "lör": ["Saturday"], "sön": ["Sunday"] };
  const ld = {
    "@context": "https://schema.org", "@type": "HouseCleaningService", name: S.name, description: S.tagline,
    telephone: S.phone, email: S.email, priceRange: `från ${trialPrice}`,
    openingHoursSpecification: S.hours.filter(([, h]) => /\d/.test(h)).map(([d, h]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[d.toLowerCase().slice(0, 3)] || [], opens: h.split("–")[0].padStart(2, "0") + ":00", closes: h.split("–")[1].padStart(2, "0") + ":00" })), address: { "@type": "PostalAddress", streetAddress: S.address.split(",")[0], addressLocality: S.address.split(",")[1]?.trim(), addressCountry: "SE" },
    geo: { "@type": "GeoCoordinates", latitude: S.map.lat, longitude: S.map.lon }, areaServed: S.area,
    sameAs: [S.instagram.url, S.facebook.url],
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Städtjänster", itemListElement: S.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.desc } })) }
  };
  // Betyg läggs bara in när recensionerna är kundens egna och verifierade
  if (!S.demo && ratingStat) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: ratingStat.value, bestRating: 5, reviewCount: S.reviews.length };
  const sc = document.createElement("script"); sc.type = "application/ld+json"; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc);
})();
