const mongoose = require('mongoose')

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    degree: {
        type: Number,
        required: true,
    }
})

const Levels = mongoose.model("levels", levelSchema);

module.exports = { Levels };