// OTP

// const otplib = require("otplib");
// const secret = otplib.authenticator.generateSecret();
// console.log(secret);
// const token = otplib.authenticator.generate(secret);
// console.log(token);
// let isValid = otplib.authenticator.check(token, secret);
// isValid = otplib.authenticator.verify({ token, secret });
// console.log(isValid);

const arry = [];
let i = 0;
for (i = 0; i < 20; i++) {
  arry[i] = [];
  let j = 0;
  for (j = 0; j < 20; j++) {
    arry[i][j] = Math.floor(Math.random() * 125);
  }
}

console.log(arry);
