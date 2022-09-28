var rep = {
  userId: "53389895",
  responses: [
    {
      quest: "question 1",
      resp: {
        name: "response 1",
        score: "21",
      },
      objectif: "objectif 1",
      prctg: "75",
    },
    {
      quest: "question 1",
      resp: {
        name: "response 1",
        score: "45",
      },
      objectif: "objectif 1",
      prctg: "81",
    },
    {
      quest: "question 2",
      resp: {
        name: "response 3",
        score: "21",
      },
      objectif: "objectif 2",
      prctg: "12",
    },
  ],
};
const objectifs = ["objectif 1", "objectif 2"];
var objectivesScores = [];

const algo = (rep, objectifs) => {
  for (objectif in objectifs) {
    let score = 0;
    for (response in rep.responses) {
      if (rep.responses[response].objectif === objectifs[objectif]) {
        score +=
          rep.responses[response].resp.score * rep.responses[response].prctg;
      }
    }
    objectivesScores = [
      ...objectivesScores,
      { obj: objectifs[objectif], scoreTotal: score },
    ];
  }
  rep.objectivesScores = objectivesScores;
  console.log(rep);
  return rep;
};
