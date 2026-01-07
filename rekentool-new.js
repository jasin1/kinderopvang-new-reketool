// ============================================
// CONFIG
// Alle tarieven, uren en kortingsregels.
// Dit is de ENIGE plek waar prijzen staan.
// Bij prijswijziging: alleen hier aanpassen.
// ============================================

const CONFIG ={
        // De 4 opvangtypen met hun tarieven
    opvangTypen: {
        
        // VSO - Voorschoolse opvang (voor schooltijd)
        voorschoolse: {
            naam: "voorschoolse",
            tarieven: [
                {
                    id: 1,
                    tarief: 10.60,
                    beschrijving: "VSO zonder vakantie opvang",
                    // Uren per maand: [maandag, dinsdag, woensdag, donderdag, vrijdag]
                    urenPerDag: [6.67, 6.67, 6.67, 6.67, 6.67]
                },
                {
                    id: 2,
                    tarief: 10.35,
                    beschrijving: "VSO geheel opvang met vakantieopvang",
                    urenPerDag: [18.67, 18.67, 18.67, 18.67, 18.67]
                }
            ]
        },

        // NSO - Naschoolse opvang (na schooltijd)
        naschoolse: {
            naam: "naschoolse",
            tarieven: [
                {
                    id: 1,
                    tarief: 10.60,
                    beschrijving: "NSO zonder vakantie opvang",
                    // Let op: woensdag heeft meer uren (langere middag)
                    urenPerDag: [16.67, 16.67, 23.33, 16.67, 16.67]
                },
                {
                    id: 2,
                    tarief: 10.35,
                    beschrijving: "NSO geheel opvang met vakantieopvang",
                    urenPerDag: [28.67, 28.67, 35.33, 28.67, 28.67]
                }
            ]
        },

        // BSO - Buitenschoolse opvang (voor + na + vakanties)
        buitenschoolse: {
            naam: "buitenschoolse",
            tarieven: [
                {
                    id: 1,
                    tarief: 10.25,
                    beschrijving: "BSO met vakantieopvang",
                    urenPerDag: [35.33, 35.33, 42, 35.33, 35.33]
                },
                {
                    id: 2,
                    tarief: 10.50,
                    beschrijving: "BSO zonder vakantieopvang",
                    urenPerDag: [23.33, 23.33, 30, 23.33, 23.33]
                },
                {
                    id: 3,
                    tarief: 13.50,
                    beschrijving: "Alleen vakantieopvang",
                    urenPerDag: [12, 12, 12, 12, 12]
                }
            ]
        },

        // KDV - Kinderdagverblijf (hele dag, 0-4 jaar)
        dag: {
            naam: "dag",
            tarieven: [
                {
                    id: 1,
                    tarief: 11.70,
                    beschrijving: "KDV halve dagopvang (6 uur p/d)",
                    urenPerDag: [26, 26, 26, 26, 26]
                },
                {
                    id: 2,
                    tarief: 11.45,
                    beschrijving: "KDV hele dagopvang (12 uur p/d)",
                    urenPerDag: [52, 52, 52, 52, 52]
                }
            ]
        }
    },

    // Kortingsregels
    // Deze worden automatisch toegepast als aan de voorwaarden is voldaan
    kortingen: [
        {
            // 5 dagen KDV hele dag = 30 uur gratis
            naam: "5-dagen KDV korting",
            // Wanneer van toepassing:
            opvangType: "dag",
            tariefId: 2,
            triggerUren: 260,           // 5 dagen × 52 uur
            // Wat is de korting:
            kortingUren: 30,            // 30 uur gratis
            // Tekst voor op de pagina:
            uitlegTekst: "U krijgt een halve dag gratis van ons bij dit gekozen opvang pakket. Normaliter {totaalUren} uur maar u ontvangt {kortingUren} uur korting. Wat u moet doorgeven aan de belastingdienst is: {nettoUren} × €{tarief} = €{nettoKosten} per maand voor 5 hele dagen!"
        }
    ],

    // Dagen mapping (voor weergave en formulier)
    dagen: ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag"]
}


// ============================================
// CALCULATOR
// Pure functies voor alle berekeningen.
// Deze functies weten NIKS van de DOM.
// Input: getallen en objecten
// Output: getallen en objecten
// ============================================

/**
 * Haalt tariefdata op uit CONFIG
 * @param {string} opvangType - bv "dag", "voorschoolse"
 * @param {number} tariefId - 1, 2, of 3
 * @returns {object|null} - het tarief object of null als niet gevonden
 */
function haalTariefOp(opvangType, tariefId) {
    const opvang = CONFIG.opvangTypen[opvangType];
    if (!opvang) return null;
    
    return opvang.tarieven.find(t => t.id === tariefId) || null;
}

/**
 * Berekent totaal aantal uren per maand
 * @param {object} tariefData - het tarief object met urenPerDag array
 * @param {number[]} geselecteerdeDagen - indices van gekozen dagen [0=ma, 1=di, ...]
 * @returns {number} - totaal uren
 */
function berekenUren(tariefData, geselecteerdeDagen) {
    let totaal = 0;
    
    for (const dagIndex of geselecteerdeDagen) {
        totaal += tariefData.urenPerDag[dagIndex];
    }
    
    return totaal;
}

/**
 * Berekent kosten (simpele vermenigvuldiging)
 * @param {number} uren 
 * @param {number} tarief 
 * @returns {number}
 */
function berekenKosten(uren, tarief) {
    return uren * tarief;
}

/**
 * Zoekt of er een korting van toepassing is
 * @param {string} opvangType 
 * @param {number} tariefId 
 * @param {number} totaalUren 
 * @returns {object|null} - de korting of null
 */
function zoekKorting(opvangType, tariefId, totaalUren) {
    return CONFIG.kortingen.find(k => 
        k.opvangType === opvangType && 
        k.tariefId === tariefId && 
        k.triggerUren === totaalUren
    ) || null;
}

/**
 * Genereert kortingstekst door placeholders te vervangen
 * @param {object} korting - de korting uit CONFIG
 * @param {object} waardes - de waardes om in te vullen
 * @returns {string}
 */
function genereerKortingsTekst(korting, waardes) {
    return korting.uitlegTekst
        .replace("{totaalUren}", waardes.totaalUren)
        .replace("{kortingUren}", waardes.kortingUren)
        .replace("{nettoUren}", waardes.nettoUren)
        .replace("{tarief}", waardes.tarief.toFixed(2).replace(".", ","))
        .replace("{nettoKosten}", waardes.nettoKosten.toFixed(2).replace(".", ","));
}

/**
 * Hoofdfunctie: berekent het volledige resultaat
 * @param {string} opvangType - bv "dag"
 * @param {number} tariefId - bv 2
 * @param {number[]} geselecteerdeDagen - bv [0,1,2,3,4] voor alle dagen
 * @returns {object} - compleet resultaat voor de UI
 */
function berekenResultaat(opvangType, tariefId, geselecteerdeDagen) {
    // Haal tariefdata op
    const tariefData = haalTariefOp(opvangType, tariefId);
    if (!tariefData) {
        return { error: "Tarief niet gevonden" };
    }
    
    // Bereken uren
    const totaalUren = berekenUren(tariefData, geselecteerdeDagen);
    
    // Check korting
    const korting = zoekKorting(opvangType, tariefId, totaalUren);
    
    // Bereken kosten (met of zonder korting)
    let nettoUren = totaalUren;
    let kortingsTekst = "";
    
    if (korting) {
        nettoUren = totaalUren - korting.kortingUren;
        kortingsTekst = genereerKortingsTekst(korting, {
            totaalUren: totaalUren,
            kortingUren: korting.kortingUren,
            nettoUren: nettoUren,
            tarief: tariefData.tarief,
            nettoKosten: berekenKosten(nettoUren, tariefData.tarief)
        });
    }
    
    const totaalKosten = berekenKosten(nettoUren, tariefData.tarief);
    
    // Zet gekozen dagen om naar namen voor weergave
    const dagenNamen = geselecteerdeDagen.map(i => CONFIG.dagen[i]);
    
    // Return alles wat de UI nodig heeft
    return {
        opvangType: opvangType,
        beschrijving: tariefData.beschrijving,
        tarief: tariefData.tarief,
        dagen: dagenNamen,
        totaalUren: totaalUren,
        nettoUren: nettoUren,
        totaalKosten: totaalKosten,
        heeftKorting: korting !== null,
        kortingsTekst: kortingsTekst
    };
}


// ============================================
// STATE
// Houdt bij wat de gebruiker heeft geselecteerd.
// Dit is de enige plek waar selecties worden opgeslagen.
// ============================================

const STATE = {
    opvangType: null,        // "dag", "voorschoolse", "naschoolse", "buitenschoolse"
    tariefId: null,          // 1, 2, of 3
    geselecteerdeDagen: []   // indices: 0=maandag, 1=dinsdag, etc.
};

/**
 * Reset state naar beginwaarden
 */
function resetState() {
    STATE.opvangType = null;
    STATE.tariefId = null;
    STATE.geselecteerdeDagen = [];
}

/**
 * Reset alleen de dagen (bij wisselen van tarief)
 */
function resetDagen() {
    STATE.geselecteerdeDagen = [];
}

/**
 * Voeg een dag toe of verwijder hem (toggle)
 * @param {number} dagIndex - 0=maandag, 1=dinsdag, etc.
 */
function toggleDag(dagIndex) {
    const index = STATE.geselecteerdeDagen.indexOf(dagIndex);
    
    if (index === -1) {
        // Dag zit er nog niet in, toevoegen
        STATE.geselecteerdeDagen.push(dagIndex);
    } else {
        // Dag zit er al in, verwijderen
        STATE.geselecteerdeDagen.splice(index, 1);
    }
}

/**
 * Check of we genoeg info hebben om te berekenen
 * @returns {boolean}
 */
function staatKlaarVoorBerekening() {
    return (
        STATE.opvangType !== null &&
        STATE.tariefId !== null &&
        STATE.geselecteerdeDagen.length > 0
    );
}

