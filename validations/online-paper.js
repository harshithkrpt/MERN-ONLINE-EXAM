//Validator for checking whether data is valid or not
const isEmpty = require("./is-empty");
const Validator = require("validator");
const isDate = require("./is-date");

module.exports = function valiidateOnlinePaperInput(data) {
  let errors = {};

  data.branch = !isEmpty(data.branch) ? data.branch : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.semister = !isEmpty(data.semister) ? data.semister : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";

  if (isEmpty(data.questions)) data.questions = [];
  if (data.questions.length === 0) {
    errors.questions = "Questions Field is Required";
  }

  // check  date MM -/ DD -/ YYY
  if (!isDate(data.date)) errors.date = "Date Field is Invalid";
  if (Validator.isEmpty(data.year)) errors.year = "Year Field is Required";
  if (Validator.isEmpty(data.year)) errors.year = "Year Field is Required";
  if (Validator.isEmpty(data.semister))
    errors.semister = "Semister Field is Required";
  if (Validator.isEmpty(data.subject))
    errors.subject = "Subject Field is Required";

  // Checking every question
  data.questions.forEach(question => {
    question.question = !isEmpty(question.question) ? question.question : "";
    if (Validator.isEmpty(question.question))
      errors.question = "Question Should not be Empty";

    if (question.options.length !== 4) {
      errors.options = "Question Should have 4 options";
    }
    question.options.forEach(option => {
      option = !isEmpty(option) ? option : "";
      if (Validator.isEmpty(option))
        errors.options = "One/More Option are Missing";
    });
    question.answer = !isEmpty(question.answer) ? question.answer : "";
    if (!Validator.isLength(question.answer, { min: 1, max: 1 }))
      errors.answer = "Answer Field is Required";
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
