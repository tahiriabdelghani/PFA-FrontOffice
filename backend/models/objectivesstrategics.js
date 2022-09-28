const mongoose = require("mongoose");

const objectivesstrategicsSchema = new mongoose.Schema({
  objective: { type: String },
});

const objectivesstrategics = mongoose.model(
  "objectivesstrategics",
  objectivesstrategicsSchema
);
module.exports = objectivesstrategics;
