const mongoose = require('mongoose')

const QuestionsAuditCultureSchema = mongoose.Schema({
    question: String,
    responsesAndniveau: [{ _id: String, response: String, niveau: String }],
    axe: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },

})

const QuestionsAuditCultureData = mongoose.model('QuestionsAuditCulture', QuestionsAuditCultureSchema);

module.exports = { QuestionsAuditCultureData };