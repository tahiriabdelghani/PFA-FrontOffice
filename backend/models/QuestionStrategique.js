const mongoose = require("mongoose");

const questionsauditstrategicsSchema = new mongoose.Schema({});

const questionsauditstrategics = mongoose.model(
    "questionsauditstrategics",
    questionsauditstrategicsSchema
);

module.exports = questionsauditstrategics;