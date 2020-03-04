const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentLoginInput(data) {
  let errors = {};

  //Check Inputs
  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.userId, { min: 10, max: 10 })) {
    errors.userId = "User Id Field is invalid";
  }
  if (Validator.isEmpty(data.userId)) {
    errors.userId = "User Id Field is empty";
  }
  if (!Validator.isLength(data.password, { min: 10, max: 10 })) {
    errors.password = "Password Field is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
