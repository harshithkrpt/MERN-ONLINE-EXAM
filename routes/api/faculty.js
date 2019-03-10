const express = require("express"); // express import
const passport = require("passport");
// secret key
const key = require("../../config/keys").facultySecretKey;

// bcrypt
const bcrypt = require("bcryptjs");
// jwt
const jwt = require("jsonwebtoken");
const createOtp = require("../../common/otp").createOtp;
// Faculty Modal
const Faculty = require("../../models/Faculty");
// QuestionPaper Model
const QuestionPaper = require("../../models/onlineexam/QuestionPaper");
const Student = require("../../models/Student");

// CreateExam
const CreateExam = require("../../models/onlineexam/CreateExam");

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
            branch: faculty.branch,
            id: faculty._id
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

// @route GET api/faculty/profile
// @desc Faculty Profile
// @access Private for LoggedInFaculty
router.get("/profile", verifyToken, (req, res) => {
  Faculty.findById(req.faculty.id)
    .then(faculty => {
      if (!faculty)
        return res
          .status(404)
          .json({ notfound: "Faculty is Not Found Rare Error" });
      const resData = {};
      resData.date = faculty.date;
      resData.id = faculty._id;
      resData.name = faculty.name;
      resData.email = faculty.email;
      resData.idcardnumber = faculty.idcardnumber;
      resData.hiringdate = faculty.hiringdate;
      resData.qualification = faculty.qualification;
      resData.branch = faculty.branch;
      resData.dob = faculty.dob;
      resData.mobilenumber = faculty.mobilenumber;
      resData.sex = faculty.sex;
      resData.salary = faculty.salary;
      resData.pincode = faculty.address.pincode;
      resData.state = faculty.address.state;
      resData.city = faculty.address.city;
      resData.locality = faculty.address.locality;
      return res.json(resData);
    })
    .catch(err => console.log(err));
});

// @route POST api/faculty/questionpapers
// @desc Get The Online Question Papers
// @access Private for LoggedInFaculty
router.post("/questionpapers", verifyToken, (req, res) => {
  if (!req.body.branch)
    return res.status(404).json({ branch: "Please Select a valid Branch" });
  QuestionPaper.find({ branch: req.body.branch })
    .then(questionpapers => {
      if (questionpapers.length === 0)
        return res.status(404).json({
          notfound: `No Question Paper is Created as of now for ${
            req.body.branch
          }`
        });
      let resData = [];
      questionpapers.forEach((questionpaper, i) => {
        resData[i] = {
          branch: questionpaper.branch,
          id: questionpaper._id,
          date: questionpaper.date,
          year: questionpaper.year,
          semister: questionpaper.semister,
          subject: questionpaper.subject,
          mid: questionpaper.mid,
          examconducted: questionpaper.examconducted
        };
      });
      return res.json({ questionpapers: resData });
    })
    .catch(err => console.log(err));
});

// @route POST api/faculty/createexam
// @desc Create Exam
// @access Private for LoggedInFaculty
router.post("/createexam/:id", verifyToken, (req, res) => {
  QuestionPaper.findById(req.params.id)
    .then(questionpaper => {
      if (!questionpaper) {
        return res
          .status(401)
          .json({ questionpaper: "Question Paper Not Found" });
      }
      if (questionpaper.examconducted)
        return res
          .status(401)
          .json({ onlineexam: "Exam is Already Conducted | Running" });
      const length = questionpaper.questions.length;
      // TODO UNCOMMENT
      // if (length < 125) {
      //   return res.status(401).json({
      //     onlineexam:
      //       "Only " +
      //       length +
      //       " questions are in database need min 125 Questions"
      //   });
      // }
      CreateExam.findOne({ examid: questionpaper._id }).then(createexam => {
        if (createexam)
          return res.status(401).json({ onlineexam: "Exam Already Created" });
        // Creation of Create Exam Modal Data
        const createExamData = {};
        createExamData.questionpapers = [];
        createExamData.answers = [];
        createExamData.examname = questionpaper.subject;
        createExamData.otp = createOtp();
        for (let i = 0; i < 20; i++) {
          createExamData.questionpapers[i] = [];
          createExamData.answers[i] = [];
          for (let j = 0; j < 20; j++) {
            createExamData.questionpapers[i][j] = Math.floor(
              Math.random() * length
            );
            createExamData.answers[i][j] =
              questionpaper.questions[
                createExamData.questionpapers[i][j]
              ].answer;
          }
        }
        // EXAM AND FACULTY ID
        createExamData.facultyid = req.faculty.id;
        createExamData.examid = questionpaper._id;

        new CreateExam(createExamData)
          .save()
          .then(data => {
            // Find All Students Marke Them to Write the Exam
            Student.updateMany(
              { branch: questionpaper.branch, year: questionpaper.year },
              { iswritingexam: true, iscompletedexam: false }
            ).then(students => {
              if (students.n === 0)
                return res
                  .status(404)
                  .json({ onlineexam: "Students Not Found" });
              return res.json({ otp: data.otp });
            });
          })
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
});

// @route GET api/faculty/currentexams
// @desc Currently Running Exams
// @access Private for LoggedInFaculty
router.get("/currentexams", verifyToken, (req, res) => {
  CreateExam.find()
    .populate("examid")
    .then(exams => {
      if (exams.length === 0)
        return res
          .status("404")
          .json({ onlineexam: "No Exam is Conducted Now" });
      let resData = [];
      exams.forEach((exam, index) => {
        resData[index] = {};
        resData[index].id = exam._id;
        resData[index].examname = exam.examname;
        resData[index].otp = exam.otp;
        resData[index].facultyid = exam.facultyid;
        resData[index].branch = exam.examid.branch;
        resData[index].mid = exam.examid.mid;
        resData[index].year = exam.examid.year;
        resData[index].semister = exam.examid.semister;
        resData[index].examid = exam.examid._id;
      });
      return res.json(resData);
    });
});

// @route POST api/faculty/student_exam_error
// @desc Faculty Re Correcting Students to write Again
// @access Private for LoggedInFaculty
router.post("/student_exam_error", verifyToken, (req, res) => {
  CreateExam.findOne({ facultyid: req.faculty.id }).then(exam => {
    if (!exam)
      return res.status(401).json({ notallowed: "You Cannot do this action" });
    QuestionPaper.findById(exam.examid).then(paper => {
      if (!paper)
        return res.status(404).json({ notfound: "Question Paper Not Found" });
      Student.findOne({ hallticketnumber: req.body.rollnumber }).then(
        student => {
          if (!student)
            return res.status(404).json({ notfound: "Student Not Found" });
          if (
            student.branch !== questionpaper.branch ||
            student.year !== questionpaper.year
          )
            return res.status(403).json({
              notallowed:
                "This Student Cannot Write this Exam Either Different Branch | Year"
            });
          Student.updateOne(
            { hallticketnumber: req.body.rollnumber },
            { iscompletedexam: false, iswritingexam: true }
          )
            .then(student => {
              if (student) {
                return res.json({ success: "Student Can Write Again " });
              }
              return res.json({ err: "Cannot Make Changes" });
            })
            .catch(err => console.log(err));
        }
      );
    });
  });
});

// @route DELETE api/faculty/completeexam
// @desc Complete the Exam
// @access Private for LoggedInFaculty
router.delete("/completeexam/:id", verifyToken, (req, res) => {
  if (!req.body.branch && !req.body.year)
    return res
      .status(403)
      .json({ notallowed: "Branch and year field is required" });
  const id = req.params.id;
  const branch = req.body.branch;
  const year = req.body.year;

  QuestionPaper.updateOne({ _id: id }, { examconducted: true })
    .then(questionpaper => {
      //Check
      CreateExam.findOneAndRemove({ examid: id, facultyid: req.faculty.id })
        .then(exam => {
          if (!exam)
            return res.status(401).json({
              notallowed: "Exam Already Completed"
            });
          Student.updateMany(
            {
              branch: branch,
              year: year,
              iswritingexam: true,
              iscompletedexam: false
            },
            { iswritingexam: false, iscompletedexam: true }
          ).then(student => {
            if (student.n === 0) {
              return res.json({
                success: "EveryOne Wrote the Exam Successfully "
              });
            } else {
              return res.json({
                success: "Number of absenties are " + student.n
              });
            }
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @route GET api/faculty/protected
// @desc Faculty Protected
// @access Private for LoggedInFaculty
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
