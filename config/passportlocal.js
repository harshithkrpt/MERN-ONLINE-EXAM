const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load Student model
const Student = require("../models/Student");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "userId" }, (userId, password, done) => {
      // Match Student
      Student.findOne({
        hallticketnumber: userId
      }).then(student => {
        if (!student) {
          return done(null, false, { message: "UserID is not Found | Valid" });
        }

        // Match password
        bcrypt.compare(password, student.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, student);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser(function(student, done) {
    done(null, student.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, student) {
      done(err, student);
    });
  });
};
