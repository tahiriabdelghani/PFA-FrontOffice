const router = require("express").Router();

const culturalController = require("../controllers/culturalController")
const CultutralInitiativesCtrl = require("../controllers/culturalInitiativesController")
const CulturalAxesController = require("../controllers/culturalAxesController")

// Cultural audit routes
router.get("/get-cultural-axes", CulturalAxesController.getAllAxes)

//Get all cultural questions
router.get("/get-cultural-questions", culturalController.getAllQuestions)

/**
 * Get cultural questions by axe
 * provide the axe name
 * @param cultural_axe
 */
router.get("/get-cultural-questions-by-axe", culturalController.getCulturalQstsByAxe)

/** 
    * the list format in the body request
    * @param responses in the following format [ {cultural_axe : ..., scores : [0,5,3,3]} ]
    * 
    *the item params 
    * @param cultural_axe the axe name
    * @param scores list of scores of the choosen responses
       
*/
router.post("/send-cultural-responses", culturalController.sendCulturalResponses)


//Get initiatives 

/** 
 * Providde a list in the request body
 * @param cultural_data list in this format [ {cultural_axe : ..., score : }]
 * 
 * the item params
 * @param cultural_axe the axe name
 * @param score score of the axe
 * 
 * 
 */
router.post("/get-cultural-initiatives", CultutralInitiativesCtrl.getInitiatives)

module.exports = router