const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  // semsubjects
  semwisesubjects: [
    [
      // individual subjects in that year
      {
        code: {
          type: String,
          required: true
        },
        subjectname: {
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
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Student = mongoose.model("subjects", SubjectSchema);
