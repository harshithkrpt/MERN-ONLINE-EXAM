// these are the student validations

// imports the validation files
const Validator = require("validator");
const isEmpty = require("./is-empty");
const isDate = require("./is-date");

module.exports = function validatStudentDataInput(data) {
  let errors = {};

  //  making all the empty data to string or object
  data.hallticketnumber = !isEmpty(data.hallticketnumber)
    ? data.hallticketnumber
    : "";
  data.admindate = !isEmpty(data.admindate) ? data.admindate : "";
  data.batch = !isEmpty(data.batch) ? data.batch : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.caste = !isEmpty(data.caste) ? data.caste : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.fathername = !isEmpty(data.fathername) ? data.fathername : "";
  data.mothername = !isEmpty(data.mothername) ? data.mothername : "";
  data.studentemail = !isEmpty(data.studentemail) ? data.studentemail : "";
  data.branch = !isEmpty(data.branch) ? data.branch : "";
  data.parentmobilenumber = !isEmpty(data.parentmobilenumber)
    ? data.parentmobilenumber
    : "";
  data.studentmobilenumber = !isEmpty(data.studentmobilenumber)
    ? data.studentmobilenumber
    : "";
  data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.city = !isEmpty(data.city) ? data.city : "";

  // validate the fields
  if (!Validator.isLength(data.hallticketnumber, { min: 10, max: 10 }))
    errors.hallticketnumber = "Hallticket number must be of 10 characters";
  if (Validator.isEmpty(data.hallticketnumber))
    errors.hallticketnumber = "Hallticket field is required";

  if (!isDate(data.admindate)) errors.admindate = "Date is invalid";
  if (Validator.isEmpty(data.admindate))
    errors.admindate = "Date Field is Required";

  if (Validator.isEmpty(data.batch)) errors.batch = "Batch Field is Required";

  if (!isDate(data.dob)) errors.dob = "Date of Birth should be a valid Date";
  if (Validator.isEmpty(data.dob))
    errors.dob = "Date Of Birth Field is Required";

  if (!Validator.isInt(data.age)) errors.age = "Age Should be a Number";
  if (Validator.isEmpty(data.age)) errors.age = "Age Field is Required";

  // dropdown
  if (Validator.isEmpty(data.caste)) errors.caste = "Caste Field is Required";

  // dropdown
  if (Validator.isEmpty(data.category))
    errors.category = "Category Field is Required";

  if (Validator.isNumeric(data.name))
    errors.name = "Name Should not be Alpha Numeric";
  if (Validator.isEmpty(data.name)) errors.name = "Name Field is Required";

  if (Validator.isNumeric(data.fathername))
    errors.fathername = "Father Name Should not be Alpha Numeric";
  if (Validator.isEmpty(data.fathername))
    errors.fathername = "Fathername Field is Required";

  if (Validator.isNumeric(data.mothername))
    errors.mothername = "Mother Name Should not be Alpha Numeric";
  if (Validator.isEmpty(data.mothername))
    errors.mothername = "Mother Name Field is Required";

  if (!Validator.isEmail(data.studentemail))
    errors.studentemail = "Enter a Valid Email Address";
  if (Validator.isEmpty(data.studentemail))
    errors.studentemail = "Email Field is Required";

  // Drop Down
  if (Validator.isEmpty(data.branch))
    errors.branch = "Branch Field is Required";

  // number with country
  if (!Validator.isMobilePhone(data.studentmobilenumber))
    errors.studentmobilenumber = "Student Mobile Number Should be valid";
  if (Validator.isEmpty(data.studentmobilenumber))
    errors.studentmobilenumber = "Student Mobile Number Field is Required";

  if (!Validator.isMobilePhone(data.parentmobilenumber))
    errors.parentmobilenumber = "Parent Mobile Number Should be Valid";

  if (Validator.isEmpty(data.parentmobilenumber))
    errors.parentmobilenumber = "Parent Mobile Number Field is Required";

  // pincode state city
  if (!Validator.isLength(data.pincode, { min: 6, max: 6 }))
    errors.pincode = "Pincode Should be Valid";

  if (Validator.isEmpty(data.pincode))
    errors.pincode = "Pincode Field is Required";

  // drop down
  if (Validator.isEmpty(data.state)) errors.state = "State Field is Required";

  if (Validator.isEmpty(data.city))
    errors.city = "City/Address Field is Required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
