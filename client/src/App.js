import React, { Component } from "react";
import "./App.css";

import jwt_decode from "jwt-decode";
// checking if admin login
import setAuthToken from "./components/utils/setAuthToken";
import { setCurrentAdmin, logoutadmin } from "./actions/authActions";
// check if student login
import setStudentToken from "./components/utils/setStudentToken";
import { setCurrentStudent, logoutstudent } from "./actions/studentActions";
// check if online login
import setOnlineExamToken from "./components/utils/setOnlineToken";
import {
  setCurrentOnlineStudent,
  logoutonlinestudent
} from "./actions/onlineauthActions";
// check if staff login
import setStaffToken from "./components/utils/setStaffToken";
import { setCurrentStaff, logoutstaff } from "./actions/staffAuthActions";

// React Router Setup
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import StudentPrivateRoute from "./components/common/StudentPrivateRoute";
import OnlineExamPrivateRoute from "./components/common/OnlineExamPrivateRoute";
import StaffPrivateRoute from "./components/common/StaffPrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Component
import Navbar from "./components/layout/Navbar";
import AdminLogin from "./components/auth/AdminLogin";
import AdminRegister from "./components/auth/AdminRegister";
import RegisterStudent from "./components/student/inputs/RegisterStudent";
import RegisterSubjects from "./components/subjects/RegisterSubjects";
import AddResults from "./components/student/inputs/AddResults";
import AddStudentMarks from "./components/student/inputs/AddStudentMarks";
import Dashboard from "./components/admin/Dashboard";
import CreateOnlinePaper from "./components/onlineexam/CreateQuestionPaper";
import StudentLogin from "./components/student/auth/StudentLogin";
import OnlineExamLogin from "./components/onlineexam/auth/OnlineExamLogin";
import StaffLogin from "./components/faculty/auth/StaffLogin";
import StudentDashboard from "./components/student/StudentDashboard";
import StudentBasicInfo from "./components/student/StudentBasicInfo";
import StaffDashboard from "./components/faculty/StaffDashboard";
import ConductOnlineExam from "./components/faculty/ConductOnlineExam";
import StaffProfile from "./components/faculty/StaffProfile";
import ExamBegin from "./components/onlineexam/ExamBegin";
import MainExam from "./components/onlineexam/MainExam";

// Alerts
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./components/layout/Alert";
import SuccessAlert from "./components/layout/SuccessAlert";
import StudentMarks from "./components/student/StudentMarks";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
  offset: "20px"
};

// Logic  To Check Authentication on Reload also
if (localStorage.jwtToken) {
  // Set auth token to header of axios
  setAuthToken(localStorage.jwtToken);
  // decode token header auth
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user to redux
  store.dispatch(setCurrentAdmin(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutadmin());
    window.location.href = "/student_login";
  }
}

// Logic  check student
if (localStorage.studentToken) {
  // Set auth token to header of axios
  setStudentToken(localStorage.studentToken);
  // decode token header auth
  const decoded = jwt_decode(localStorage.studentToken);

  // set user to redux
  store.dispatch(setCurrentStudent(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutstudent());
    window.location.href = "/student_login";
  }
}

// Logic  check online exam
if (localStorage.onlineToken) {
  // Set auth token to header of axios
  setOnlineExamToken(localStorage.onlineToken);
  // decode token header auth
  const decoded = jwt_decode(localStorage.onlineToken);

  // set user to redux
  store.dispatch(setCurrentOnlineStudent(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutonlinestudent());
    window.location.href = "/online_exam_login";
  }
}

// Logic  check staff login
if (localStorage.facultyToken) {
  // Set auth token to header of axios
  setStaffToken(localStorage.facultyToken);
  // decode token header auth
  const decoded = jwt_decode(localStorage.facultyToken);

  // set user to redux
  store.dispatch(setCurrentStaff(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutstaff());
    window.location.href = "/staff_login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <React.Fragment>
              <Navbar />

              <div
                className="App"
                style={{ position: "relative", top: "70px" }}
              >
                <Alert />
                <SuccessAlert />
                <Route exact path="/admin-login" component={AdminLogin} />
                <Route exact path="/student_login" component={StudentLogin} />
                <Route exact path="/staff_login" component={StaffLogin} />
                <Route
                  exact
                  path="/online_exam_login"
                  component={OnlineExamLogin}
                />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/admin-register"
                    component={AdminRegister}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/register-student"
                    component={RegisterStudent}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/register-subject"
                    component={RegisterSubjects}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-results"
                    component={AddResults}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-student-marks"
                    component={AddStudentMarks}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-online-paper"
                    component={CreateOnlinePaper}
                  />
                </Switch>
                <Switch>
                  <StudentPrivateRoute
                    exact
                    path="/student/dashboard"
                    component={StudentDashboard}
                  />
                </Switch>
                <Switch>
                  <StudentPrivateRoute
                    exact
                    path="/student/basic_information"
                    component={StudentBasicInfo}
                  />
                </Switch>
                <Switch>
                  <StudentPrivateRoute
                    exact
                    path="/student/marks_details"
                    component={StudentMarks}
                  />
                </Switch>
                <Switch>
                  <StaffPrivateRoute
                    exact
                    path="/staff/dashboard"
                    component={StaffDashboard}
                  />
                </Switch>
                <Switch>
                  <StaffPrivateRoute
                    exact
                    path="/staff/conduct_online_exam"
                    component={ConductOnlineExam}
                  />
                </Switch>
                <Switch>
                  <StaffPrivateRoute
                    exact
                    path="/staff/staff_profile"
                    component={StaffProfile}
                  />
                </Switch>
                <Switch>
                  <OnlineExamPrivateRoute
                    exact
                    path="/online/begin"
                    component={ExamBegin}
                  />
                </Switch>
                <Switch>
                  <OnlineExamPrivateRoute
                    exact
                    path="/online/exam"
                    component={MainExam}
                  />
                </Switch>
              </div>
            </React.Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
