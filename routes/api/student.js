// all these routes are get routes

// router for student api
const express = require("express"); // express import
const passport = require("passport");

const Student = require("../../models/Student");
const StudentMarks = require("../../models/StudentMarks");

const router = express.Router();

const validateStudentInput = require("../../validations/student");

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
                "This hall Ticket Number Already Exists";
            }

            // Save
            new Student(studentData)
              .save()
              .then(student => res.json(student))
              .catch(err => console.log(err));
          });
        }
      }
    );
  }
);

module.exports = router;
