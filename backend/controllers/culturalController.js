const { QuestionsAuditCultureData } = require("../models/culturalQsts");
const { AxesCultureData } = require("../models/culturalAxes");

const culturalController = {

    //Get all questions 
    getAllQuestions: async(req, res) => {
        try {
            const choices = await QuestionsAuditCultureData.find();
            if (choices.length == 0)
                return res.status(400).json({ message: "No questions yet" });
            res.status(200).json(choices);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //Get questions by axe
    getCulturalQstsByAxe: async(req, res) => {
        try {
            const { cultural_axe } = req.body
            const questions = await QuestionsAuditCultureData.find({ axe: cultural_axe });
            if (questions.length == 0)
                return res.status(400).json({ message: "No questions for this axe" });
            res.status(200).json(questions);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },


    //Send cultural responses [ {cultural_axe : ..., scores : [0,5,3,3]} ]
    sendCulturalResponses: async(req, res) => {
        try {
            const { responses } = req.body;

            let results = [];

            responses.map((item) => {
                let average;
                average = item.scores.reduce((a, b) => a + b, 0) / item.scores.length;
                results.push({ "cultural_axe": item.cultural_axe, "score": average })
            })

            console.log(` cultural results ${JSON.stringify(results)}`)
            res.status(200).json(results)

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = culturalController;