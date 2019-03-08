import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutadmin } from "../../actions/authActions";
import { logoutstudent } from "../../actions/studentActions";
import { logoutonlinestudent } from "../../actions/onlineauthActions";
import { logoutstaff } from "../../actions/staffAuthActions";
import NavBar from "../styles/NavBar";
import PropTypes from "prop-types";
import ProgressBar from "../UI/ProgressBar";

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutadmin: PropTypes.func.isRequired,
    studentauth: PropTypes.object.isRequired,
    logoutstudent: PropTypes.func.isRequired,
    logoutonlinestudent: PropTypes.func.isRequired,
    onlineloginauth: PropTypes.object.isRequired,
    logoutstaff: PropTypes.func.isRequired,
    staffauth: PropTypes.object.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();
    if (this.props.auth.isAuthenticated) {
      this.props.logoutadmin();
    } else if (this.props.studentauth.isAuthenticated) {
      this.props.logoutstudent();
    } else if (this.props.onlineloginauth.isAuthenticated) {
      this.props.logoutonlinestudent();
    } else if (this.props.staffauth.isAuthenticated) {
      this.props.logoutstaff();
    }
  };

  render() {
    let isAuthenticated = false;
    if (this.props.auth.isAuthenticated) {
      isAuthenticated = this.props.auth.isAuthenticated;
    } else if (this.props.studentauth.isAuthenticated) {
      isAuthenticated = this.props.studentauth.isAuthenticated;
    } else if (this.props.onlineloginauth.isAuthenticated) {
      isAuthenticated = this.props.onlineloginauth.isAuthenticated;
    } else if (this.props.staffauth.isAuthenticated) {
      isAuthenticated = this.props.staffauth.isAuthenticated;
    }

    const publicNav = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/student_login">Student Login</Link>
        </li>
        <li>
          <Link to="/online_exam_login">Online Exam Login</Link>
        </li>
        <li>
          <Link to="/admin-login">Admin Login</Link>
        </li>
        <li>
          <Link to="/staff_login">Staff Login</Link>
        </li>
      </ul>
    );

    const logedInNav = (
      <ul>
        <li>
          <a href="/" onClick={this.onLogoutClick}>
            Logout
          </a>
        </li>
      </ul>
    );
    return (
      <NavBar>
        <ProgressBar load={this.props.isloading} />
        <header tabIndex="0">
          MREC EXAM CELL
          {isAuthenticated ? logedInNav : null}
        </header>
        <div id="nav-container">
          <div className="bg" />
          <div className="button" tabIndex="0">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </div>
          <div id="nav-content" tabIndex="0">
            {isAuthenticated ? logedInNav : publicNav}
          </div>
        </div>
      </NavBar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  studentauth: state.studentauth,
  onlineloginauth: state.onlineloginauth,
  staffauth: state.staffauth,
  isloading: state.isloading
});

export default connect(
  mapStateToProps,
  { logoutadmin, logoutstudent, logoutonlinestudent, logoutstaff }
)(Navbar);
