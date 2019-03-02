//Validator for checking whether data is valid or not
const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function valiidateOnlinePaperInput(data) {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
