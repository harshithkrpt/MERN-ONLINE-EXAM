const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionPaperSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  semister: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  mid: {
    type: Number,
    default: 1
  },
  examconducted: {
    type: Boolean,
    default: false
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          type: String,
          required: true
        }
      ],
      answer: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = QuestionPaper = mongoose.model(
  "questionpapers",
  QuestionPaperSchema
);
