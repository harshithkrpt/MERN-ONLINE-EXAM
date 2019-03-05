const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const ReportErrorSchema = new Schema({
  rollnumber: {
    type: String,
    required: true
  },
  error: {
    type: String,
    required: true
  },
  correct: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = ErrorSchema = mongoose.model("reporterror", ReportErrorSchema);
