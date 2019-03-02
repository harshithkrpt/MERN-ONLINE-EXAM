const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function valiidateRegisterInput(data) {
  let errors = {};

  // making the nan , {} , undefined , null to "" for validator
  // is empty function
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 6, max: 20 }))
    errors.name = "Name must be between 6 and 20 characters";

  if (Validator.isEmpty(data.name)) errors.name = "Name Field is Required";

  if (!Validator.isEmail(data.email))
    errors.email = "Enter a valid Email Address";

  if (Validator.isEmpty(data.email)) errors.email = "Email Field is Required";

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6-30 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
    errors.password2 = "Password must be between 6-30 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
