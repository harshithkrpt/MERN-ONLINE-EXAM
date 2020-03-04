//otplib
const otplib = require("otplib");

// Create Otp Function
const createOtp = () => {
  const secret = otplib.authenticator.generateSecret();
  return otplib.authenticator.generate(secret);
};

module.exports = {
  createOtp
};
