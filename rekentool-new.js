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