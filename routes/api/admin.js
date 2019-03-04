// this admin route will control the entire dashboard

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys").secretKey;

// Load Input Validation
const validateLoginInput = require("../../validations/admin-login");
const validateRegisterInput = require("../../validations/admin-register");

// import Router class
const router = express.Router();

// import Model Admin
const Admin = require("../../models/Admin");

// @route POST api/admin/register
// @desc Register Admin
// @access Private and Only LoggedIn Admin can create
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Admin.findOne({ email: req.body.email }).then(admin => {
      if (admin) {
        errors.email = "Email Field Already Exists";
        return res.status(400).json(errors);
      } else {
        const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) console.log(err);
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => res.json(admin))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

// @route POST api/admin/login
// @desc Login Admin by generating a token
// @access Private and removed once created a admin
router.post("/login", (req, res) => {
  // validate errors
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // extract email and password
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email }).then(admin => {
    if (!admin) {
      errors.email = "User Not Found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: admin.id, name: admin.name };

        // Create JWT
        // Sign Token - user secret key options
        jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route POST api/admin/current
// @desc Current User Details
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    });
  }
);

module.exports = router;
