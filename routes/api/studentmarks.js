const express = require("express");
const route = express.Router();
const passport = require("passport");

const StudentMarks = require("../../models/StudentMarks");
const Subject = require("../../models/Subject");
const Result = require("../../models/Result");
const Student = require("../../models/Student");
//verify token
const verifyToken = require("../../middleware/studentlogin");

const validateStudentMarksInput = require("../../validations/studentmarks");

// @route POST api/studentmarks
// @desc Check and Calculate the Student Marks if exists Then Allow Them to Update

// @access Private

route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validation
    let { errors, isValid } = validateStudentMarksInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    // Collect The Data
    const branch = req.body.branch;
    const rollnumber = req.body.rollnumber;

    // Check whether branch exists
    Subject.findOne({ branch })
      .then(subject => {
        if (subject) {
          // if branch subjects exists
          Result.findOne({ rollnumber })
            .then(result => {
              if (result) {
                // if the result for rollnumber exists
                StudentMarks.findOne({ rollnumber }).then(studentmarks => {
                  // Calculate Cgpa for Update and Create
                  function calculatecgp(result, subject) {
                    let cgpa = 0;
                    let creditsobtained = 0;
                    let overallcredits = 0;
                    let sems = result.results.length;

                    result.results.forEach((sem, index) => {
                      sem.forEach(sub => {
                        creditsobtained += parseInt(sub.obtainedcredits);
                        overallcredits += parseInt(sub.allotedcredits);
                      });
                      cgpa += parseFloat(result.sgpas[index]);
                    });

                    cgpa = (cgpa / sems).toPrecision(3);

                    return {
                      cgpa: cgpa.toString(),
                      creditsobtained: creditsobtained.toString(),
                      overallcredits: overallcredits.toString(),
                      rollnumber: rollnumber,
                      branchsubjects: subject._id,
                      semresults: result._id
                    };
                  }
                  let studentMarksData = calculatecgp(result, subject);
                  if (studentmarks) {
                    StudentMarks.findOneAndUpdate(
                      { rollnumber },
                      { $set: studentMarksData },
                      { new: true }
                    )
                      .populate("branchsubjects")
                      .populate("semresults")
                      .then(stdmarks => res.json(stdmarks))

                      .catch(err => console.log(err));
                  } else {
                    // Update Stdent
                    new StudentMarks(studentMarksData)
                      .save()
                      .then(stdmarks => {
                        Student.updateOne(
                          { hallticketnumber: rollnumber },
                          { studentmarks: stdmarks._id }
                        ).then(student => {
                          if (student.n == 0)
                            return res
                              .status(500)
                              .json({ ine: "Internal Server Error" });
                          return res.json(stdmarks);
                        });
                      })
                      .catch(err =>
                        console.log(
                          "Student Marks Error in /api/admin/studentmarks @post : " +
                            err
                        )
                      );
                  }
                });
              } else {
                errors.subjectnotfound =
                  "Roll Number " +
                  rollnumber +
                  " is Not Found | Not Created ...";
                return res.status(400).json(errors);
              }
            })
            .catch(err =>
              console.log(
                "Result Error in /api/admin/studentmarks @post : " + err
              )
            );
        } else {
          errors.subjectnotfound = "Branch " + branch + " is Not Found...";
          return res.status(400).json(errors);
        }
      })
      .catch(err =>
        console.log("Subject Error in /api/admin/studentmarks @post : " + err)
      );
  }
);

// @route GET api/studentmarks/
// @desc GET STUDENT OVERALL MARKS
// @access Private for LoggedInStudents
route.get("/", verifyToken, (req, res) => {
  StudentMarks.findOne({ rollnumber: req.student.userId })
    .populate("branchsubjects")
    .populate("semresults")
    .then(studentmarks => {
      if (!studentmarks)
        return res.status(404).json({
          notfound:
            req.student.userId +
            "marks are are not found | cannot be displayed now"
        });
      return res.json(studentmarks);
    })
    .catch(err => console.log(err));
});

module.exports = route;
