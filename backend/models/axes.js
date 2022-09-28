const mongoose = require('mongoose')

const axesScehema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Axes = mongoose.model("axes", axesScehema);

module.exports = { Axes };