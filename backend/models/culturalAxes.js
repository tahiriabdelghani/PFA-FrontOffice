const mongoose = require('mongoose')

const AxesCultureSchema = mongoose.Schema({
    axe: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },

})

const AxesCultureData = mongoose.model('AxesCulture', AxesCultureSchema);

module.exports = { AxesCultureData };