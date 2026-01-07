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

// ============================================
// UI CONTROLLER
// Alles wat met de DOM communiceert.
// Event handlers, tonen/verbergen, waardes invullen.
// ============================================

// DOM element references - worden gevuld bij init
const DOM = {
    // Secties
    tarievenSectie: null,
    dagenSectie: null,
    overzichtSectie: null,
    
    // Knoppen
    berekenKnop: null,
    berekenDimKnop: null,
    terugKnop: null,
    
    // Opvang selectie
    opvangSelectie: null,
    
    // Tarief selectie
    tariefSelectie: null,
    tariefRadios: null,
    derdeOptie: null,
    
    // Dag checkboxes
    dagCheckboxes: null,
    
    // Output velden (zichtbaar)
    outputTarief: null,
    outputDagen: null,
    outputUren: null,
    outputKosten: null,
    outputOpvang: null,
    outputExtra: null,
    
    // Hidden form fields (voor verzending)
    sendTarief: null,
    sendTotaal: null,
    sendDagen: null,
    sendOpvang: null,
    sendUren: null,
    sendKorting: null
};

/**
 * Vult alle DOM references in
 * Wordt eenmalig aangeroepen bij init
 */
function cacheDOMElementen() {
    // Secties
    DOM.tarievenSectie = document.querySelector(".tarieven");
    DOM.dagenSectie = document.querySelector(".dagen");
    DOM.overzichtSectie = document.querySelector(".rk-overzicht-wrapper");
    
    // Knoppen
    DOM.berekenKnop = document.querySelector(".reken_btn");
    DOM.berekenDimKnop = document.querySelector(".reken_dim_btn");
    DOM.terugKnop = document.querySelector(".back_btn");
    
    // Opvang selectie
    DOM.opvangSelectie = document.querySelector(".opvang-select");
    
    // Tarief selectie
    DOM.tariefSelectie = document.querySelector(".tarief-select");
    DOM.tariefRadios = document.querySelectorAll(".radio_tarief");
    DOM.derdeOptie = document.getElementById("derde");
    
    // Dag checkboxes
    DOM.dagCheckboxes = document.querySelectorAll(".checks");
    
    // Output velden (zichtbaar)
    DOM.outputTarief = document.querySelector(".overzicht_tarief");
    DOM.outputDagen = document.querySelector(".overzicht_dagen");
    DOM.outputUren = document.querySelector(".overzicht_uren_totaal");
    DOM.outputKosten = document.querySelector(".overzicht_kosten_totaal");
    DOM.outputOpvang = document.querySelector(".overzicht_opvang_txt");
    DOM.outputExtra = document.querySelector(".extra_txt");
    
    // Hidden form fields
    DOM.sendTarief = document.getElementById("send-tarief");
    DOM.sendTotaal = document.getElementById("send-totaal");
    DOM.sendDagen = document.getElementById("send-dagen");
    DOM.sendOpvang = document.getElementById("send-opvang");
    DOM.sendUren = document.getElementById("send-uren");
    DOM.sendKorting = document.getElementById("korting-txt");
}

/**
 * Verberg een element
 */
function verberg(element) {
    if (element) element.style.display = "none";
}

/**
 * Toon een element
 */
function toon(element, displayType = "block") {
    if (element) element.style.display = displayType;
}

/**
 * Fade-in effect (optioneel, voor vloeiendere UI)
 */
function fadeIn(element, displayType = "block") {
    if (!element) return;
    element.style.opacity = "0";
    element.style.display = displayType;
    
    // Kleine timeout zodat display: block eerst wordt toegepast
    setTimeout(() => {
        element.style.transition = "opacity 0.25s ease";
        element.style.opacity = "1";
    }, 10);
}

/**
 * Zet UI in beginstaat
 */
function initUI() {
    verberg(DOM.tarievenSectie);
    verberg(DOM.dagenSectie);
    verberg(DOM.overzichtSectie);
    verberg(DOM.berekenKnop);
    verberg(DOM.terugKnop);
    toon(DOM.opvangSelectie);
    
    if (DOM.berekenDimKnop) toon(DOM.berekenDimKnop);
}

/**
 * Vult de tariefopties voor het gekozen opvangtype
 * @param {string} opvangType 
 */
function vulTariefOpties(opvangType) {
    const opvang = CONFIG.opvangTypen[opvangType];
    if (!opvang) return;
    
    const tarieven = opvang.tarieven;
    
    // Radio 1
    const radio1 = document.getElementById("radio_1");
    const label1Tarief = document.querySelector(".uur-tarief-1-html");
    const label1Desc = document.querySelector(".uur-descrp-1");
    if (radio1 && tarieven[0]) {
        radio1.value = tarieven[0].tarief;
        if (label1Tarief) label1Tarief.textContent = tarieven[0].tarief.toFixed(2).replace(".", ",");
        if (label1Desc) label1Desc.textContent = tarieven[0].beschrijving;
    }
    
    // Radio 2
    const radio2 = document.getElementById("radio_2");
    const label2Tarief = document.querySelector(".uur-tarief-2-html");
    const label2Desc = document.querySelector(".uur-descrp-2");
    if (radio2 && tarieven[1]) {
        radio2.value = tarieven[1].tarief;
        if (label2Tarief) label2Tarief.textContent = tarieven[1].tarief.toFixed(2).replace(".", ",");
        if (label2Desc) label2Desc.textContent = tarieven[1].beschrijving;
    }
    
    // Radio 3 (alleen bij BSO)
    const radio3 = document.getElementById("radio_3");
    const label3Tarief = document.querySelector(".uur-tarief-3-html");
    const label3Desc = document.querySelector(".uur-descrp-3");
    
    if (tarieven[2]) {
        // BSO heeft 3 tarieven
        toon(DOM.derdeOptie);
        if (radio3) {
            radio3.value = tarieven[2].tarief;
            if (label3Tarief) label3Tarief.textContent = tarieven[2].tarief.toFixed(2).replace(".", ",");
            if (label3Desc) label3Desc.textContent = tarieven[2].beschrijving;
        }
    } else {
        // Andere opvangtypen hebben 2 tarieven
        verberg(DOM.derdeOptie);
    }
}

/**
 * Formatteert een getal als Nederlandse prijs
 * @param {number} bedrag 
 * @returns {string} bv "2.633,50"
 */
function formateerPrijs(bedrag) {
    return bedrag.toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Toont het resultaat op de pagina en vult hidden fields
 * @param {object} resultaat - output van berekenResultaat()
 */
function toonResultaat(resultaat) {
    // Zichtbare output
    if (DOM.outputTarief) {
        DOM.outputTarief.innerHTML = "&euro; " + resultaat.tarief.toFixed(2).replace(".", ",");
    }
    
    if (DOM.outputDagen) {
        DOM.outputDagen.textContent = resultaat.dagen.join(", ");
    }
    
    if (DOM.outputUren) {
        DOM.outputUren.textContent = resultaat.totaalUren.toFixed(2).replace(".", ",");
    }
    
    if (DOM.outputKosten) {
        DOM.outputKosten.innerHTML = "&euro; " + formateerPrijs(resultaat.totaalKosten);
    }
    
    if (DOM.outputOpvang) {
        DOM.outputOpvang.textContent = resultaat.beschrijving;
    }
    
    // Extra tekst (korting uitleg of leeg)
    if (DOM.outputExtra) {
        DOM.outputExtra.innerHTML = resultaat.kortingsTekst || "";
    }
    
    // Hidden form fields voor verzending
    if (DOM.sendTarief) {
        DOM.sendTarief.value = "&euro; " + resultaat.tarief.toFixed(2).replace(".", ",");
    }
    
    if (DOM.sendTotaal) {
        DOM.sendTotaal.value = "&euro; " + formateerPrijs(resultaat.totaalKosten);
    }
    
    if (DOM.sendDagen) {
        DOM.sendDagen.value = resultaat.dagen.join(", ");
    }
    
    if (DOM.sendOpvang) {
        DOM.sendOpvang.value = resultaat.beschrijving;
    }
    
    if (DOM.sendUren) {
        DOM.sendUren.value = resultaat.nettoUren.toFixed(2).replace(".", ",");
    }
    
    if (DOM.sendKorting) {
        DOM.sendKorting.value = resultaat.kortingsTekst || "";
    }
    
    // Secties tonen/verbergen
    verberg(DOM.tarievenSectie);
    verberg(DOM.dagenSectie);
    verberg(DOM.opvangSelectie);
    verberg(DOM.berekenKnop);
    toon(DOM.terugKnop);
    fadeIn(DOM.overzichtSectie);
}

/**
 * Reset alle checkboxes
 */
function resetCheckboxes() {
    DOM.dagCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

/**
 * Reset alle radio buttons
 */
function resetRadios() {
    DOM.tariefRadios.forEach(radio => {
        radio.checked = false;
    });
    
    // Ook opvang radios resetten
    const opvangRadios = document.querySelectorAll(".check_opvang");
    opvangRadios.forEach(radio => {
        radio.checked = false;
    });
}

/**
 * Volledige reset - terug naar begin
 */
function resetAlles() {
    resetState();
    resetCheckboxes();
    resetRadios();
    initUI();
}

/**
 * Koppelt alle event listeners
 */
function koppelEventListeners() {
    
    // === Opvang selectie ===
    DOM.opvangSelectie.addEventListener("change", function(e) {
        if (e.target.type !== "radio") return;
        
        // Update state
        STATE.opvangType = e.target.value;
        STATE.tariefId = null;
        resetDagen();
        
        // Update UI
        resetCheckboxes();
        resetRadios();
        vulTariefOpties(STATE.opvangType);
        
        verberg(DOM.tariefSelectie);
        verberg(DOM.dagenSectie);
        fadeIn(DOM.tarievenSectie);
        
        setTimeout(() => {
            fadeIn(DOM.tariefSelectie);
        }, 120);
    });
    
    // === Tarief selectie ===
    DOM.tariefSelectie.addEventListener("change", function(e) {
        if (e.target.type !== "radio") return;
        
        // Bepaal welke tarief is geselecteerd (1, 2, of 3)
        if (e.target.id === "radio_1") STATE.tariefId = 1;
        else if (e.target.id === "radio_2") STATE.tariefId = 2;
        else if (e.target.id === "radio_3") STATE.tariefId = 3;
        
        // Reset dagen bij tarief wissel
        resetDagen();
        resetCheckboxes();
        
        // Update opvang beschrijving alvast
        const tariefData = haalTariefOp(STATE.opvangType, STATE.tariefId);
        if (tariefData && DOM.outputOpvang) {
            DOM.outputOpvang.textContent = tariefData.beschrijving;
        }
        
        // Toon dagen selectie
        fadeIn(DOM.dagenSectie);
    });
    
    // === Dag checkboxes ===
    DOM.dagCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", function() {
            // Toggle dag in state
            toggleDag(index);
            
            // Toon/verberg bereken knop
            if (STATE.geselecteerdeDagen.length > 0) {
                verberg(DOM.berekenDimKnop);
                fadeIn(DOM.berekenKnop);
            } else {
                verberg(DOM.berekenKnop);
                toon(DOM.berekenDimKnop);
            }
        });
    });
    
    // === Bereken knop ===
    DOM.berekenKnop.addEventListener("click", function() {
        if (!staatKlaarVoorBerekening()) return;
        
        // Bereken resultaat
        const resultaat = berekenResultaat(
            STATE.opvangType,
            STATE.tariefId,
            STATE.geselecteerdeDagen
        );
        
        // Toon resultaat
        toonResultaat(resultaat);
    });
    
    // === Terug knop ===
    DOM.terugKnop.addEventListener("click", function() {
        resetAlles();
    });
}

// ============================================
// INIT
// Startpunt van de applicatie.
// Wordt aangeroepen wanneer de pagina geladen is.
// ============================================

/**
 * Initialiseert de rekentool
 */
function init() {
    // 1. Cache alle DOM elementen
    cacheDOMElementen();
    
    // 2. Reset state naar beginwaarden
    resetState();
    
    // 3. Zet UI in beginstaat
    initUI();
    
    // 4. Koppel alle event listeners
    koppelEventListeners();
    
    console.log("Rekentool geïnitialiseerd");
}

// Start wanneer DOM geladen is
document.addEventListener("DOMContentLoaded", init);