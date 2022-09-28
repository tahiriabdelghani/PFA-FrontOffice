const router = require("express").Router();

const axesController = require("../controllers/axesDigitalController")
const levelController = require("../controllers/levelsDigitalController")
const choicesController = require("../controllers/digitalControllers");
const { route } = require("express/lib/application");


//Axe Routes

router.post("/add-axe", axesController.addAxe)
router.delete("/delete-axe", axesController.removeAxeByID)
router.get("/get-axe", axesController.getAxeById)
router.get("/get-all-axes", axesController.getAllAxes)
router.put("/update-axe/:aid", axesController.updateAxeName)

//Level Routes

router.post("/add-level", levelController.addLevel)
router.delete("/delete-level", levelController.removeLevelByID)
router.get("/get-level", levelController.getLevelsById)
router.get("/get-all-levels", levelController.getAllLevels)

//Digital audit controller

// :aid you should provide the axe id 
/* you'll get a response in this format : 
    [ {
        _id : 
        name : "name of the choice",
        axe_id : ,
        level_id : ""
    } ]
*/
router.get("/get-choices/:aid", choicesController.getChoicesByAxe)

// you should provide the level id in the request body
router.get("/get-choices-by-level", choicesController.getChoicesByLevel)

//get all choices
router.get("/get-all-choices", choicesController.getAllChoices)

//get choices by axe id and level id 
router.get("/get-choices-by-filters/:aid/:lid", choicesController.getChoicesByLevelAxe)


/** 
 * add a choice with associating the level name and axe name
 * @param, choice, axe, level
 */
router.post("/add-choice", choicesController.addChoice)

// Update choice
router.put("/update-choice/:cid", choicesController.updateChoice)
    // Delete choice
router.delete("/delete-choice/:cid", choicesController.deleteChoice)

/* 
    Send the coices like this format [ { axe_id : ... , "levels" : [levelID1, levelID1, ....]} ]
    With each check, you should push the level id of the choice to an array named "levels"    
*/
router.post("/send-choices", choicesController.sendChoices)

module.exports = router