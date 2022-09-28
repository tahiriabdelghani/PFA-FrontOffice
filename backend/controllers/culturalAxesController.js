const { AxesCultureData } = require("../models/culturalAxes");


const CulturalAxesController = {

    addAxe: async(req, res) => {
        try {
            const { name } = req.body

            if (!name) {
                return res.status(400).json({ message: "Please fill the name field." });
            }

            await new AxesCultureData({...req.body }).save()
            res.status(201).json({ message: "Cultural axe added succefully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    removeAxeByID: async(req, res) => {
        try {
            const { axeID } = req.body
            if (!axeID) {
                return res.status(400).json({ message: "Axe Id not given." });
            }

            await AxesCultureData.findByIdAndDelete(axeID)
            res.status(200).json({ message: "Cultural axe deleted succefully" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateAxeName: async(req, res) => {
        try {
            const { axe_name } = req.body
            await AxesCultureData.findByIdAndUpdate(req.params.aid, { name: axe_name })
            res.status(200).json({ message: "Axe Updated succefully" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getAxeById: async(req, res) => {
        try {
            const { axeID } = req.body
            if (!axeID) {
                return res.status(400).json({ message: "Axe Id not given." });
            }

            const axe = await AxesCultureData.findById(axeID)
            if (!axe) {
                return res.status(400).json({ message: "Cultural axe not found." });
            }

            res.status(200).json(axe);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getAllAxes: async(req, res) => {
        try {
            const axes = await AxesCultureData.find()

            res.status(200).json(axes);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}

module.exports = CulturalAxesController;