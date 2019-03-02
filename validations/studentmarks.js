// Validator For Uploading Student Marks for a student

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentsMarksInput(data) {
  let errors = {};

  data.rollnumber = !isEmpty(data.rollnumber) ? data.rollnumber : "";
  data.branch = !isEmpty(data.branch) ? data.branch : "";

  if (!Validator.isLength(data.rollnumber, { min: 10, max: 10 }))
    errors.rollnumber = "Enter a Valid RollNumber";

  if (Validator.isEmpty(data.rollnumber))
    errors.rollnumber = "Roll Number Field is Required";

  if (Validator.isEmpty(data.branch))
    errors.branch = "Branch Field is Required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
