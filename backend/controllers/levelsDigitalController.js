const { Levels } = require("../models/levels");


const levelController = {

    addLevel: async(req, res) => {
        try {
            const { name, degree } = req.body

            if (!name || !degree) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            await new Levels({...req.body }).save()
            res.status(201).json({ message: "Level added succefully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    removeLevelByID: async(req, res) => {
        try {
            const { levelID } = req.body
            if (!levelID) {
                return res.status(400).json({ message: "Level Id not given." });
            }

            await Levels.findByIdAndDelete(levelID)
            res.status(200).json({ message: "Level deleted succefully" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getLevelsById: async(req, res) => {
        try {
            const { levelID } = req.body
            if (!levelID) {
                return res.status(400).json({ message: "Level Id not given." });
            }

            const level = await Levels.findById(levelID)
            if (!level) {
                return res.status(400).json({ message: "Level not found." });
            }

            res.status(200).json(level);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getAllLevels: async(req, res) => {
        try {

            const levels = await Levels.find()

            res.status(200).json(levels);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}

module.exports = levelController;