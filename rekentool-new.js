
var soortopvang;
var tarief = '0';
var tarief_val_1;
var tarief_val_2;
var weekdag;
var dag_uren;
var gekozenopvang;
var eindOpvang;

// attribute waarde dag-uren
//var waar = $("#mon").attr('name');
/*
var maandag_check = $("#man").attr('add-value');
var dinsdag_check = $("#dins").attr('add-value');
var woensdag_check = $("#woe").attr('add-value');
var donderdag_check = $("#don").attr('add-value');
var vrijdag_check = $("#vrij").attr('add-value');
*/

var maandag_check = $("input[day='maandag']");
var dinsdag_check = $("input[day='dinsdag']");
var woensdag_check = $("input[day='woensdag']");
var donderdag_check = $("input[day='donderdag']");
var vrijdag_check = $("input[day='vrijdag']");


/*
var maandag_check = $("input[value='maandag']");
var dinsdag_check = $("input[value='dinsdag']");
var woensdag_check = $("input[value='woensdag']");
var donderdag_check = $("input[value='donderdag']");
var vrijdag_check = $("input[value='vrijdag']");
*/
//console.log(dinsdag_check);


// arrays
let selected_weekdagen = [];
let selected_uren = [];
let totaal_kosten = [];


// Hides
$(".tarieven").hide();
$(".dagen").hide();
$(".rk-overzicht-wrapper").hide();
$(".reken_btn").hide();
$(".back_btn").hide();
//$("#send-totaal").hide();
//$("#send-dagen").hide();

//let sum                 = 0;

//soort opvang objecten

//--------- object voorschoolse ---------------------------------------------------------------------

let voorschoolse_opvang = {
    naam: "voorschoolse",
    tarief_1:
        {
            tarief: '9.10',
            descrp: "VSO zonder vakantie opvang",
            maandag_uren: "6.67",
            dinsdag_uren: "6.67",
            woensdag_uren: "6.67",
            donderdag_uren: "6.67",
            vrijdag_uren: "6.67",

        },

    tarief_2:
        {
            tarief: '8.75',
            descrp: "VSO geheel opvang met vakantieopvang",
            maandag_uren: "18.67",
            dinsdag_uren: "18.67",
            woensdag_uren: "18.67",
            donderdag_uren: "18.67",
            vrijdag_uren: "18.67",
        },

    opvang_checker: function () {
        //if(soortopvang == this.naam){
        //console.log(this.naam + ' is geselecteerd');
        // dinsdag_check.attr("dag-uren",this.tarief_1.dinsdag_uren);
        $("#derde").hide();
        //tarief veranderen:
        $('#radio_1').val(voorschoolse_opvang.tarief_1.tarief);
        $('#radio_2').val(voorschoolse_opvang.tarief_2.tarief);


        $('.uur-tarief-1-html').html(voorschoolse_opvang.tarief_1.tarief);
        $('.uur-tarief-2-html').html(voorschoolse_opvang.tarief_2.tarief);
        //slogan veranderen:
        $('.uur-descrp-1').html(voorschoolse_opvang.tarief_1.descrp);
        $('.uur-descrp-2').html(voorschoolse_opvang.tarief_2.descrp);


        //}
    },

    tarief_checker: function () {
        $(".tarief-select").click(function () {
            if ($("#radio_1").is(':checked')) {

                tarief = $('#radio_1').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(voorschoolse_opvang.tarief_1.descrp);
                eindOpvang = voorschoolse_opvang.tarief_1.descrp;

                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);

                // dag uren veranderen
                maandag_check.attr("dag-uren", voorschoolse_opvang.tarief_1.maandag_uren);
                dinsdag_check.attr("dag-uren", voorschoolse_opvang.tarief_1.dinsdag_uren);
                woensdag_check.attr("dag-uren", voorschoolse_opvang.tarief_1.woensdag_uren);
                donderdag_check.attr("dag-uren", voorschoolse_opvang.tarief_1.donderdag_uren);
                vrijdag_check.attr("dag-uren", voorschoolse_opvang.tarief_1.vrijdag_uren);

            } else if ($("#radio_2").is(':checked')) {
                tarief = $('#radio_2').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(voorschoolse_opvang.tarief_2.descrp);
                eindOpvang = voorschoolse_opvang.tarief_2.descrp;                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);


                // dag uren veranderen
                maandag_check.attr("dag-uren", voorschoolse_opvang.tarief_2.maandag_uren);
                dinsdag_check.attr("dag-uren", voorschoolse_opvang.tarief_2.dinsdag_uren);
                woensdag_check.attr("dag-uren", voorschoolse_opvang.tarief_2.woensdag_uren);
                donderdag_check.attr("dag-uren", voorschoolse_opvang.tarief_2.donderdag_uren);
                vrijdag_check.attr("dag-uren", voorschoolse_opvang.tarief_2.vrijdag_uren);

            } else {
                //$(".tariefs").prop("checked", false);
            }

        });

    }
};
//--------------------------------------------------------------------

//--------- object naschoolse ---------------------------------------------------------------------

let naschoolse_opvang = {
    naam: "naschoolse",
    tarief_1:
        {
            tarief: '9.10',
            descrp: "NSO zonder vakantie opvang",
            maandag_uren: "16.67",
            dinsdag_uren: "16.67",
            woensdag_uren: "23.33",
            donderdag_uren: "16.67",
            vrijdag_uren: "16.67",

        },

    tarief_2:
        {
            tarief: '8.75',
            descrp: "NSO geheel opvang met vakantieopvang",
            maandag_uren: "28.67",
            dinsdag_uren: "28.67",
            woensdag_uren: "35.33",
            donderdag_uren: "28.67",
            vrijdag_uren: "28.67",
        },

    opvang_checker: function () {
        //if(soortopvang == this.naam){
        //console.log(this.naam + ' is geselecteerd');
        // dinsdag_check.attr("dag-uren",this.tarief_1.dinsdag_uren);
        $("#derde").hide();
        //tarief veranderen:
        $('#radio_1').val(naschoolse_opvang.tarief_1.tarief);
        $('#radio_2').val(naschoolse_opvang.tarief_2.tarief);

        $('.uur-tarief-1-html').html(naschoolse_opvang.tarief_1.tarief);
        $('.uur-tarief-2-html').html(naschoolse_opvang.tarief_2.tarief);
        //slogan veranderen:
        $('.uur-descrp-1').html(naschoolse_opvang.tarief_1.descrp);
        $('.uur-descrp-2').html(naschoolse_opvang.tarief_2.descrp);


        //}
    },

    tarief_checker: function () {
        $(".tarief-select").click(function () {
            if ($("#radio_1").is(':checked')) {

                tarief = $('#radio_1').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(naschoolse_opvang.tarief_1.descrp);
                eindOpvang = naschoolse_opvang.tarief_1.descrp;                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);


                // dag uren veranderen
                maandag_check.attr("dag-uren", naschoolse_opvang.tarief_1.maandag_uren);
                dinsdag_check.attr("dag-uren", naschoolse_opvang.tarief_1.dinsdag_uren);
                woensdag_check.attr("dag-uren", naschoolse_opvang.tarief_1.woensdag_uren);
                donderdag_check.attr("dag-uren", naschoolse_opvang.tarief_1.donderdag_uren);
                vrijdag_check.attr("dag-uren", naschoolse_opvang.tarief_1.vrijdag_uren);

            } else if ($("#radio_2").is(':checked')) {
                tarief = $('#radio_2').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(naschoolse_opvang.tarief_2.descrp);
                eindOpvang = naschoolse_opvang.tarief_2.descrp;                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);



                // dag uren veranderen
                maandag_check.attr("dag-uren", naschoolse_opvang.tarief_2.maandag_uren);
                dinsdag_check.attr("dag-uren", naschoolse_opvang.tarief_2.dinsdag_uren);
                woensdag_check.attr("dag-uren", naschoolse_opvang.tarief_2.woensdag_uren);
                donderdag_check.attr("dag-uren", naschoolse_opvang.tarief_2.donderdag_uren);
                vrijdag_check.attr("dag-uren", naschoolse_opvang.tarief_2.vrijdag_uren);

            } else {
                //$(".tariefs").prop("checked", false);
            }

        });

    }
};
//--------------------------------------------------------------------


//--------- object buitenschoolse ---------------------------------------------------------------------

let buitenschoolse_opvang = {
    naam: "buitenschoolse",
    tarief_1:
        {
            tarief: '8.75',
            descrp: "BSO met vakantieopvang",
            maandag_uren: "35.33",
            dinsdag_uren: "35.33",
            woensdag_uren: "42",
            donderdag_uren: "35.33",
            vrijdag_uren: "35.33",

        },

    tarief_2:
        {
            tarief: '9.10',
            descrp: "BSO zonder vakantieopvang",
            maandag_uren: "23.33",
            dinsdag_uren: "23.33",
            woensdag_uren: "30",
            donderdag_uren: "23.33",
            vrijdag_uren: "23.33",
        },

    tarief_3:
        {
            tarief: '10.50',
            descrp: "Alleen vakantieopvang",
            maandag_uren: "12",
            dinsdag_uren: "12",
            woensdag_uren: "12",
            donderdag_uren: "12",
            vrijdag_uren: "12",
        },

    opvang_checker: function () {
        //if(soortopvang == this.naam){
        //console.log(this.naam + ' is geselecteerd');
        // dinsdag_check.attr("dag-uren",this.tarief_1.dinsdag_uren);
        $("#derde").show();
        //tarief veranderen:
        $('#radio_1').val(buitenschoolse_opvang.tarief_1.tarief);
        $('#radio_2').val(buitenschoolse_opvang.tarief_2.tarief);
        $('#radio_3').val(buitenschoolse_opvang.tarief_3.tarief);


        $('.uur-tarief-1-html').html(buitenschoolse_opvang.tarief_1.tarief);
        $('.uur-tarief-2-html').html(buitenschoolse_opvang.tarief_2.tarief);
        $('.uur-tarief-3-html').html(buitenschoolse_opvang.tarief_3.tarief);
        //slogan veranderen:
        $('.uur-descrp-1').html(buitenschoolse_opvang.tarief_1.descrp);
        $('.uur-descrp-2').html(buitenschoolse_opvang.tarief_2.descrp);
        $('.uur-descrp-3').html(buitenschoolse_opvang.tarief_3.descrp);


        //}
    },

    tarief_checker: function () {
        $(".tarief-select").click(function () {
            if ($("#radio_1").is(':checked')) {

                tarief = $('#radio_1').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(buitenschoolse_opvang.tarief_1.descrp);
                eindOpvang = buitenschoolse_opvang.tarief_1.descrp;
                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);


                // dag uren veranderen
                maandag_check.attr("dag-uren", buitenschoolse_opvang.tarief_1.maandag_uren);
                dinsdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_1.dinsdag_uren);
                woensdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_1.woensdag_uren);
                donderdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_1.donderdag_uren);
                vrijdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_1.vrijdag_uren);

            } else if ($("#radio_2").is(':checked')) {
                tarief = $('#radio_2').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(buitenschoolse_opvang.tarief_2.descrp);
                eindOpvang = buitenschoolse_opvang.tarief_2.descrp;
                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);



                // dag uren veranderen
                maandag_check.attr("dag-uren", buitenschoolse_opvang.tarief_2.maandag_uren);
                dinsdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_2.dinsdag_uren);
                woensdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_2.woensdag_uren);
                donderdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_2.donderdag_uren);
                vrijdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_2.vrijdag_uren);

            } else if ($("#radio_3").is(':checked')) {
                tarief = $('#radio_3').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(buitenschoolse_opvang.tarief_3.descrp);
                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);



                // dag uren veranderen
                maandag_check.attr("dag-uren", buitenschoolse_opvang.tarief_3.maandag_uren);
                dinsdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_3.dinsdag_uren);
                woensdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_3.woensdag_uren);
                donderdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_3.donderdag_uren);
                vrijdag_check.attr("dag-uren", buitenschoolse_opvang.tarief_3.vrijdag_uren);
            }

        });

    }
};
//--------------------------------------------------------------------

//--------- object Dag opvang ---------------------------------------------------------------------

let dag_opvang = {
    naam: "dag",
    tarief_1:
        {
            tarief: '10.25',
            descrp: "KDV halve dagopvang (6 uur p/d)",
            maandag_uren: "26",
            dinsdag_uren: "26",
            woensdag_uren: "26",
            donderdag_uren: "26",
            vrijdag_uren: "26",

        },

    tarief_2:
        {
            tarief: '9.75',
            descrp: "KDV hele dagopvang (12 uur p/d)",
            maandag_uren: "52",
            dinsdag_uren: "52",
            woensdag_uren: "52",
            donderdag_uren: "52",
            vrijdag_uren: "52",
        },

    opvang_checker: function () {
        //if(soortopvang == this.naam){
        //console.log(this.naam + ' is geselecteerd');
        // dinsdag_check.attr("dag-uren",this.tarief_1.dinsdag_uren);
        $("#derde").hide();
        //tarief veranderen:
        $('#radio_1').val(dag_opvang.tarief_1.tarief);
        $('#radio_2').val(dag_opvang.tarief_2.tarief);

        $('.uur-tarief-1-html').html(dag_opvang.tarief_1.tarief);
        $('.uur-tarief-2-html').html(dag_opvang.tarief_2.tarief);
        //slogan veranderen:
        $('.uur-descrp-1').html(dag_opvang.tarief_1.descrp);
        $('.uur-descrp-2').html(dag_opvang.tarief_2.descrp);


        //}
    },

    tarief_checker: function () {
        $(".tarief-select").click(function () {
            if ($("#radio_1").is(':checked')) {
                tarief = $('#radio_1').val();
                $(".overzicht_opvang_txt").html(dag_opvang.tarief_1.descrp);
                eindOpvang = dag_opvang.tarief_1.descrp;

                //console.log(tarief);
                //console.log("eerste tarief is geselecteerd");
                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);


                // dag uren veranderen
                maandag_check.attr("dag-uren", dag_opvang.tarief_1.maandag_uren);
                dinsdag_check.attr("dag-uren", dag_opvang.tarief_1.dinsdag_uren);
                woensdag_check.attr("dag-uren", dag_opvang.tarief_1.woensdag_uren);
                donderdag_check.attr("dag-uren", dag_opvang.tarief_1.donderdag_uren);
                vrijdag_check.attr("dag-uren", dag_opvang.tarief_1.vrijdag_uren);


            } else if ($("#radio_2").is(':checked')) {
                tarief = $('#radio_2').val();
                //console.log(tarief);
                $(".overzicht_opvang_txt").html(dag_opvang.tarief_2.descrp);
                eindOpvang = dag_opvang.tarief_2.descrp;
                //console.log("tweede tarief is geselecteerd");
                //alle checks en arrays leegmaken
                $(".checks").prop("checked", false);
                selected_weekdagen.splice(0, selected_weekdagen.length);
                selected_uren.splice(0, selected_uren.length);



                // dag uren veranderen
                maandag_check.attr("dag-uren", dag_opvang.tarief_2.maandag_uren);
                dinsdag_check.attr("dag-uren", dag_opvang.tarief_2.dinsdag_uren);
                woensdag_check.attr("dag-uren", dag_opvang.tarief_2.woensdag_uren);
                donderdag_check.attr("dag-uren", dag_opvang.tarief_2.donderdag_uren);
                vrijdag_check.attr("dag-uren", dag_opvang.tarief_2.vrijdag_uren);

            }

        });

    }
};
//--------------------------------------------------------------------



let all_opvangs = [
    voorschoolse_opvang,
    naschoolse_opvang,
    buitenschoolse_opvang,
    dag_opvang,
];



//--------------------------------------------------------------------

// formulier verandering

$('#formulier').change(function () {
    soortopvang = $('input[name="soort_opvang"]:checked').val();
    soorttarief = $('input[name="tarief"]:checked').val();
    tarief_val = $('input[name="tarief"]');
    // weekdag         = $('input[name="dag"]:checked').val();


});



// check welke opvang gekozen is---------------------------
//---------------------------------------------------------

$(".opvang-select").on('change', 'input[type=radio]', function () {
    $(".tarieven").fadeIn(120);
    $(".tarief-select").hide();
    $(".dag-select").hide();

    soortopvang = $(this).val();

    //console.log(soortopvang);

    for (let i = 0; i < all_opvangs.length; i++) {
        if (soortopvang == all_opvangs[i].naam) {
            console.log(all_opvangs[i].naam + ' is geselecteerd');
            //console.log('tabon');
            all_opvangs[i].opvang_checker();
            all_opvangs[i].tarief_checker();
            //$(".overzicht_opvang_txt").html(soortopvang);
        }
    }



    /* for (let prop in all_opvangs) {
        console.log(prop);

        if (soortopvang == prop.naam) {
            console.log('objecten gevonden');
            /*
            console.log(prop.naam + ' object is geselecteerd');
            prop.opvang_checker();
            prop.tarief_checker();

        };

    };*/



    //bij nieuwe selectie, alle checks leeg maken

    $(".checks").prop("checked", false);
    $(".radio_tarief").prop("checked", false);
    selected_weekdagen.splice(0, selected_weekdagen.length);
    selected_uren.splice(0, selected_uren.length);
    $(".overzicht_dagen").html("Welke dagen??");
    tarief = '0';

    $(".tarief-select").fadeIn("slow");

    // $(".reken_dim_btn").Show();



    //values veranderen
    //voorschoolse_opvang.checker();

    //if(soortopvang == 'dag_opvang'){
    // console.log('deze');
    //soorttarief.val();
    //$(".uur_tarief_html").html("200");
    //}

});

//----------------------------------------------------------

// check welke tarief gekozen is
/*
$(".tarieven").on('change', 'input[type=radio]', function () {
    tarief = $(this).val();
    console.log(tarief);

});
*/
//voorschoolse_opvang.tarief_checker();


//----------------------------------------------------------

// bij selectie tarief

$(".tarief-select").on('change', 'input[type=radio]', function () {
    $(".dagen").fadeIn("slow");
    $(".dag-select").fadeIn("slow");

});



//----------------------------------------------------------

// check welke dag gekozen is


$(".dagen").on('change', 'input[type=checkbox]', function () {
    //weekdag = $(this).val();
    $(".reken_dim_btn").hide();
    $(".reken_btn").fadeIn(250);
    weekdag = $(this).attr("day");
    dag_uren = $(this).attr("dag-uren");
    //console.log(weekdag);

    var index = selected_weekdagen.indexOf(weekdag);
    var index2 = selected_uren.indexOf(dag_uren);


    if ($(this).is(':checked')) {
        selected_weekdagen.push(weekdag);
        selected_uren.push(dag_uren);
    }
    else {
        if (index > -1) {
            selected_weekdagen.splice(index, 1);
            selected_uren.splice(index2, 1);
        }
    }
    console.log(selected_weekdagen);
    console.log(selected_uren);
    console.log(weekdag);

});

//----------------------------------------------------------


// berekenen

$(".reken_btn").mousedown("click", function () {
    //console.log(selected_weekdagen);
    // gekozen tarief
    $(".overzicht_tarief").html('&euro; ' +tarief);
    //hieronder wordt met mail mee verzonden
    $("#send-tarief").val('&euro;'+tarief);
    $(".tarieven").hide();
    $(".dagen").hide();



    // gekozen dagen
    $(".overzicht_dagen").html(selected_weekdagen.join());

    // uren bij elkaar optellen
    const new_hours = selected_uren.map((i) => Number(i));

    const sum_uren = new_hours.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);


    if(sum_uren == 260){
        console.log("totaal is 260");

        $("#send-opvang").val("KDV hele dagopvang (12 uur p/d)");

        $(".overzicht_kosten_totaal").html("&euro; 2242.50");
        $("#send-totaal").val("&euro; 2242.50");

        $(".overzicht_uren_totaal").html("260");
        $("#send-uren").val("260");

        $("#send-dagen").val("maandag,dinsdag,woensdag,donderdag,vrijdag");

        $(".extra_txt").html("U krijgt een halve dag gratis van ons bij dit gekozen opvang pakket. Normaliter 260 uur maar u ontvangt 30 uur korting dat betekend wat u moet doorgeven aan de belastingdienst is; 230 X &euro;9,75 = &euro;2.242,50 per maand voor 5 hele dagen!");
        $("#korting-txt").val("U krijgt een halve dag gratis van ons bij dit gekozen opvang pakket. Normaliter 260 uur maar u ontvangt 30 uur korting dat betekend wat u moet doorgeven aan de belastingdienst is; 230 X &euro;9,75 = &euro;2.242,50 per maand voor 5 hele dagen!");

    } else{
        $(".extra_txt").html(" ");
        var urenTotaal = sum_uren.toFixed(2);

        // uren tonen
        $(".overzicht_uren_totaal").html(urenTotaal);
        $("#send-uren").val(urenTotaal);




        // dag uren * Tarief
        var totaal = selected_uren.map(x => x * tarief);

        const finale = totaal.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        // var rounded = Math.round((finale + Number.EPSILON) * 100) / 100;
        var rounded = Math.ceil((finale + Number.EPSILON));

        $(".overzicht_kosten_totaal").html( '&euro; ' +rounded);
        $(".overzicht_txt").fadeIn("slow");

        $("#send-totaal").val('&euro; ' + rounded);
        //console.log($("#send-totaal").val());
        var alldays = selected_weekdagen.join();
        $("#send-dagen").val(alldays);
        $("#send-opvang").val(eindOpvang);
    };

    $(".reken_btn").hide();
    $(".opvang-select").hide();
    $(".back_btn").show();
    $(".rk-overzicht-wrapper").fadeIn("Slow");
});

function checkAll(){
    var inputs = document.querySelectorAll(".check_opvang");
    for(var i = 0; i < inputs.length; i++){
        inputs[i].checked = false;
    }
}

$(".back_btn").mousedown("click", function () {
    $(".opvang-select").show();
    $(".rk-overzicht-wrapper").hide();
    $(".back_btn").hide();
    checkAll();
});

// check commit


