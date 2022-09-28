const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router();
const questionsauditstrategics = require("../models/QuestionStrategique.js");
const objectivesstrategics = require("../models/objectivesstrategics.js");
const HistoriqueResponseAuditStrategique = require("../models/historiqueResponseAuditStrategique.js");

//Enregistrement des reponses et des resultats de l'audit dans la base donnees
router.post("/",auth, async(req, res) => {
    const objectifs =await objectivesstrategics.find();
    const charObjectives=[]
    for (let key in objectifs){
        charObjectives.push(objectifs[key].objective)
    }
    console.log(charObjectives)

    const rep = req.body;
    const NewHistoriqueResponseAuditStrategique =
        new HistoriqueResponseAuditStrategique(algo(rep, charObjectives));
    try {
        const SavedHistoriqueResponseAuditStrategique =
            await NewHistoriqueResponseAuditStrategique.save();
        res.status(200).json(SavedHistoriqueResponseAuditStrategique);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get des questions de l'audit strategique
router.get("/",auth, async(req, res) => {
    try {
        const questionsStrategics = await questionsauditstrategics.find({});
        res.status(200).json(questionsStrategics);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get des objectives strategiques
router.get("/objectives-strategics",auth, async(req, res) => {
    try {
        const objectivesStrategics = await objectivesstrategics.find({});
        res.status(200).json(objectivesStrategics);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get des reponses et et des resultats d'un utilisateur
router.get("/:userId", auth,async(req, res) => {
    try {
        const historique = await HistoriqueResponseAuditStrategique.find({
            userId: req.params.userId,
        });
        res.status(200).json(historique);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Algorithme qui va calculer le score de chaque objectif
const algo = (rep, objectifs) => {
    var selectedObjectives = [];
    for (const objectif in objectifs) {
        let score = 0;
        for (const response in rep.responses) {
            if (rep.responses[response].objective === objectifs[objectif]) {
                score +=
                    rep.responses[response].response.score *
                    rep.responses[response].percentage/100;
            }
        }
        selectedObjectives = [
            ...selectedObjectives,
            { obj: objectifs[objectif], scoreTotal: score },
        ];
    }
    rep.selectedObjectives = selectedObjectives;
    return rep;
};

module.exports = router