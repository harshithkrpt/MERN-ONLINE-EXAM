const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentLoginInput(data) {
  let errors = {};

  //Check Inputs
  data.error = !isEmpty(data.error) ? data.error : "";
  data.correct = !isEmpty(data.correct) ? data.correct : "";

  if (Validator.isEmpty(data.error)) {
    errors.error = "Error Field is empty";
  }

  if (Validator.isEmpty(data.correct)) {
    errors.correct = "CorrectTo Field is empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
