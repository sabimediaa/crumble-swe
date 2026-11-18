# Granskning mot Sabi Medias riktlinjer

Exempelstäd har granskats mot Sabi Medias övergripande prompt (UI, UX, responsivitet, WCAG 2.2, CRO, SEO, prestanda och teknisk kvalitet). Inga nya funktioner har lagts till. Det som bröt mot riktlinjerna är rättat, och det som inte går att lösa i en statisk demo står under **Kvar före lansering**.

## Rättat i den här omgången

| Område | Problem | Åtgärd |
|---|---|---|
| Förtroende (7) | Recensioner, siffror, avtal och betyg är påhittade men såg äkta ut | `demo: true` i `js/data.js` visar en gul demo-remsa överst. Betygs-schemat skickas inte till Google så länge sidan är en demo |
| Formulär (11) | Tack-sidan sa "En bekräftelse har skickats" trots att inget skickades | I demo-läge står det nu tydligt att inget skickades, och mejlet visas bara som förhandsvisning |
| Formulär (11) | Inget spamskydd | Honeypot-fält som stoppar enkla botar |
| AI-mönster (12) | Animerade gradienter på sex ytor, glaseffekt i menyn, 40 px rundning, glans på knappar, parallax, glittrande stjärnor, pulserande prick, rullande remsa | Gradient bara i hero och provstädning. Solid meny. Radier 10/16/24 px. Effekterna är borttagna, och remsan är ersatt med en statisk förtroenderad |
| Animationer (6.6) | Hero-texten tonades in, vilket fördröjer LCP | Hero syns direkt. Kvar finns bara korta intoningar, sidbyte och hover/aktiv-feedback |
| Hierarki (3.1) | Samma siffror visades två gånger direkt efter varandra | Siffrorna finns bara i sin egen sektion |
| CTA (4.3) | Fasta "Räkna pris"-knappen på mobil låg över hero-knappen med samma text | Den visas först när hero-knapparna har scrollats ur bild |
| Navigation (4.2) | På mobil låg menyvalen i en sidoscroll där "Referenser", "Om oss" och "Kontakt" var dolda | Alla sex syns direkt (3×2 på mobil). Menyn är inte fast på små skärmar |
| Spacing/färg (3.3–3.4) | Ingen gemensam skala | Tokens för spacing (4–96 px), radier och status (success/warning/error) |
| Kalkyl | "Vi städar här" var hårdkodat till postnummer som börjar på 1 | Styrs av `serviceZipPrefixes` i `data.js` |
| SEO (10) | Saknade canonical, robots.txt och sitemap. Öppettiderna i schemat saknade veckodagar | Lagt till canonical, `og:url`, `robots.txt`, `sitemap.xml` och korrekt `dayOfWeek` |

## Redan uppfyllt

- **5-sekundersprincipen:** rubriken säger vad företaget gör, texten säger värdet (fast städare, material ingår, RUT), och det finns en primär CTA (Räkna ut ditt pris) och en sekundär (Boka provstädning).
- **Bransch (8):** tjänster med vad som ingår, transparent prislogik, verksamhetsområde, offert-, bokning- och ring-upp-formulär, recensioner, öppettider och karta.
- **Feedback (4.5):** laddningstext på skicka-knappen, fel per fält, tydligt fel vid nätverksproblem, tom sökning ger förslag och pris uppdateras direkt.
- **Tillgänglighet (6):** se README. Kontrast, fokus, tangentbord, skärmläsare, formulär och rörelse är genomgångna.
- **Responsivt (5):** ingen horisontell scroll på 375 px eller 800 px på någon sida.

## Kvar före lansering

Det här går inte att lösa i en statisk demo eller kräver kunden:

1. **Riktigt innehåll.** Byt ut alla recensioner, siffror, kollektivavtal, miljömärkning, adress och priser mot kundens verifierade uppgifter och sätt `demo: false`. Riktlinjerna förbjuder att publicera påhittade påståenden.
2. **Formulär som skickar på riktigt.** Koppla `formEndpoint` till en e-posttjänst (t.ex. Formspree eller Web3Forms) med autosvar, validering på serversidan och bättre spamskydd (t.ex. Turnstile). Testa ett riktigt utskick.
3. **Integritetspolicy.** Samtyckesrutan säger att uppgifter sparas, så det behövs en sida med integritetspolicy (GDPR) och en länk till den från formulären och sidfoten.
4. **Separata sidor för SEO.** Sidan är i dag en enda URL med `#`-länkar, och Google indexerar bara startsidan. För att varje tjänst ska kunna ranka behövs riktiga sidor (`/hemstadning`, `/flyttstadning` …) med egen titel och beskrivning.
5. **Riktiga bilder.** Byt illustrationerna mot kundens egna foton i WebP/AVIF med `width`/`height` och `loading="lazy"`.
6. **Mobile-first i CSS.** Layouten är testad separat på mobil, men CSS:en är skriven med `max-width`-brytpunkter. Vid en större ombyggnad bör den skrivas om mobile-first med `min-width`.
7. **Prestanda.** Mät med PageSpeed Insights när sidan ligger på riktig server. Överväg att lägga typsnitten lokalt och slå ihop och minifiera de tre CSS-filerna.
8. **Domän.** Byt `https://www.exempelstad.se/` i `index.html`, `robots.txt` och `sitemap.xml`.
9. **Test.** Testa med axe DevTools, VoiceOver/TalkBack och på riktiga telefoner.
