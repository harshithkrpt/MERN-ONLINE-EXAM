const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const StaffSchema = new Schema({
  idcardnumber: {
    // your hall ticket number
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: "noe"
  },
  hiringdate: {
    type: Date,
    required: true
  },
  qualification: {
    // joining batch years 2017-2018
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  dob: {
    // date of birth
    type: Date,
    required: true
  },
  name: {
    // name
    type: String,
    required: true
  },
  mobilenumber: {
    type: String,
    required: true
  },
  sex: {
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
  salary: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Student = mongoose.model("faculty", StaffSchema);
