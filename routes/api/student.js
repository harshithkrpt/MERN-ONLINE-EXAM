// all these routes are get routes

// router for student api
const express = require("express"); // express import
const passport = require("passport");
// secret key
const key = require("../../config/keys").studentsecretKey;
// bcrypt
const bcrypt = require("bcryptjs");
// jwt
const jwt = require("jsonwebtoken");

const Student = require("../../models/Student");
const StudentMarks = require("../../models/StudentMarks");
const ReportError = require("../../models/ReportError");
const OnlineResults = require("../../models/onlineexam/OnlineResults");
const router = express.Router();

const validateStudentInput = require("../../validations/student");
const validateStudentLoginInput = require("../../validations/student-login");
const validateReportErrorInput = require("../../validations/report-error");
// Verify JWT TOKEN MIDDLEWARE
const verifyToken = require("../../middleware/studentlogin");

// @route POST api/student/
// @desc Adding Student and also Updating
// @access Private only for admins
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Athenticate the data
    const { errors, isValid } = validateStudentInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    // GET FIELDS
    const studentData = {};
    if (req.body.hallticketnumber)
      studentData.hallticketnumber = req.body.hallticketnumber;
    if (req.body.batch) studentData.batch = req.body.batch;
    if (req.body.age) studentData.age = req.body.age;
    if (req.body.caste) studentData.caste = req.body.caste;
    if (req.body.category) studentData.category = req.body.category;
    if (req.body.name) studentData.name = req.body.name;
    if (req.body.fathername) studentData.fathername = req.body.fathername;
    if (req.body.mothername) studentData.mothername = req.body.mothername;
    if (req.body.studentemail) studentData.studentemail = req.body.studentemail;
    if (req.body.branch) studentData.branch = req.body.branch;
    if (req.body.studentmobilenumber)
      studentData.studentmobilenumber = req.body.studentmobilenumber;
    if (req.body.parentmobilenumber)
      studentData.parentmobilenumber = req.body.parentmobilenumber;
    studentData.address = {};
    if (req.body.pincode) studentData.address.pincode = req.body.pincode;
    if (req.body.state) studentData.address.state = req.body.state;
    if (req.body.city) studentData.address.city = req.body.city;
    if (req.body.locality) studentData.address.locality = req.body.locality;

    // date fields as date type
    if (req.body.admindate)
      studentData.admindate = new Date(req.body.admindate);
    if (req.body.dob) studentData.dob = new Date(req.body.dob);

    // if success then come here
    // check in data base for this student
    Student.findOne({ hallticketnumber: req.body.hallticketnumber }).then(
      student => {
        if (student) {
          // Update with student marks if exists
          StudentMarks.findOne({ rollnumber: req.body.hallticketnumber })
            .then(studentmarks => {
              if (studentmarks) {
                // Student Marks Exists SO add the reference link
                studentData.studentmarks = studentmarks._id;
              }
              Student.findOneAndUpdate(
                { hallticketnumber: req.body.hallticketnumber },
                { $set: studentData },
                { new: true }
              )
                .populate("studentmarks", ["cgpa"])
                .then(student => res.json(student));
            })
            .catch(err => console.log("Update ERROR /POST api/student/" + err));
        } else {
          // create
          Student.findOne({
            hallticketnumber: studentData.hallticketnumber
          }).then(student => {
            if (student) {
              errors.hallticketnumber =
                "This Hall Ticket Number Already Exists";
            }

            // hashpassword
            studentData.password = studentData.hallticketnumber;
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(studentData.password, salt, (err, hash) => {
                if (err) throw err;
                studentData.password = hash;
                new Student(studentData)
                  .save()
                  .then(student => res.json(student))
                  .catch(err => console.log(err));
              });
            });
          });
        }
      }
    );
  }
);

// @route POST api/student/login
// @desc Logining In Student
// @access Public For Students to view the marks
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
            name: student.name
          };
          // Create JWT
          // Sign Token - User
          jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
            res.json({ success: true, token: "StudentBearer " + token });
          });
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      })
      .catch(err => console.log(err));
  });
});

// @route GET api/student/profile
// @desc Get the Student Profile
// @access Private for LoggedInStudents
router.get("/profile", verifyToken, (req, res) => {
  Student.findOne({ hallticketnumber: req.student.userId })
    .then(student => {
      let errors = {};

      if (!student) {
        errors.student = "Cannot get Student Profile";
        return res.status(401).json(errors);
      }
      // Response Data
      const resData = {};
      resData.hallticketnumber = student.hallticketnumber;
      resData.batch = student.batch;
      resData.age = student.age;
      resData.caste = student.caste;
      resData.category = student.category;
      resData.name = student.name;
      resData.fathername = student.fathername;
      resData.mothername = student.mothername;
      resData.studentemail = student.studentemail;
      resData.studentmobilenumber = student.studentmobilenumber;
      resData.parentmobilenumber = student.parentmobilenumber;
      resData.admindate = student.admindate;
      resData.dob = student.dob;
      resData.address = { ...student.address };
      resData.id = student._id;
      return res.json(resData);
    })
    .catch(err => console.log(err));
});

// @route POST api/student/profile/report
// @desc Report For Profile Errors
// @access Private for LoggedInStudents
router.post("/profile/report", verifyToken, (req, res) => {
  const { errors, isValid } = validateReportErrorInput(req.body);
  if (!isValid) return res.status(401).json(errors);
  ReportError.findOne({ rollnumber: req.student.userId })
    .then(report => {
      if (report)
        return res.status(403).json({
          notallowed:
            "You Have Already Reported , We Will Verify And Update Soon"
        });
      const reportData = {};
      reportData.rollnumber = req.student.userId;
      reportData.error = req.body.error;
      reportData.correct = req.body.correct;
      new ReportError(reportData)
        .save()
        .then(response =>
          res.json({
            success: "We Have Received Your Request We Will Update Soon"
          })
        )
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @route GET api/student/onlinemarks
// @desc Student Getting Online Marks
// @access Private for LoggedInStudents
router.get("/onlinemarks", verifyToken, (req, res) => {
  OnlineResults.findOne({ rollnumber: req.student.userId }).then(results => {
    if (!results)
      return res
        .status(404)
        .json({ notfound: "Your Online Results Are Not Found" });
    return res.json(results);
  });
});

// @route POST api/student/protected
// @desc Student Protected Routes
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
