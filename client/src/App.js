import React, { Component } from "react";
import "./App.css";

// checking if login
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/utils/setAuthToken";
import { setCurrentAdmin, logoutadmin } from "./actions/authActions";

// React Router Setup
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Component
import Navbar from "./components/layout/Navbar";
import ProgressBar from "./components/UI/ProgressBar";
import AdminLogin from "./components/auth/AdminLogin";
import AdminRegister from "./components/auth/AdminRegister";
import RegisterStudent from "./components/student/inputs/RegisterStudent";
import RegisterSubjects from "./components/subjects/RegisterSubjects";
import AddResults from "./components/student/inputs/AddResults";
import AddStudentMarks from "./components/student/inputs/AddStudentMarks";

// Alerts
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./components/layout/Alert";

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
    window.location.href = "/admin-login";
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
              <ProgressBar load={false} />
              <div
                className="App"
                style={{ position: "relative", top: "70px" }}
              >
                <Alert />
                <Route exact path="/admin-login" component={AdminLogin} />
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
              </div>
            </React.Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}
export default App;
