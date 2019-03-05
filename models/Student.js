const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const StudentSchema = new Schema({
  hallticketnumber: {
    // your hall ticket number
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: "noe"
  },
  admindate: {
    // joining date
    type: Date,
    required: true
  },
  batch: {
    // joining batch years 2017-2018
    type: String,
    required: true
  },
  dob: {
    // date of birth
    type: Date,
    required: true
  },
  age: {
    type: String,
    min: 17,
    max: 28
  },
  caste: {
    // caste like bc oc
    type: String,
    required: true
  },
  category: {
    // like a b c d
    type: String,
    required: true
  },
  name: {
    // name
    type: String,
    required: true
  },
  fathername: {
    type: String,
    required: true
  },
  mothername: {
    type: String,
    required: true
  },
  studentemail: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  parentmobilenumber: {
    type: String,
    required: true
  },
  studentmobilenumber: {
    type: String,
    required: true
  },
  address: {
    pincode: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    locality: {
      type: String
    },
    city: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now()
  },
  studentmarks: {
    type: Schema.Types.ObjectId,
    ref: "studentmarks"
  }
});

module.exports = Student = mongoose.model("students", StudentSchema);
