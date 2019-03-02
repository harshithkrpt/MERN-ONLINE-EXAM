// Route for creating , updating , editing & Deleting a paper
const express = require("express");
const route = express.Router();
const passport = require("passport");

// @route POST /online-exam/online-paper/
// @desc Uploading Online Papers for the Online Exams
// @access Private - Secured
route.post(
  "/online-paper",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ name: "Harshith" });
  }
);

module.exports = route;
