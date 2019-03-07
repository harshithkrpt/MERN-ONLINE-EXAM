const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validityFinalSubmit(data) {
  let errors = {};

  // making the nan , {} , undefined , null to "" for validator
  // is empty function
  data.examId = !isEmpty(data.examId) ? data.examId : "";
  data.paperIndex = !isEmpty(data.paperIndex) ? data.paperIndex : "";
  data.examname = !isEmpty(data.examname) ? data.examname : "";
  data.student_options = !isEmpty(data.student_options)
    ? data.student_options
    : [];

  if (Validator.isEmpty(data.examId)) {
    errors.examId = "Exam Id is required";
  }

  if (Validator.isEmpty(data.examname)) {
    errors.examname = "Exam Name field is required";
  }

  if (Validator.isEmpty(data.paperIndex)) {
    errors.paperIndex = "Paper Index is required";
  }

  if (data.student_options.length !== 20) {
    errors.student_options = "Studdent Should Answer 20 Questions";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
