//Variables affichées
let climatValue
let pollutionValue
let ressourceValue
var historyCo2=[]
var historyDechet=[]
var historyTemperature=[]
var mainHistory = {co2:historyCo2,temperature:historyTemperature,dechet:historyDechet}
//Variables sub
var co2 = 10
var dechet= 10
var ozone = 0
var temperature= 10
var nature= 15
var fossile = 0
var metal= 0
var nucleaire = 0
var production = 5
var consommation = 2
//Accomplissements 
let hasPetrole = false;
let hasInternet = false;
let hasNuclear = false;

//Variables fonctionnement jeu
let listeAnnees = [{annee : 1770 , fixe : true}, {annee : 1950, fixe : true}, {annee : 1987, fixe : true}, {annee : 1990, fixe : true}, {annee : 2000, fixe : false}, {annee : 2005, fixe : false}, {annee : 2010, fixe : false}, {annee : 2015, fixe : false}, {annee : 2020, fixe : true}, {annee : 2023, fixe : false}]
let nombreAnnes = listeAnnees.length
let indexAnnee = 0
enAttente = false
question = null
choix = null

function showModal() {
    var modal= document.getElementById("InformationModale")
    modal.style.display = "block";
    }
function closeModal() {
    var modal= document.getElementById("InformationModale")
            modal.style.display = "none";
}

function calculateBars() {
    pollutionValue = (co2 + dechet) / 2
    climatValue = (temperature + ozone) / 2
    ressourceValue = (nature + metal + fossile) / 3
    energieValue = (production + consommation) / 2
    console.log(pollutionValue)
}

function updateProgressBars() {
    document.getElementById('climat').value = climatValue;
    document.getElementById('pollution').value = pollutionValue;
    document.getElementById('ressource').value = ressourceValue;
    document.getElementById('energie').value = energieValue
}

function showCards() {
    //
}



function onClickCard(number) {
    enAttente = false
    if (number == 1) {
        choix = question.question.choix1 
    }
    else {
        choix = question.question.choix2
    }
    eval(choix.consequence)
    
}   
function generateData(){
    historyCo2.push(co2)
    historyDechet.push(dechet)
    historyTemperature.push(temperature)
    co2+=Math.floor(Math.random() * 10);
    dechet+=Math.floor(Math.random() * 10);
    temperature+=Math.floor(Math.random() * 10);
}
function finishGame(){
    SendToChart()
}
function SendToChart(){
    JSON.stringify(mainHistory)
    console.log(mainHistory)

}


async function playTurnAsync(question) {
    return new Promise((resolve) => {
        showCards(question);
        enAttente = true;

        function checkCondition() {
            if (!enAttente) {
                resolve();
            } else {
                setTimeout(checkCondition, 0);
            }
        }

        checkCondition();
    });
}

async function gameLoopAsync() {
    for (let i = 0; i < nombreAnnes; i++) {
        question = getQuestionActuelle(listeAnnees[indexAnnee].fixe);
        await playTurnAsync(question);
        indexAnnee++;
        calculateBars();
        updateProgressBars();
        if (indexAnnee > nombreAnnes - 1) {
            break;
        }
    }
}

// Call gameLoopAsync somewhere in your code
gameLoopAsync();