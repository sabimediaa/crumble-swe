# Exempelstäd – demo-hemsida för lokalvård

Exempelhemsida för ett städföretag. Strukturen följer Kakbageriet Demo och stilen är ljus och modern: vit grund, marinblått, mjuka grön-blå paneler och tunna serif-rubriker och innehåller allt i paketet **Business**.

## Sidor

| Sida | Innehåll |
|---|---|
| `#hem` | Erbjudanden, siffror (år, kunder, anställda, Reco-betyg), "Därför väljer 1000+ hushåll oss", tjänster, så funkar det, recensioner med knappen "Bli nästa nöjda kund", provstädning, öppettider och kontor |
| `#tjanster` | Hemstädning, kontorsstädning, flyttstädning och fönsterputs med vad som ingår |
| `#pris` | Priskalkyl i fem steg med pris före och efter RUT |
| `#referenser` | Galleri med referensprojekt (filter per tjänst) och alla recensioner |
| `#om-oss` | Om företaget, värderingar, personalens rättigheter, karta till kontoret och vanliga frågor |
| `#kontakt` | Formulär för offert, provstädning, "ring upp mig" och kontakt, plus Instagram och Facebook |

Det finns även en **sökfunktion** (knappen Sök, eller tangenten `/` och Cmd/Ctrl+K) som söker i tjänster, priser, öppettider, frågor och sidor.

## Ändra innehåll

Allt innehåll ligger i `js/data.js`: namn, telefon, öppettider, kontor (`office.hasOffice: false` döljer kartan), timpris för provstädning, tjänster och priser, recensioner, referensprojekt, personalens rättigheter och FAQ. Färgerna ligger överst i `css/style.css`.

Referensbilderna är illustrationer. Lägg in riktiga bilder genom att ge ett projekt `img: "bilder/kok.jpg"`.

## Automatiska mejl

Formulären fungerar i demo-läge (visar tack-sida och hur bekräftelsemejlet ser ut). För att skicka på riktigt: skapa ett formulär hos t.ex. Formspree eller Web3Forms, aktivera autosvar där och klistra in adressen i `formEndpoint` i `js/data.js`.

## Google

Sidan har titel, beskrivning, Open Graph och strukturerad data (`HouseCleaningService` med öppettider, betyg och tjänster) som Google kan läsa.

## Köra lokalt

```
python3 -m http.server 8000
```

Gå sedan till http://localhost:8000.

Alla företagsuppgifter, recensioner och siffror är påhittade exempel.

## Tillgänglighet

Sidan följer WCAG 2.2 nivå AA så långt det går att kontrollera utan ett externt testverktyg:

- **Tangentbord:** "Hoppa till innehållet"-länk, tydlig fokusring på allt klickbart (även på mörka ytor), och vid sidbyte flyttas fokus till sidans rubrik. Fokus hamnar aldrig bakom den fasta menyn.
- **Skärmläsare:** landmärken (header, nav, main, footer), aktiv sida markeras med `aria-current`, betyg läses som "Betyg 5 av 5", dekorativa bilder och pilar döljs, länkar som öppnas i ny flik säger det, sökningen läser upp antal träffar och priskalkylen läser upp priset.
- **Formulär:** alla fält har etiketter och obligatoriska fält markeras med stjärna. Vid fel får varje fält sitt eget felmeddelande (`aria-invalid` och `aria-describedby`), en sammanfattning läses upp och fokus flyttas till första felet. Efter skickat flyttas fokus till tack-texten.
- **Kontrast:** all text har minst 4,5:1 mot bakgrunden (stora rubriker minst 3:1). Valda knappar visar en bock, så valet syns inte bara med färg.
- **Rörelse:** knappen "Pausa rörelse" (i remsan och i sidfoten) stoppar alla animationer och sparas för besökaren. Den som valt "minska rörelse" i systemet får inga animationer.
- **Övrigt:** klickytor är minst 44 px, sidan fungerar i Windows högkontrastläge, går att zooma och visar kontaktuppgifter om JavaScript är avstängt.

Tillgänglighetsreglerna ligger i `css/a11y.css`. Testa gärna med VoiceOver (Cmd+F5 på Mac) och med [axe DevTools](https://www.deque.com/axe/devtools/) innan sidan publiceras.
