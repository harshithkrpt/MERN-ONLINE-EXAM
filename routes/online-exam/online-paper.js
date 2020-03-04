// Route for creating , updating , editing & Deleting a paper
const express = require("express");
const route = express.Router();
const passport = require("passport");

// Modal
const QuestionPaper = require("../../models/onlineexam/QuestionPaper");
// Validations
const QuestionPaperValidation = require("../../validations/online-paper");

// @route POST /online-exam/online-paper/
// @desc Uploading Papers for the Online Exams
// @access Private - Secured
route.post(
  "/online-paper",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validations
    let { errors, isValid } = QuestionPaperValidation(req.body);
    if (!isValid) return res.status(400).json(errors);

    //Find From DataBase
    QuestionPaper.findOne({
      year: req.body.year,
      branch: req.body.branch,
      subject: req.body.subject,
      semister: req.body.semister
    }).then(paper => {
      if (paper)
        return res
          .status(400)
          .json({ common: "Question Paper Already Created " });

      // Organize the data and only store the required fields
      let questionpaperData = {};
      if (req.body.branch) questionpaperData.branch = req.body.branch;
      if (req.body.date) questionpaperData.date = new Date(req.body.date);
      if (req.body.year) questionpaperData.year = req.body.year;
      if (req.body.semister) questionpaperData.semister = req.body.semister;
      if (req.body.subject) questionpaperData.subject = req.body.subject;
      questionpaperData.questions = req.body.questions.filter(question => {
        if (
          question.question &&
          question.options.length === 4 &&
          question.answer
        ) {
          if (Object.keys(question).length === 3) {
            return true;
          }
        }
      });
      new QuestionPaper(questionpaperData)
        .save()
        .then(result => res.json(result))
        .catch(err => console.log(err));
    });
  }
);

module.exports = route;
