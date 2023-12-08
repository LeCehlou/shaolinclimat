//Variables affichées
let climatValue = 0.5
let pollutionValue = 0.7
let ressourceValue = 0.3

//Variables sub
let co2 = 0;
let dechet = 0;

let temperature = 0;
let catastrophe = 0;
let ozone = 0;

let nature = 0;
let metal = 0;
let fossile = 0;

//Accomplissements 
let hasPetrole = false;
let hasInternet = false;
let hasNuclear = false;

//Variables fonctionnement jeu
let listeAnnees = [{annee : 1770 , fixe : true}, {annee : 1950, fixe : true}, {annee : 1987, fixe : true}, {annee : 1990, fixe : true}, {annee : 2000, fixe : false}, {annee : 2005, fixe : false}, {annee : 2010, fixe : false}, {annee : 2015, fixe : false}, {annee : 2020, fixe : true}, {annee : 2023, fixe : false}]
let nombreAnnes = listeAnnees.length
let indexAnnee = 0;

function calculateBars() {
    pollutionValue = (co2 + dechet) / 2
    climatValue = (temperature + catastrophe + ozone) / 3
    ressourceValue = (nature + metal + fossile) / 3
}

function updateProgressBars() {
    document.getElementById('climat').value = climatValue;
    document.getElementById('pollution').value = pollutionValue;
    document.getElementById('ressource').value = ressourceValue;
}

function showCards() {
    //
}

function playTurn(question) {
    showCards(question)
    while (true) {
        //Besoin d'attendre un listener 
        
    }
    //Récupérer le bon choix
    //choix = [....]
    //eval(choix.consequences)
    if (question.modale != null) {
        //On charge liée
    }
}

function gameLoop() {
    while (true) {
        const question = getQuestionActuelle(listeAnnees[indexAnnee].fixe)
        playTurn(question)
        calculateBars()
        updateProgressBars() 
        indexAnnee++;
        if (indexAnnee > nombreAnnes - 1) {
            break;
        }
    }
}
