// Subject Field Model Routes
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Subject = require("../../models/Subject");

// Validations For this File
const validateSubjectsInput = require("../../validations/subjects");

// @route POST api/subject
// @desc Creating Semister Subjects | Updating Subjects if Wanted (Rare)
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check For Validations
    let { errors, isValid } = validateSubjectsInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    // Check Fields
    let subjectData = {};

    // Check For Every Field And Add then to Object
    if (req.body.branch) subjectData.branch = req.body.branch;
    subjectData.semwisesubjects = [];
    req.body.semwisesubjects.forEach((semister, indexX) => {
      subjectData.semwisesubjects[indexX] = [];
      semister.forEach((subject, indexY) => {
        subjectData.semwisesubjects[indexX][indexY] = {};
        subjectData.semwisesubjects[indexX][indexY].code = subject.code;
        subjectData.semwisesubjects[indexX][indexY].subjectname =
          subject.subjectname;
        subjectData.semwisesubjects[indexX][indexY].allotedcredits =
          subject.allotedcredits;
      });
    });

    Subject.findOne({ branch: req.body.branch }).then(subjects => {
      if (subjects) {
        Subject.findOneAndUpdate(
          { branch: req.body.branch },
          { $set: subjectData },
          { new: true }
        )
          .then(subject => res.json(subject))
          .catch(err => {
            errors.main = "Cannot Update Subject ...";
            res.status(400).json(errors);
          });
      } else {
        // Subject Create and Save
        Subject.findOne({ branch: req.body.branch }).then(subject => {
          if (subject) {
            errors.main = "Subject Details Already Exists";
            res.status(400).json(errors);
          } else {
            new Subject(subjectData)
              .save()
              .then(subject => res.json(subject))
              .catch(err => console.log(err));
          }
        });
      }
    });
  }
);

module.exports = router;
