// A File For Validating Subjects in the Date Base

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateSubjectInput(data) {
  let errors = {};

  // drop down
  data.branch = !isEmpty(data.branch) ? data.branch : "";

  if (Validator.isEmpty(data.branch))
    errors.branch = "Branch Field is Required";

  data.semwisesubjects = !isEmpty(data.semwisesubjects)
    ? data.semwisesubjects
    : [];
  data.semwisesubjects[0] = !isEmpty(data.semwisesubjects[0])
    ? data.semwisesubjects[0]
    : [];
  data.semwisesubjects[0][0] = !isEmpty(data.semwisesubjects[0][0])
    ? data.semwisesubjects[0][0]
    : {};
  //   this will be a form with a dynamic fields
  data.semwisesubjects.forEach(semister => {
    semister.forEach(subject => {
      // making code , subjectname , alltedcredts
      subject.code = !isEmpty(subject.code) ? subject.code : "";
      subject.subjectname = !isEmpty(subject.subjectname)
        ? subject.subjectname
        : "";
      subject.allotedcredits = !isEmpty(subject.allotedcredits)
        ? subject.allotedcredits
        : "";

      // TODO GET ERRORS FOR EACH MISSING ENTITY IN FUTURE
      if (Validator.isEmpty(subject.subjectname))
        errors.subjectname = "One/More Subject Name Field's are Missing";
      if (Validator.isEmpty(subject.code))
        errors.code = "One/More Subject Code Field's are Missing";
      if (Validator.isEmpty(subject.allotedcredits))
        errors.allotedcredits = "One/More Alloted Credit Field's are Missing";
    });
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
