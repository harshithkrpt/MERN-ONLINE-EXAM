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
const Student = require("../../models/Student");
const PassPercentage = require("../../models/PassPercentage");
const Subject = require("../../models/Subject");
const Result = require("../../models/Result");

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
      errors.email = "Admin Not Found";
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

// @route GET api/admin/current
// @desc Current User Details
// @access Private
router.get(
  "/getstudents/:year/:branch",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Do the validations
    const year = req.params.year.toString();
    const branch = req.params.branch.toString();

    Student.find({ year, branch })
      .then(students => {
        if (!students)
          return res.status(404).json({ notfound: "Students Not Found" });
        const resData = [];
        students.forEach((student, index) => {
          resData[index] = {};
          resData[index].hallticketnumber = student.hallticketnumber;
          resData[index].batch = student.batch;
          resData[index].age = student.age;
          resData[index].caste = student.caste;
          resData[index].category = student.category;
          resData[index].name = student.name;
          resData[index].fathername = student.fathername;
          resData[index].mothername = student.mothername;
          resData[index].studentemail = student.studentemail;
          resData[index].studentmobilenumber = student.studentmobilenumber;
          resData[index].parentmobilenumber = student.parentmobilenumber;
          resData[index].admindate = student.admindate;
          resData[index].dob = student.dob;
          resData[index].address = { ...student.address };
          resData[index].id = student._id;
        });
        return res.json(resData);
      })
      .catch(err => console.log(err));
  }
);

// @route POST api/admin/passpercentage
// @desc Current User Details
// @access Private
router.post(
  "/passpercentage/:year/:branch",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const year = req.params.year.toString();
    const branch = req.params.branch.toString();

    PassPercentage.findOne({ year, branch })
      .then(passpercentage => {
        if (passpercentage)
          return res.status(403).json({
            notallowed:
              "Already Passpercetage of " +
              year +
              " " +
              branch +
              " is Calculated"
          });

        //if not found calculation
        Student.find({ branch: branch !== "all" ? branch : null })
          .select("hallticketnumber studentmarks")
          .populate("studentmarks")
          .then(students => {
            if (students.length === 0)
              return res
                .status(404)
                .json({ notallowed: "Students Are Not Found" });
            let num_of_subjects_failed = 0;
            let total_subjects = 0;
            let total_number_of_credits_obtained = 0;
            let total_number_of_alloted = 0;
            const subjects_wise_failures = 0;
            const total_no_of_failed_students = 0;
            const total_number_of_students = 0;
            students.forEach(student => {
              if (!student.studentmarks)
                return res.status(403).json({
                  notallowed:
                    "Pass Percentage Cannot Be Calculated Now.Subject Every Student's Marks"
                });
              let subjectscopy;
              let semresultscopy;
              if (!student.studentmarks.branchsubjects)
                return res.status({
                  ins: "Branch Subject Id is not Found in Student Property"
                });
              if (!student.studentmarks.semresults)
                return res.status({
                  ins: "Semister Results Id is not Found in Student Property"
                });
              // TODO TRY ANOTHER WAY Route Not Completed
              return res.json({});
              // Subject.findById(student.studentmarks.branchsubjects)
              //   .then(subjects => {
              //     subjectscopy = { ...subjects };
              //     Result.findById(student.studentmarks.semresults)
              //       .then(semresult => {
              //         semresultscopy = { ...semresult };

              //         return res.json({
              //           students,
              //           subjectscopy,
              //           semresultscopy
              //         });
              //       })
              //       .catch(err => console.log(err));
              //   })
              //   .catch(err => console.log(err));
            });
          });
      })
      .catch(err => console.log(err));
  }
);

// @route GET api/admin/current
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
