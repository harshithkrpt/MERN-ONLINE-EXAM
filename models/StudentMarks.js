const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentMarksSchema = new Schema({
  cgpa: {
    type: String,
    required: true
  },
  creditsobtained: {
    type: String,
    required: true
  },
  overallcredits: {
    type: String,
    required: true
  },
  rollnumber: {
    type: String,
    required: true
  },
  branchsubjects: {
    type: Schema.Types.ObjectId,
    ref: "subjects"
  },
  semresults: {
    type: Schema.Types.ObjectId,
    ref: "results"
  },
  onlineresults: {
    type: Schema.Types.ObjectId,
    ref: "onlineresults"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = StudentMarks = mongoose.model(
  "studentmarks",
  StudentMarksSchema
);
