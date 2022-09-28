const { Axes } = require("../models/axes");


const axesController = {

    addAxe: async(req, res) => {
        try {
            const { name } = req.body

            if (!name) {
                return res.status(400).json({ message: "Please fill the name field." });
            }

            await new Axes({...req.body }).save()
            res.status(201).json({ message: "Axe added succefully" });
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

            await Axes.findByIdAndDelete(axeID)
            res.status(200).json({ message: "Axe deleted succefully" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateAxeName: async(req, res) => {
        try {
            const { axe_name } = req.body
            await Axes.findByIdAndUpdate(req.params.aid, { name: axe_name })
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

            const axe = await Axes.findById(axeID)
            if (!axe) {
                return res.status(400).json({ message: "Axe not found." });
            }

            res.status(200).json(axe);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getAllAxes: async(req, res) => {
        try {
            const axes = await Axes.find()

            res.status(200).json(axes);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}

module.exports = axesController;