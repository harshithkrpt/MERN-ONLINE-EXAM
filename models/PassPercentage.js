const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passPercentageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  year: {
    type: String,
    default: new Date().getFullYear().toString()
  },
  totalSubjects: {
    type: String,
    required: true
  },
  failedSubjects: {
    type: String,
    required: true
  },
  subjectwisefailures: [
    {
      subjectname: {
        type: String,
        required: true
      },
      nooffailures: {
        type: String,
        required: true
      }
    }
  ],
  detentionlist: [
    {
      rollnumber: {
        type: String
      }
    }
  ],
  branch: {
    type: String,
    default: "all"
  }
});

module.exports = PassPercentage = mongoose.model(
  "passpercentage",
  passPercentageSchema
);
