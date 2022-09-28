const { Axes } = require("../models/axes");
const { Choices } = require("../models/choices");
const { Levels } = require("../models/levels");

const choicesController = {

    //Get all choices
    getAllChoices: async(req, res) => {
        try {
            const choices = await Choices.find();
            if (choices.length == 0)
                return res.status(400).json({ message: "No choices yet" });
            res.status(200).json(choices);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //Get choices by axe of digital audit, you need to pass the axe id in the URL
    /**
     * 
     * @param {*} req send aid  : id of axe, in request parameters
     * @param {*} res 
     * @returns {Choices} list of choices by axe
     */
    getChoicesByAxe: async(req, res) => {
        try {
            const choices = await Choices.find({ axe_id: req.params.aid });
            if (choices.length == 0)
                return res.status(400).json({ message: "No choices yet" });
            res.status(200).json(choices);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //Get choices by level, you need to send the level id in the request body
    /**
     * 
     * @param {*} req send level id in the request body
     * @param {*} res 
     * @returns {Choices} list of choices by level
     */
    getChoicesByLevel: async(req, res) => {
        try {
            const { level } = req.body;
            const choices = await Choices.find({ level_id: level });
            if (choices.length == 0)
                return res.status(400).json({ message: "No choices yet" });
            res.status(200).json(choices);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //Get choices by axe and level
    getChoicesByLevelAxe: async(req, res) => {
        try {
            const choices = await Choices.find({ axe_id: req.params.aid, level_id: req.params.lid });
            if (choices.length == 0)
                return res.status(400).json({ message: "No choices yet" });
            res.status(200).json(choices);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    // Add choices with provided level and axe
    /**
     * 
     * @param {*} req send choice name, level name, axe name in the request body
     * @param {*} res 
     * @returns {Message} 
     */
    addChoice: async(req, res) => {
        try {
            const { choice, level, axe } = req.body;

            if (!choice || !level || !axe) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            const choice_verify = await Choices.findOne({ name: choice });

            if (choice_verify) {
                return res.status(400).json({ message: "Choice already exits" });
            }

            const levelID = await Levels.find({ name: level });
            if (levelID.length == 0) {
                return res.status(400).send({ message: "Invalid level name" });
            }

            const axeID = await Axes.find({ name: axe });
            if (axeID.length == 0) {
                return res.status(400).send({ message: "Invalid axe name" });
            }


            await new Choices({ name: choice, axe_id: axeID[0]._id, level_id: levelID[0]._id }).save()
            res.status(200).json({ message: "Choice added succefully" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    // Update your choice
    updateChoice: async(req, res) => {
        try {
            const { choice_name, level, axe } = req.body;

            if (!choice_name || !level || !axe) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            const levelID = await Levels.find({ name: level });
            if (!levelID) {
                return res.status(400).send({ message: "Invalid level name" });
            }

            const axeID = await Axes.find({ name: axe });
            if (!axeID) {
                return res.status(400).send({ message: "Invalid axe name" });
            }

            await Choices.findByIdAndUpdate(req.params.cid, { name: choice_name, axe_id: axeID[0]._id, level_id: levelID[0]._id })
            res.status(200).json({ message: "Choice updated succefully" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    // Delete choice
    deleteChoice: async(req, res) => {
        try {
            await Choices.findByIdAndDelete(req.params.cid)

            res.status(200).json({ message: "Choice deleted" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    // send the coices like this [ { axe_id : ... , "levels" : [levelID1, levelID1, ....]}, ]
    /**
     * 
     * @param {*} req send a list of choices in this format : [ { axe_id : ... , "levels" : [levelID1, levelID1, ....]} ]
     * @param {*} res 
     * @returns {results} list containing each axe and the corresponding final level
     */
    sendChoices: async(req, res) => {
        try {
            const { choices } = req.body;

            let results = []

            await Promise.all(
                choices.map(async(item) => {

                    let counts = {};

                    for (let i = 0; i < item.levels.length; i++) {
                        let lvl = item.levels[i];
                        counts[lvl] = counts[lvl] ? counts[lvl] + 1 : 1;
                    }
                    console.log(counts)

                    let sortableChoices = Object.fromEntries(
                        Object.entries(counts).sort(([, a], [, b]) => a - b)
                    );
                    console.log(`sortable choices : ${JSON.stringify(sortableChoices)}`)

                    const keys = Object.keys(sortableChoices);
                    console.log(keys.slice(-3))


                    let levelDegrees = []
                    let average;
                    let level;

                    if (keys.length >= 3) {
                        await Promise.all(
                            keys.slice(-3).map(async(ele) => {
                                level = await Levels.findById(ele)
                                levelDegrees.push(level.degree)
                                console.log(`level degrees : ${JSON.stringify(levelDegrees)}`)
                            })
                        )
                        console.log(`level degreeseee : ${JSON.stringify(levelDegrees)}`)

                        average = levelDegrees.reduce((a, b) => a + b, 0) / levelDegrees.length;
                        console.log(average)
                        results.push({ "axe_id": item.axe_id, "level": average })
                        console.log(` results: ${JSON.stringify(results)}`)
                    }

                    if (keys.length == 2) {
                        await Promise.all(
                            keys.slice(-2).map(async(ele) => {
                                level = await Levels.findById(ele)
                                levelDegrees.push(level.degree)
                            })
                        )
                        average = levelDegrees.reduce((a, b) => a + b, 0) / levelDegrees.length;
                        results.push({ "axe_id": item.axe_id, "level": average })
                    }

                    if (keys.length == 1) {
                        level = await Levels.findById(keys[0])
                        levelDegrees.push(level.degree)
                        average = levelDegrees.reduce((a, b) => a + b, 0) / levelDegrees.length;
                        results.push({ "axe_id": item.axe_id, "level": average })
                    }
                })
            )

            console.log(` resultssss: ${JSON.stringify(results)}`)

            res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = choicesController;