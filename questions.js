
const json = {questions : [
    {
        texte : "création de la machine à vapeur :",
        condition : "false",
        choix1:
            {
                texte: "Utilisation généralisé",
                consequence: "",
                img:""
            }
        ,
        choix2:
            {
                texte: "Utilisation modéré",
                consequence: "",
                img:""
            }
        ,
        fixe : true,
        poids : 50
    },

    {
        texte : "Première central nucléaire :",
        condition : "false",
        choix1:
            {
                texte: "Investir dans le nucléaire",
                consequence: "",
                img:""
            }
        ,
        choix2:
            {
                texte: "Rester au charbon",
                consequence: "",
                img:""
            }
        ,
        fixe : true,
        poids : 50
    },

    {
        texte : "Première éolienne :",
        condition : "false",
        choix1:
            {
                texte: "Investir dans l'éolien",
                consequence: "",
                img:""
            }
        ,
        choix2:
            {
                texte: "Continuer à investir dans le nucléaire",
                consequence: "",
                img:""
            }
        ,
        fixe : true,
        poids : 50
    },

    {
        texte : "Premier rapport du giec :",
        condition : "false",
        choix1:
            {
                texte: "Commencer à prévenir et à agir",
                consequence: "",
                img:""
            }
        ,
        choix2:
            {
                texte: "Investir dans les technologies",
                consequence: "",
                img:""
            }
        ,
        fixe : false,
        poids : 50
    },

    {
        texte : "Les trajets polue il faudrait arranger ça",
        condition : "true",
        choix1:
            {
                texte: "Ivestir dans les voiture électrique",
                consequence: "co2 += 100;",
                img:""
            }
        ,
        choix2:
            {
                texte: "Investir dans les transports en communs",
                consequence: "",
                img:""
            }
        ,
        fixe : true,
        poids : 50
    },

]}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuestionActuelle(roundFixe) {
    let rangeActuel = 0;
    listQuestionsValables = json.questions
    .filter(q => roundFixe == q.fixe)
    .filter(q => eval(q.condition))
    .map(question => {
      const sumRange = rangeActuel + question.poids;
      rangeActuel = sumRange; // Update cumulativeSum for the next iteration
  
      return {
        question,
        min: rangeActuel - question.poids,
        max: rangeActuel - 1
      };
    });
    const maxRange = listQuestionsValables[listQuestionsValables.length - 1].max;
    const rolledNumber = getRandomInt(0,maxRange)

    return selectedQuestion = listQuestionsValables.find(
        question => rolledNumber >= question.min && rolledNumber <= question.max
      );;
}