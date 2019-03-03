import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutadmin } from "../../actions/authActions";
import NavBar from "../styles/NavBar";
import PropTypes from "prop-types";

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutadmin: PropTypes.func.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutadmin();
  };
  render() {
    const { isAuthenticated } = this.props.auth;

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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutadmin }
)(Navbar);
