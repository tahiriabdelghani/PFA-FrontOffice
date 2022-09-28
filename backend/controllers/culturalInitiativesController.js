const { QuestionsAuditCultureData } = require("../models/culturalQsts");
const { AxesCultureData } = require("../models/culturalAxes");
const { CulturalInitiatives } = require("../models/culturalInitiatives");



const CultutralInitiativesCtrl = {
    //Get initiatives by providing the axe name and its degree [ {cultural_axe : ..., score : }]
    getInitiatives: async(req, res) => {
        try {
            const { cultural_data } = req.body
            let results = [];

            await Promise.all(
                cultural_data.map(async(item) => {

                    if (item.score < 4) {
                        let initiatives = await CulturalInitiatives.find({ cultural_axe: item.cultural_axe, degree: { $lt: 4 } })
                        results.push({ "cultural_axe": item.cultural_axe, "initiatives": initiatives })

                    } else {
                        let initiatives = await CulturalInitiatives.find({ cultural_axe: item.cultural_axe, degree: { $gte: 4 } })
                        results.push({ "cultural_axe": item.cultural_axe, "initiatives": initiatives })

                    }
                })
            )


            console.log(` cultural initiatives results ${JSON.stringify(results)}`)
            res.status(200).json(results)

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CultutralInitiativesCtrl;