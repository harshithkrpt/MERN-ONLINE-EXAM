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
  onlineresults: [
    [
      [
        {
          subject: {
            type: String,
            required: true
          },
          marks: {
            type: String,
            required: true
          }
        }
      ]
    ]
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Result = mongoose.model("onlineresults", ResultSchema);
