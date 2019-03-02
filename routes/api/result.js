// ROUTE for Student Results

// Subject Field Model Routes
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Result = require("../../models/Result");
const Student = require("../../models/Student");

// Validations For this File
const validateResultsInput = require("../../validations/results");

// @route POST api/result
// @desc Uploading Result of a Student | Updating Results  if Wanted (Rare) - Recorrection
// @access Private - Secured

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check For Validations
    let { errors, isValid } = validateResultsInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    // Check Fields
    let resultData = {};

    // Check For Every Field And Add then to Object
    if (req.body.branch) resultData.branch = req.body.branch;
    if (req.body.rollnumber) resultData.rollnumber = req.body.rollnumber;

    resultData.results = [];
    resultData.sgpas = [];

    req.body.results.forEach((semister, indexX) => {
      resultData.results[indexX] = [];

      let totalCredits = 0;
      let obtainedTotalCredits = 0;

      semister.forEach((subject, indexY) => {
        resultData.results[indexX][indexY] = {};

        resultData.results[indexX][indexY].code = subject.code;
        resultData.results[indexX][indexY].obtainedcredits =
          subject.obtainedcredits;
        resultData.results[indexX][indexY].excludedcredits =
          subject.excludedcredits;
        resultData.results[indexX][indexY].status = calculateStatus(
          subject.gpa
        );
        resultData.results[indexX][indexY].gpa = subject.gpa;
        resultData.results[indexX][indexY].allotedcredits =
          subject.allotedcredits;

        let gpa = calculateGpa(subject.gpa.toUpperCase());
        let obtainedcredit = parseInt(subject.obtainedcredits);
        let excludedcredit = parseInt(subject.excludedcredits);
        let finalcredit = obtainedcredit - excludedcredit;
        obtainedTotalCredits += finalcredit * gpa;
        totalCredits += parseInt(subject.allotedcredits);
      });
      // convert to string
      resultData.sgpas[indexX] = (obtainedTotalCredits / totalCredits)
        .toPrecision(4)
        .toString();
    });

    Result.findOne({ rollnumber: req.body.rollnumber }).then(results => {
      if (results) {
        Result.findOneAndUpdate(
          { rollnumber: req.body.rollnumber },
          { $set: resultData },
          { new: true }
        )
          .then(result => res.json(result))
          .catch(err => {
            errors.main =
              "Cannot Update Results for " + req.body.rollnumber + "... ";
            res.status(400).json(errors);
          });
      } else {
        // Subject Create and Save

        Student.findOne({ rollnumber: req.body.rollnumber }).then(student => {
          if (!student) {
            errors.studentprofileerror =
              "Student Profile is not created / Invalid RollNumber ... ";

            res.status(400).json(errors);
          } else {
            new Result(resultData)
              .save()
              .then(result => res.json(result))
              .catch(err => console.log(err));
          }
        });
      }
    });
  }
);

function calculateGpa(gpa) {
  switch (gpa) {
    case "O":
      return 10;
    case "A+":
      return 9;
    case "A":
      return 8;
    case "B+":
      return 7;
    case "B":
      return 6;
    case "C":
      return 5;
    case "F":
      return 0;
    case "ABS":
      return 0;
    default:
      return 0;
  }
}

function calculateStatus(gpa) {
  switch (gpa) {
    case "O":
    case "A+":

    case "A":

    case "B+":

    case "B":

    case "C":
      return "P";
    case "F":
      return "F";
    case "ABS":
      return "F";
    default:
      return "S";
  }
}

module.exports = router;
