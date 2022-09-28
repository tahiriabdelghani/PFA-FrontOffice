const mongoose = require('mongoose')

const CulturalInitiativesSchema = new mongoose.Schema({
    cultural_axe: {
        type: String,
        required: true
    },
    degree: {
        type: Number,
        required: true
    },
    initiatives: {
        type: [String],
        required: true
    },
})

const CulturalInitiatives = mongoose.model("culturalinitiatives", CulturalInitiativesSchema);

module.exports = { CulturalInitiatives };