const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateFacultyLoginInput(data) {
  let errors = {};

  // making the nan , {} , undefined , null to "" for validator
  // is empty function
  data.idcardnumber = !isEmpty(data.idcardnumber) ? data.idcardnumber : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.idcardnumber, { min: 10, max: 10 })) {
    errors.idcardnumber = "idcardnumber must be between 10 characters";
  }

  if (Validator.isEmpty(data.idcardnumber))
    errors.idcardnumber = "Id Card Number Field is Required";

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
