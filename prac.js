const otplib = require("otplib");
const secret = otplib.authenticator.generateSecret();
console.log(secret);
const token = otplib.authenticator.generate(secret);
console.log(token);
let isValid = otplib.authenticator.check(token, secret);
isValid = otplib.authenticator.verify({ token, secret });
console.log(isValid);
