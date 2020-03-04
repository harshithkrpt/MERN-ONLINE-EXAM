const isEmpty = require("./is-empty");
const Validator = require("validator");
const isDate = require("./is-date");

module.exports = function validateFacultyInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.idcardnumber = !isEmpty(data.idcardnumber) ? data.idcardnumber : "";
  data.hiringdate = !isEmpty(data.hiringdate) ? data.hiringdate : "";
  data.qualification = !isEmpty(data.qualification) ? data.qualification : "";
  data.branch = !isEmpty(data.branch) ? data.branch : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : "";
  data.sex = !isEmpty(data.sex) ? data.sex : "";
  data.salary = !isEmpty(data.salary) ? data.salary : "";
  data.address = !isEmpty(data.address) ? data.address : {};
  data.address.pincode = !isEmpty(data.address.pincode)
    ? data.address.pincode
    : "";
  data.address.state = !isEmpty(data.address.state) ? data.address.state : "";
  data.address.locality = !isEmpty(data.address.locality)
    ? data.address.locality
    : "";
  data.address.city = !isEmpty(data.address.city) ? data.address.city : "";

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

  if (!Validator.isLength(data.idcardnumber, { min: 10, max: 10 })) {
    errors.userid = "Faculty Id must be between 10 characters";
  }

  if (Validator.isEmpty(data.idcardnumber)) {
    errors.userid = "Faculty Id field is required";
  }

  if (!isDate(data.hiringdate)) {
    errors.hiringdate = "Enter a valid date";
  }

  if (Validator.isEmpty(data.hiringdate)) {
    errors.hiringdate = "HiringDate field is required";
  }

  if (Validator.isEmpty(data.qualification)) {
    errors.qualification = "Qualification field is required";
  }

  if (Validator.isEmpty(data.branch)) {
    errors.branch = "Branch field is required";
  }

  if (!isDate(data.dob)) {
    errors.dob = "Enter a valid date";
  }

  if (Validator.isEmpty(data.dob)) {
    errors.dob = "DOB field is required";
  }

  if (Validator.isEmpty(data.mobilenumber)) {
    errors.mobilenumber = "Mobile Number field is required";
  }

  if (Validator.isEmpty(data.sex)) {
    errors.sex = "SEX/GENDER field is required";
  }

  if (Validator.isEmpty(data.address.city)) {
    errors.city = "City field is required";
  }

  if (Validator.isEmpty(data.address.pincode)) {
    errors.pincode = "PinCode field is required";
  }

  if (Validator.isEmpty(data.address.state)) {
    errors.state = "State field is required";
  }

  if (Validator.isEmpty(data.address.locality)) {
    errors.address.locality = "Locality field is required";
  }

  if (Validator.isEmpty(data.salary)) {
    errors.salary = "Salary field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
