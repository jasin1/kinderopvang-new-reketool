# Kinderopvang Rekentool

Prijscalculator voor kinderopvang. Ouders selecteren opvangtype, tarief en dagen, en krijgen direct een maandprijs berekend.

Live op: [mijn-kinderopvang.nl](https://mijn-kinderopvang.nl) (rekentool pagina)

---

## Hoe het werkt

### Voor ouders (eindgebruikers)
1. Kies type opvang (VSO, NSO, BSO, KDV)
2. Kies tarief/pakket
3. Kies dagen
4. Zie de berekende maandprijs
5. Optioneel: verstuur offerte naar jezelf

### Voor de eigenaar (prijzen aanpassen)
1. Log in op Webflow
2. Ga naar CMS → Tarieven
3. Klik op het opvangtype dat je wilt aanpassen
4. Pas de prijs aan
5. Klik Save, dan Publish

Dat is alles. De rekentool gebruikt automatisch de nieuwe prijzen.

---

## Technische opzet

### Onderdelen

| Onderdeel | Waar | Wat het doet |
|-----------|------|--------------|
| Webflow | Website + CMS | Hosting, formulier, prijsdata opslag |
| GitHub | Deze repo | JavaScript code |
| jsDelivr | CDN | Serveert de JS file naar de website |

### Dataflow
```
Eigenaar past prijs aan in Webflow CMS
            ↓
Webflow publiceert site
            ↓
Hidden HTML elementen bevatten nieuwe prijzen
            ↓
JavaScript leest prijzen uit bij page load
            ↓
Calculator gebruikt actuele prijzen
```

---

## Code structuur

Het bestand `rekentool-new.js` is opgebouwd uit 6 blokken:

| Blok | Regels | Functie |
|------|--------|---------|
| CONFIG | Bovenaan | Alle uren, dagen, kortingsregels (hardcoded) |
| CMS DATA LOADER | Na CONFIG | Leest prijzen uit Webflow CMS |
| CALCULATOR | Midden | Pure rekenfuncties |
| STATE | Na Calculator | Houdt gebruikersselecties bij |
| UI CONTROLLER | Groot blok | Alle DOM interactie |
| INIT | Onderaan | Start alles op |

### Wat staat waar?

**In de code (verandert zelden):**
- Uren per dag per opvangtype
- Kortingsregels (5-dagen KDV korting)
- Dagen van de week

**In Webflow CMS (verandert jaarlijks):**
- Tariefprijzen
- Tariefbeschrijvingen

---

## Webflow CMS structuur

### Collection: Tarieven

| Veld | Type | Voorbeeld |
|------|------|-----------|
| Name | Text | `dag` |
| Slug | Auto | `dag` |
| Tarief 1 prijs | Number (2 decimalen) | `11.70` |
| Tarief 1 beschrijving | Text | `KDV halve dagopvang (6 uur p/d)` |
| Tarief 2 prijs | Number | `11.45` |
| Tarief 2 beschrijving | Text | `KDV hele dagopvang (12 uur p/d)` |
| Tarief 3 prijs | Number | `13.50` (alleen BSO) |
| Tarief 3 beschrijving | Text | `Alleen vakantieopvang` |

### Items in de collection

| Name (Slug) | Opvangtype |
|-------------|------------|
| `voorschoolse` | Voorschoolse opvang (VSO) |
| `naschoolse` | Naschoolse opvang (NSO) |
| `buitenschoolse` | Buitenschoolse opvang (BSO) |
| `dag` | Kinderdagverblijf (KDV) |

**Let op:** De slugs moeten exact matchen met de code. Niet aanpassen.

---

## Webflow pagina setup

Op de rekentool pagina staat een **hidden Collection List**:

- Class: `cms-tarieven-data`
- Display: none
- Bevat voor elk tarief een div met class `cms-tarief-item`
- Data-attributen gekoppeld aan CMS velden:
  - `data-naam` → Slug
  - `data-prijs1` → Tarief 1 prijs
  - `data-beschrijving1` → Tarief 1 beschrijving
  - `data-prijs2` → Tarief 2 prijs
  - `data-beschrijving2` → Tarief 2 beschrijving
  - `data-prijs3` → Tarief 3 prijs
  - `data-beschrijving3` → Tarief 3 beschrijving

---

## Deployment

### Hoe de koppeling werkt

Webflow laadt de JavaScript via een script tag in de body:
```html
<script src="https://cdn.jsdelivr.net/gh/[username]/kinderopvang-new-reketool@[commit-hash]/rekentool-new.js"></script>
```

jsDelivr serveert het bestand direct vanaf GitHub.

### Code updaten (voor developers)

1. Maak wijzigingen in `rekentool-new.js`
2. Commit en push naar GitHub
3. Kopieer de nieuwe commit hash
4. Update de script tag in Webflow (Site Settings → Custom Code)
5. Publish in Webflow

### Huidige live versie

**Commit:** `aeadbd3`

---

## Businesslogica

### Opvangtypen

| Type | Afkorting | Doelgroep |
|------|-----------|-----------|
| Voorschoolse opvang | VSO | Voor schooltijd |
| Naschoolse opvang | NSO | Na schooltijd |
| Buitenschoolse opvang | BSO | Voor + na + vakanties |
| Kinderdagverblijf | KDV | Hele dag, 0-4 jaar |

### Tariefvarianten

Elk opvangtype heeft 2-3 tarieven:
- Met of zonder vakantieopvang
- Halve of hele dag (bij KDV)
- Alleen vakantieopvang (bij BSO)

### Berekening
```
Maandprijs = Uren per maand × Tarief per uur
```

Uren per maand = som van uren per dag voor geselecteerde dagen.

### Korting: 5-dagen KDV

Bij KDV hele dagopvang (tarief 2), als alle 5 dagen geselecteerd:
- Normaal: 260 uur (5 × 52)
- Korting: 30 uur gratis
- Facturabel: 230 uur

Dit is een commerciële actie, hardcoded in de calculator.

---

## Veelgestelde vragen

### Prijzen kloppen niet op de site
1. Check of je hebt gepublisht in Webflow (niet alleen Save, ook Publish)
2. Hard refresh de pagina (Ctrl+Shift+R)
3. Check of CMS items op "Published" staan, niet "Draft"

### Ik wil een nieuw opvangtype toevoegen
Dit vereist code-aanpassingen. Neem contact op met een developer.

### Ik wil de uren per dag aanpassen
Dit staat in de JavaScript code, niet in CMS. Neem contact op met een developer.

### De korting werkt niet
De 5-dagen korting werkt alleen bij:
- Opvangtype: Kinderdagverblijf
- Tarief: Hele dagopvang (tarief 2)
- Dagen: Alle 5 dagen geselecteerd

---

## Contact

Voor technische vragen of aanpassingen: [jouw contactgegevens of verwijzen naar wie het overneemt]

---

## Versiegeschiedenis

| Datum | Commit | Wijziging |
|-------|--------|-----------|
| Jan 2025 | `aeadbd3` | CMS koppeling toegevoegd |
| Jan 2025 | `f699e94` | Prijzen geupdate, 5-dagen bug gefixed |
| 2022 | - | Eerste versie |