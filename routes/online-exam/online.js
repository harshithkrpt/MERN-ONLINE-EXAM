const express = require("express");
const key = require("../../config/keys").onlineSecretKey;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");
const router = express.Router();
const verifyToken = require("../../middleware/onlineexamlogin");
const checkOtp = require("../../common/otp").checkOtp;

// Import QuestionPaper and CreateExam
const QuestionPaper = require("../../models/onlineexam/QuestionPaper");
const CreateExam = require("../../models/onlineexam/CreateExam");

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
    if (student.iswritingexam === false) {
      errors.notallowed = "No Exams are Conducted Now For You";
      return res.status(403).json(errors);
    }
    // Check Password
    bcrypt
      .compare(password, student.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            userId: student.hallticketnumber,
            name: student.name,
            dob: student.dob,
            branch: student.branch,
            year: student.year
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

// @route POST online/writeexam
// @desc OnlineExam Protected Routes
// @access Private for LoggedInStudents
router.post("/writeexam", verifyToken, (req, res) => {
  if (!req.body.otp) return res.status(401).json({ opt: "Please Enter a otp" });
  let isValid = checkOtp(req.body.otp);
  // if (!isValid) return res.status(401).json({ otp: "Invalid OTP" });

  //Get Question Papers
  QuestionPaper.findOne({ branch: req.student.branch, year: req.student.year })
    .then(questionpaper => {
      if (!questionpaper)
        return res.status(401).json({ online: "Question Paper Not Found" });
      CreateExam.findOne({ examid: questionpaper._id }).then(exam => {
        if (!exam)
          return res
            .status(401)
            .json({ online: "You Cannot Write the exam now" });
        const { questions } = questionpaper;
        // Random Question Paper of 20
        const index = Math.floor(Math.random() * 20);
        const examData = {};
        const questions_row_index_array = exam.questionpapers[index];
        examData.questions = [];
        for (let i = 0; i < 20; i++) {
          examData.questions[i] = {};
          examData.questions[i].question =
            questions[questions_row_index_array[i]].question;
          examData.questions[i].options =
            questions[questions_row_index_array[i]].options;
        }
        examData.paperIndex = index;
        return res.json(examData);
      });
    })
    .catch(err => console.log(err));
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
