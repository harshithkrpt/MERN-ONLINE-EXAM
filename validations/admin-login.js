const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function valiidateRegisterInput(data) {
  let errors = {};

  // making the nan , {} , undefined , null to "" for validator
  // is empty function
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email))
    errors.email = "Enter a valid Email Address";

  if (Validator.isEmpty(data.email)) errors.email = "Email Field is Required";

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6-30 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
