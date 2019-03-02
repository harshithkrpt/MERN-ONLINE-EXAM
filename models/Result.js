const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  rollnumber: {
    type: String,
    required: true
  },
  results: [
    [
      {
        // Subject Code
        code: {
          type: String,
          required: true
        },
        obtainedcredits: {
          type: String,
          required: true
        },
        excludedcredits: {
          type: String,
          default: "0"
        },
        status: {
          type: String,
          required: true
        },
        gpa: {
          type: String,
          required: true
        },
        allotedcredits: {
          type: String,
          required: true
        }
      }
    ]
  ],
  sgpas: [
    {
      type: String,
      required: true
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Result = mongoose.model("results", ResultSchema);
