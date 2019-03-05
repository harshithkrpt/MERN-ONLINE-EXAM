// ENTRY FILE

// imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");

// importing routes
const student = require("./routes/api/student");
const admin = require("./routes/api/admin");
const subject = require("./routes/api/subject");
const result = require("./routes/api/result");
const studentMarks = require("./routes/api/studentmarks");
const onlinePaper = require("./routes/online-exam/online-paper");
const onlineLogin = require("./routes/online-exam/online");
// initializing app
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); // for urlencoded
app.use(bodyParser.json()); // json as body parser

// db config
const dbKey = require("./config/keys").MongoURI;

// connect to mongodb (mlab)
mongoose
  .connect(dbKey, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error Will Be" + err));

// Passport Middleware
app.use(passport.initialize());

// calling a passport function after initializing it.
// Passport Config
require("./config/passport")(passport);

// PORT dynamic with environment
const PORT = process.env.PORT || 5000;

// use routes which are imported
app.use("/api/student", student);
app.use("/api/admin", admin);
app.use("/api/subject", subject);
app.use("/api/result", result);
app.use("/api/studentmarks", studentMarks);
app.use("/online-exam/", onlinePaper);
app.use("/online", onlineLogin);

app.listen(PORT, () => {
  console.log("Server Started on " + PORT);
});
