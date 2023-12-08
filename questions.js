const json = {
    questions : [
        {
            condition : "false",
            fixe : false,
            poids : 50
        },
        {
            condition : "!hasPetrole",
            fixe : false,
            poids : 30
        }
    ]
}

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
    console.log(listQuestionsValables)

    return selectedQuestion = listQuestionsValables.find(
        question => rolledNumber >= question.min && rolledNumber <= question.max
      );;
}