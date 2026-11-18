# Färgkontrast – granskning enligt WCAG 2.2 AA

**Metod:** ett skript i webbläsaren läste de faktiskt renderade färgerna för varje synlig text och kontroll. Det räknade med genomskinlighet, `opacity` på föräldrar och alla färgstopp i gradienter (sämsta fallet gäller). Kontrasten beräknades med WCAG:s formel för relativ luminans.

**Omfattning:** alla sex sidor, alla fem steg i priskalkylen (även med RUT av), alla fyra formulärtyper, felläge och tack-läge, tjänstedialogen, sökning med och utan träffar, toast, demo-remsa och sidfot. Allt kontrollerades på desktop (800 px) och mobil (375 px).

Fokusringar testades med riktig Tab-tangent.

## Resultat

| | Desktop | Mobil |
|---|---|---|
| Kontrollerade kombinationer | 1 950 | 1 899 |
| Underkända efter åtgärd | **0** | **0** |
| Lägst uppmätt (text) | 5,04:1 (felsammanfattning, krav 4,5) | samma |

Skriptet larmade även om toast-rutan och den fasta mobilknappen. Båda var dolda (`opacity: 0`) vid mätningen. Synliga har de 17,35:1.

## Problem som hittades, före → efter

| Komponent | Färger före | Före | Efter | Krav |
|---|---|---|---|---|
| Kanter på inmatningsfält, listor och textrutor (alla formulär + postnummer) | `#E3ECF4` mot vitt | **1,20** | `#7C8597`: 3,71 (3,50 mot `--mist`) | 3:1 |
| Sökfältets underkant | `#E3ECF4` mot vitt | **1,20** | 3,71 | 3:1 |
| Switch för RUT, avstängt läge | `#E3ECF4` mot `#F4F9FD` | **1,1** | spår 3,50 mot bakgrund, knopp 3,71 mot spår | 3:1 |
| Betygsstjärnor | `#A86A00` mot vitt / `--mist` | **4,44 / 4,19** | `#8F5B00`: 5,73 / 5,41 | 4,5:1 |
| Avstängd knapp (Nästa, Gå vidare) | vitt på marinblått med opacity .45 | **4,30** | `#4A5565` på `#E6EAF0`: 6,26 | (undantaget, men ska vara begriplig) |
| Statusprick i hero | `#3BB273` mot vitt | **2,69** | `#17693F`: 6,71 | 3:1 |
| Understrykning på fristående länkar | `#E3ECF4` | 1,20 | 3,71 | (förbättring) |
| Kant på sekundära knappar | `#E3ECF4` | 1,20 | 3,71 | (förbättring) |
| Kalkylens stegmätare, ej klara steg | `#E3ECF4` | 1,20 | 3,71 | 3:1 |

Rättat i förra omgången och verifierat igen nu: etiketten "RUT-avdrag" gick från 3,83 till 5,91. Stjärnorna hade `#F2B634` med 1,82.

## Ändringar

- **Tre nya tokens** i `css/a11y.css`:
  - `--border-strong` är en mörkare variant av den befintliga kantfärgen.
  - `--disabled-bg` och `--disabled-fg` är tagna från befintliga gråtoner.
- `--gold` och `--ok` har mörknats inom samma färgton.
- Inga varumärkesfärger är bytta: marinblått, ljusblått, ljusgrönt och skogsgrönt finns kvar. Den ljusa kantfärgen `--line` används fortfarande för dekorativa avdelare på kort, där den inte bär någon information.

## Inte bara färg

| Information | Utöver färg |
|---|---|
| Fel i formulär | Text vid fältet, "!"-ikon och sammanfattning med antal fel |
| Lyckat skick | Bock-ikon och rubrik |
| Valda knappar (tjänster, filter, formulärtyp) | Bock "✓" före texten |
| Valt alternativ i kalkylen | Tjock kant och vit bakgrund |
| Aktuellt steg i kalkylen | Fet text. Klara steg får "✓" |
| Aktiv sida i menyn | Fylld knapp (17,35:1 mot vitt) och `aria-current` |
| Postnummer ok / ej ok | Text "✓ Vi städar i ditt område" eller förklarande mening |
| Obligatoriska fält | Stjärna och förklaring överst i formuläret |
| Betyg | Text "Betyg 5 av 5" för skärmläsare och siffran "4,8 av 5" synligt |

## Interaktiva tillstånd

Fokus mättes med riktig Tab-tangent. Hover, aktiv och avstängd kontrollerades mot CSS-värdena.

| Tillstånd | Uppmätt |
|---|---|
| Fokus: menylänkar, formulärflikar, fält | grön ring `#1F5A33`: 7,71–8,18 |
| Fokus: marinblå knappar | marinblå ring med vit spalt: 17,35 |
| Fokus: sidfot och sociala länkar (mörk yta) | ljusgrön ring `#7FD6A0`: 9,94 |
| Hover marinblå knapp | vitt på `#1B2380`: 13,14 |
| Hover fält och sekundära knappar | kanten blir marinblå: 4,68 mot normal kant |
| Avstängd knapp | text 6,26, kant 3,07 mot bakgrunden |
| Fel-läge fält | kant `#B4344A`: 5,95, feltext `#A12D40`: 7,08 |

## Kräver manuell kontroll

1. **Kartan (OpenStreetMap)** är tredjepartsinnehåll i en iframe, och dess färger kan inte styras.
2. **Riktiga foton:** när illustrationerna byts mot kundens bilder får ingen text ligga direkt på bilden utan en mörk överlagring. Kontrollera då med WebAIM.
3. **Hover-lägen** är kontrollerade mot CSS-värden, inte renderade med en riktig mus.
4. **Färgblindhet:** ingen information bärs bara av färg (se tabellen), men en simulering i Chrome DevTools (Rendering → Emulate vision deficiencies) bör göras.
5. **Mörkt läge** finns inte på sidan. Om det läggs till behöver allt kontrolleras igen.
6. **Verktyg:** kör Lighthouse, axe DevTools och WAVE innan lansering. Noll automatiska fel betyder inte full WCAG-efterlevnad.
