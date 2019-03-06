const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const AdminSchema = new Schema({
  questionpapers: [[{ type: Number, required: true }]],
  answers: [[{ type: String, required: true }]],
  date: {
    type: Date,
    default: Date.now()
  },
  facultyid: {
    type: Schema.Types.ObjectId,
    required: true
  },
  examid: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = Admin = mongoose.model("createexam", AdminSchema);
