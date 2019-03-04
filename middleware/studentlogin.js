const jwt = require("jsonwebtoken");
const key = require("../config/keys").studentsecretKey;

module.exports = verifyToken;

function verifyToken(req, res, next) {
  //get auth token
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, key, (err, authData) => {
      if (err) res.status(403).json({ message: "Forbidden" });
      else {
        req.student = authData;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
