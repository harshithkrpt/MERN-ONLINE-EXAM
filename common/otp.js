//otplib
const otplib = require("otplib");

let otp = "";

// Create Otp Function
const createOtp = () => {
  const secret = otplib.authenticator.generateSecret();
  otp = otplib.authenticator.generate(secret);
  return otp;
};

const checkOtp = stuotp => stuotp === otp;

module.exports = {
  createOtp,
  checkOtp
};
