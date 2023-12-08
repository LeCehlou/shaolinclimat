//Variables affichées
let climatValue = 0
let pollutionValue = 0
let ressourceValue = 0
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
audioActive = false


function calculateBars() {
    pollutionValue = (co2 + dechet) / 2
    climatValue = (temperature + ozone) / 2
    ressourceValue = (nature + metal + fossile) / 3
    energieValue = (production + consommation) / 2
}

function updateProgressBars() {
    document.getElementById('climat').value = climatValue;
    document.getElementById('pollution').value = pollutionValue;
    document.getElementById('ressource').value = ressourceValue;
    document.getElementById('energie').value = energieValue
}

function showCards() {   
    card1Image = document.getElementById("imageCard1");
    card2Image = document.getElementById("imageCard2");
    card1Image.setAttribute("src",question.question.choix1.img);
    card2Image.setAttribute("src",question.question.choix2.img);

    card1Description = document.getElementById("descriptionCard1");
    card2Description = document.getElementById("descriptionCard2");
    card1Description.innerText = question.question.choix1.texte;
    card2Description.innerText = question.question.choix2.texte;

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
    if (question.question.modale != null) {
        showModal(question  )
    }
    
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

function changeGradientCSS() {

}

function playSound() {
    const audio = document.getElementById("myAudio")
    const oldAttribute = audio.getAttribute("src")
    if (pollutionValue === 'undefined' || pollutionValue < 33) {
        audio.setAttribute("src", "./musiques/BoucleBienInGame.mp3")
    }
    if (pollutionValue > 33 && pollutionValue < 66) {
        audio.setAttribute("src", "./musiques/BoucleMoyenInGame.mp3")
    }
    else {
         audio.setAttribute("src", "./musiques/BoucleSauceInGame.mp3")
    }
    if (oldAttribute != audio.getAttribute("src")) {
        audio.pause();
        audio.currentTime=0;
        audio.play();
    }
}

function stopStartSound() {
    const audio = document.getElementById("myAudio")
    if (audioActive) {
        audio.pause();
        audio.currentTime=0;
        document.getElementById("sound-icon").setAttribute("src","PadSon.svg");
    }
    else {
        audio.play();
        document.getElementById("sound-icon").setAttribute("src","Son.svg");

    }
    audioActive = !audioActive
    
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
        document.getElementById("description").innerText = question.question.texte
        await playTurnAsync(question);
        indexAnnee++;
        calculateBars();
        updateProgressBars();
        changeGradientCSS();
        playSound()
        if (indexAnnee > nombreAnnes - 1) {
            break;
        }
        else {

            document.getElementById("currentYear").innerText = listeAnnees[indexAnnee].annee
        }
    }
}

// Call gameLoopAsync somewhere in your code
document.addEventListener("DOMContentLoaded" , function(e) {
    gameLoopAsync();
})