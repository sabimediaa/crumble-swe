/* All innehåll för sidan. Ändra här – inget annat behöver röras för att byta texter, priser eller kontaktuppgifter.
   Allt nedan är påhittade exempeluppgifter. */
window.SITE = {
  // demo: true visar en tydlig demo-remsa, stänger av betygs-schema för Google och
  // säger ärligt att formulären inte skickar något. Sätt till false när allt nedan är
  // ersatt med kundens egna, verifierade uppgifter (recensioner, siffror, avtal, priser).
  demo: true,
  name: "Exempelstäd",
  tagline: "Hemstädning, kontorsstädning, flyttstädning och fönsterputs i Staden",
  phone: "08-123 45 67",
  phoneHref: "+4681234567",
  email: "hej@exempelstad.se",
  address: "Exempelgatan 12, 123 45 Staden",
  // Kartans position (lat, lon). Byt till företagets riktiga adress.
  map: { lat: 59.3326, lon: 18.0649, zoom: 14 },
  // Öppettider för telefon och kontor.
  hours: [
    ["Mån–fre", "07–18"],
    ["Lördag", "09–15"],
    ["Söndag", "Stängt"]
  ],
  // Postnummer som börjar med något av dessa räknas som "vi städar här" i kalkylen.
  serviceZipPrefixes: ["1"],
  area: "Staden med omnejd – Norrort, Söderort, Innerstan och Västerort",
  // Provstädning: timpris efter RUT-avdrag.
  trial: { pricePerHour: 229, minHours: 3, text: "Testa oss en gång utan bindningstid. Du betalar per timme och bestämmer sedan om du vill fortsätta." },

  // Har företaget ett kontor kunder kan besöka? Sätt hasOffice: false om ni bara jobbar ute hos kunder.
  office: {
    hasOffice: true,
    address: "Exempelgatan 12, 123 45 Staden",
    visiting: "Besök oss gärna – ring innan så att någon är på plats."
  },

  // Personalens villkor och rättigheter.
  staffRights: [
    { title: "Kollektivavtal", text: "Alla anställda omfattas av Almega Serviceentreprenadavtalet med lön, OB och semester enligt avtal." },
    { title: "Tjänstepension", text: "Avtalspension från första anställningsdagen." },
    { title: "Försäkringar", text: "Arbetsskade-, sjuk- och livförsäkring via kollektivavtalet." },
    { title: "Fasta tjänster", text: "Vi anställer i första hand på fast tjänst med schemalagd arbetstid." },
    { title: "Utbildning", text: "Betald introduktion, kemikalie- och ergonomiutbildning för alla." },
    { title: "Friskvård", text: "Friskvårdsbidrag och arbetskläder ingår." }
  ],

  instagram: { handle: "@exempelstad", url: "https://www.instagram.com/" },
  facebook: { handle: "Exempelstäd", url: "https://www.facebook.com/" },

  // Formulär: lägg in en adress från en formulärtjänst (t.ex. Formspree eller Web3Forms)
  // så skickas förfrågan och ett automatiskt bekräftelsemejl går ut. Tom = demo-läge.
  formEndpoint: "",

  reasonsTitle: "Därför väljer 1000+ hushåll oss",

  stats: [
    { value: 12, suffix: "", label: "år i branschen" },
    { value: 1200, suffix: "+", label: "aktiva kunder varje månad" },
    { value: 48, suffix: "", label: "medarbetare med kollektivavtal" },
    { value: 4.8, suffix: "", decimals: 1, label: "av 5 i snittbetyg på Reco" }
  ],

  offers: [
    { title: "Första städningen −25 %", text: "Gäller nya kunder som bokar återkommande hemstädning.", tag: "Nytt" },
    { title: "Flyttstädning med garanti", text: "Vi kommer tillbaka utan kostnad om besiktningen anmärker.", tag: "Populärt" },
    { title: "Fönsterputs på köpet", text: "Boka flyttstädning i oktober–november och få fönsterputs i ett rum.", tag: "Säsong" }
  ],

  reasons: [
    { icon: "shield", title: "Kvalitetsgaranti", text: "Är du inte nöjd kommer vi tillbaka och åtgärdar det inom 48 timmar – utan extra kostnad." },
    { icon: "bucket", title: "Städmaterial ingår", text: "Vi tar med miljömärkta medel, mikrofiberdukar och dammsugare. Du behöver inte köpa något." },
    { icon: "handshake", title: "Kollektivavtal", text: "Alla medarbetare är anställda med kollektivavtal, försäkring och schyssta villkor." },
    { icon: "person", title: "Samma städare", text: "Du får en fast städare som lär sig ditt hem. Är hen sjuk ordnar vi en ersättare." }
  ],

  // Prismodell för kalkylatorn. Priser före RUT, inkl. moms.
  // perSqm = kr per kvm och tillfälle, min = lägsta pris per tillfälle.
  services: [
    {
      id: "hemstad", icon: "home", name: "Hemstädning", short: "Återkommande städning varje vecka, varannan eller var fjärde vecka.",
      desc: "Vi dammar, dammsuger, våttorkar golv, rengör kök och badrum och tömmer soporna. Samma städare varje gång.",
      includes: ["Damning av fria ytor", "Dammsugning och våttorkning", "Kök: bänkar, spis och diskho", "Badrum: toalett, handfat, dusch", "Sopor och återvinning"],
      perSqm: 9, min: 690, rut: true, recurring: true
    },
    {
      id: "flyttstad", icon: "box", name: "Flyttstädning", short: "Godkänd besiktning eller så kommer vi tillbaka gratis.",
      desc: "Vi följer mäklarnas checklista: ugn, kyl, frys, fläkt, skåp, fönster och alla ytor. Garanti vid besiktning.",
      includes: ["Ugn, spis och fläkt", "Kyl och frys", "Insida av alla skåp och lådor", "Fönsterputs ingår", "Besiktningsgaranti"],
      perSqm: 32, min: 2900, rut: true, recurring: false
    },
    {
      id: "fonster", icon: "window", name: "Fönsterputs", short: "Skinande rena fönster in- och utsida, även spröjs.",
      desc: "Vi putsar in- och utsida, mellan glasen på kopplade fönster samt torkar karmar och fönsterbänkar.",
      includes: ["In- och utsida", "Mellan glasen", "Karmar och fönsterbänkar", "Balkongglas på begäran"],
      perWindow: 75, min: 595, rut: true, recurring: false
    },
    {
      id: "kontor", icon: "building", name: "Kontorsstädning", short: "Lokalvård för kontor, butiker och trapphus.",
      desc: "Ett fast schema anpassat efter era tider – före öppning, kvällar eller helger. Faktura varje månad.",
      includes: ["Skrivbord och arbetsytor", "Pentry och kaffemaskin", "Toaletter och förbrukningsmaterial", "Golv och entré", "Avtal med fast kontaktperson"],
      perSqm: 7, min: 990, rut: false, recurring: true
    }
  ],
  frequencies: [
    { id: "w1", label: "Varje vecka", note: "−15 %", factor: 0.85, perMonth: 4.33 },
    { id: "w2", label: "Varannan vecka", note: "−10 %", factor: 0.90, perMonth: 2.17 },
    { id: "w4", label: "Var fjärde vecka", note: "", factor: 1, perMonth: 1.08 },
    { id: "once", label: "En gång", note: "", factor: 1, perMonth: 0 }
  ],
  extras: [
    { id: "ugn", label: "Rengöring av ugn", price: 495 },
    { id: "kyl", label: "Kyl och frys", price: 395 },
    { id: "skap", label: "Insida av köksskåp", price: 595 },
    { id: "balkong", label: "Balkong eller altan", price: 395 },
    { id: "strykning", label: "Strykning (30 min)", price: 225 }
  ],

  reviews: [
    { name: "Anna L.", place: "Norrort", stars: 5, service: "Hemstädning", text: "Vi har haft samma städare i två år och hon vet precis hur vi vill ha det. Kommer hem till ett skinande hem varannan fredag." },
    { name: "Mikael S.", place: "Söderort", stars: 5, service: "Flyttstädning", text: "Besiktningen gick igenom utan en enda anmärkning. Snabb offert och de kom exakt när de sa." },
    { name: "Fatima H.", place: "Innerstan", stars: 5, service: "Hemstädning", text: "Bokade en provstädning inför julen och fortsatte sedan varannan vecka. Allt var rent. Kommer definitivt boka igen." },
    { name: "Johan & Sara", place: "Västerort", stars: 4, service: "Fönsterputs", text: "Prisvärt och smidigt. Fönstren har aldrig varit så rena – även mellan glasen." },
    { name: "Lena K.", place: "Staden", stars: 5, service: "Kontorsstädning", text: "Vårt kontor städas tre kvällar i veckan. Samma team varje gång och de fyller på allt i pentryt." },
    { name: "Ahmed R.", place: "Norrort", stars: 5, service: "Hemstädning", text: "Trevlig personal och tydliga priser med RUT direkt på fakturan. Rekommenderar varmt." }
  ],

  // Referensprojekt för galleriet. "scene" styr illustrationen – byt mot riktiga bilder (img: "bilder/kok.jpg").
  projects: [
    { title: "Kök efter flytt", service: "Flyttstädning", area: "Söderort", size: "3 rok, 78 kvm", scene: "kitchen", text: "Ugn, fläkt och alla skåp. Godkänd besiktning första gången." },
    { title: "Kontor, 40 platser", service: "Kontorsstädning", area: "Innerstan", size: "620 kvm", scene: "office", text: "Kvällsstäd tre dagar i veckan med fast team sedan 2022." },
    { title: "Badrum inför försäljning", service: "Flyttstädning", area: "Västerort", size: "Villa, 140 kvm", scene: "bath", text: "Avkalkning, fogar och glasdörrar inför visning." },
    { title: "Ljus etta i stan", service: "Hemstädning", area: "Innerstan", size: "1 rok, 34 kvm", scene: "living", text: "Varannan vecka, samma städare i över ett år." },
    { title: "Sekelskiftesfönster", service: "Fönsterputs", area: "Norrort", size: "14 fönster med spröjs", scene: "window", text: "In- och utsida samt mellan glasen." },
    { title: "Trapphus, BRF", service: "Kontorsstädning", area: "Söderort", size: "4 uppgångar", scene: "stairs", text: "Veckostäd av trapphus, tvättstuga och entréer." }
  ],

  about: {
    title: "Ett lokalt städföretag med fast personal",
    text: [
      "Exempelstäd startade 2014 med en städare och en bil. I dag är vi 48 anställda – alla med kollektivavtal, utbildning och försäkring.",
      "Vi tror att bra städning bygger på förtroende. Därför får du samma städare varje gång, tydliga priser och en garanti om något inte blir rätt."
    ],
    values: [
      { title: "Schyssta villkor", text: "Kollektivavtal, friskvård och fasta tjänster för alla medarbetare." },
      { title: "Miljömärkt", text: "Svanen-märkta medel och mikrofiber som minskar kemikalier och vatten." },
      { title: "Lokalt", text: "Vi städar bara i vårt område så att vi alltid hinner fram i tid." }
    ]
  },

  faq: [
    { q: "Hur fungerar RUT-avdraget?", a: "Du betalar bara halva arbetskostnaden. Vi drar av RUT direkt på fakturan och ansöker hos Skatteverket. Du behöver bara ange ditt personnummer vid bokning." },
    { q: "Behöver jag vara hemma när ni städar?", a: "Nej. Många kunder lämnar en nyckel som vi förvarar kodad och inlåst. Nyckelhantering ingår utan kostnad." },
    { q: "Vad händer om jag inte är nöjd?", a: "Hör av dig inom 48 timmar så kommer vi tillbaka och åtgärdar det utan extra kostnad. Det är vår kvalitetsgaranti." },
    { q: "Kan jag avboka eller pausa?", a: "Ja, avboka kostnadsfritt senast 24 timmar innan. Återkommande städning kan pausas när du vill, till exempel under semestern." },
    { q: "Är ni försäkrade?", a: "Ja, vi har ansvarsförsäkring och nyckelförsäkring. Skulle något gå sönder ersätts det." }
  ]
};
