const jwt = require("jsonwebtoken");
const key = require("../config/keys").onlineSecretKey;
const Student = require("../models/Student");

module.exports = verifyToken;

function verifyToken(req, res, next) {
  //get auth token
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, key, (err, authData) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      Student.findOne({ hallticketnumber: authData.userId })
        .then(student => {
          if (!student) return res.status(403).json({ message: "Forbidden" });
          req.student = authData;
          next();
        })
        .catch(err => console.log(err));
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
