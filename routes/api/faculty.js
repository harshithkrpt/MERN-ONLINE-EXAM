const express = require("express"); // express import
const passport = require("passport");
// secret key
const key = require("../../config/keys").facultySecretKey;
// bcrypt
const bcrypt = require("bcryptjs");
// jwt
const jwt = require("jsonwebtoken");

// Faculty Modal
const Faculty = require("../../models/Faculty");

const router = express.Router();

const validateFacultyInput = require("../../validations/faculty");
const validateFacultyLoginInput = require("../../validations/faculty-login");

// Verify JWT TOKEN MIDDLEWARE
const verifyToken = require("../../middleware/facultylogin");

// @route POST api/faculty/
// @desc Adding Faculty and also Updating
// @access Private only for admins
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Athenticate the data
    const { errors, isValid } = validateFacultyInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    // GET FIELDS
    const facultyData = {};

    if (req.body.name) facultyData.name = req.body.name;
    if (req.body.email) facultyData.email = req.body.email;
    if (req.body.password) facultyData.password = req.body.password;
    if (req.body.idcardnumber) facultyData.idcardnumber = req.body.idcardnumber;
    if (req.body.hiringdate) facultyData.hiringdate = req.body.hiringdate;
    if (req.body.qualification)
      facultyData.qualification = req.body.qualification;
    if (req.body.branch) facultyData.branch = req.body.branch;
    if (req.body.dob) facultyData.dob = req.body.dob;
    if (req.body.mobilenumber) facultyData.mobilenumber = req.body.mobilenumber;
    if (req.body.sex) facultyData.sex = req.body.sex;
    if (req.body.salary) facultyData.salary = req.body.salary;
    facultyData.address = {};
    if (req.body.address.pincode)
      facultyData.address.pincode = req.body.address.pincode;
    if (req.body.address.state)
      facultyData.address.state = req.body.address.state;
    if (req.body.address.city) facultyData.address.city = req.body.address.city;
    if (req.body.address.locality)
      facultyData.address.locality = req.body.address.locality;

    Faculty.findOne({ idcardnumber: req.body.idcardnumber }).then(faculty => {
      if (faculty) {
        errors.idcardnumber = "Id Card Number is Already in Use";
        return res.status(401).json(errors);
      } else {
        // hashpassword
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(facultyData.password, salt, (err, hash) => {
            if (err) throw err;
            facultyData.password = hash;
            new Faculty(facultyData)
              .save()
              .then(faculty => {
                const { password, ...wop } = faculty;
                return res.json({ wop });
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

// @route POST api/faculty/login
// @desc Logining In Faculty
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateFacultyLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { idcardnumber, password } = req.body;

  Faculty.findOne({ idcardnumber }).then(faculty => {
    if (!faculty) {
      errors.userId = "Faculty Not Found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt
      .compare(password, faculty.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            idcardnumber: faculty.idcardnumber,
            name: faculty.name,
            branch: faculty.branch
          };

          // Create JWT
          // Sign Token - User
          jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
            res.json({ success: true, token: "StaffBearer " + token });
          });
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      })
      .catch(err => console.log(err));
  });
});

// @route POST api/faculty/protected
// @desc Student Protected Routes
// @access Private for LoggedInStudents
router.get("/protected", verifyToken, (req, res) => {
  return res.json({
    success: true,
    protected: true,
    idcardnumber: req.faculty.idcardnumber,
    name: req.faculty.name,
    branch: req.faculty.branch
  });
});

module.exports = router;
