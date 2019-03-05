const express = require("express");
const key = require("../../config/keys").onlineSecretKey;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");
const router = express.Router();
const verifyToken = require("../../middleware/onlineexamlogin");

const validateStudentLoginInput = require("../../validations/student-login");

// @route POST online/login
// @desc Logining In Student For Online Exam
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateStudentLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const hallticketnumber = req.body.userId;
  const password = req.body.password;
  Student.findOne({ hallticketnumber: hallticketnumber }).then(student => {
    if (!student) {
      errors.userId = "Student Not Found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt
      .compare(password, student.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            userId: student.hallticketnumber,
            name: student.name,
            dob: student.dob
          };
          // Create JWT
          // Sign Token - User
          jwt.sign(payload, key, { expiresIn: 1400 }, (err, token) => {
            res.json({ success: true, token: "OnlineStudentBearer " + token });
          });
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      })
      .catch(err => console.log(err));
  });
});

// @route POST online/protected
// @desc OnlineExam Protected Routes
// @access Private for LoggedInStudents
router.get("/protected", verifyToken, (req, res) => {
  return res.json({
    success: true,
    protected: true,
    userId: req.student.userId,
    name: req.student.name
  });
});

module.exports = router;
