//otplib
const otplib = require("otplib");
const CreateExam = require("../models/onlineexam/CreateExam");
// Create Otp Function
const createOtp = () => {
  const secret = otplib.authenticator.generateSecret();
  return otplib.authenticator.generate(secret);
};

const checkOtp = stuotp => stuotp === otp;

module.exports = {
  createOtp,
  checkOtp
};
