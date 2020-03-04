const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateResultInput(data) {
  let errors = {};

  // drop down
  data.branch = !isEmpty(data.branch) ? data.branch : "";

  if (Validator.isEmpty(data.branch))
    errors.branch = "Branch Field is Required";

  data.rollnumber = !isEmpty(data.rollnumber) ? data.rollnumber : "";

  if (Validator.isEmpty(data.rollnumber))
    errors.rollnumber = "Roll Number Field is Required";

  data.results = !isEmpty(data.results) ? data.results : [];
  data.results[0] = !isEmpty(data.results[0]) ? data.results[0] : [];
  data.results[0][0] = !isEmpty(data.results[0][0]) ? data.results[0][0] : {};
  //   this will be a form with a dynamic fields for code gpa
  data.results.forEach(semister => {
    semister.forEach(subject => {
      // making code , subjectname , alltedcredts
      subject.code = !isEmpty(subject.code) ? subject.code : "";
      subject.obtainedcredits = !isEmpty(subject.obtainedcredits)
        ? subject.obtainedcredits
        : "";
      subject.excludedcredits = !isEmpty(subject.excludedcredits)
        ? subject.excludedcredits
        : "";
      subject.gpa = !isEmpty(subject.gpa) ? subject.gpa : "";
      subject.allotedcredits = !isEmpty(subject.allotedcredits)
        ? subject.allotedcredits
        : "";

      if (Validator.isEmpty(subject.obtainedcredits))
        errors.subjectname = "One/More Obtainer Credits Field's are Missing";
      if (Validator.isEmpty(subject.code))
        errors.code = "One/More Subject Code Field's are Missing";
      if (Validator.isEmpty(subject.excludedcredits))
        errors.excludedcredits =
          "One/More Excluded Credits Field's are Missing";
      if (Validator.isEmpty(subject.gpa))
        errors.gpa = "One/More GPA Field's are Missing";
      if (Validator.isEmpty(subject.allotedcredits))
        errors.allotedcredits = "One/More Alloted Credits Field's are Missing";
    });
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
