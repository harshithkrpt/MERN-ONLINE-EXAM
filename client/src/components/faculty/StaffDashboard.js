import React, { Component } from "react";
import { connect } from "react-redux";
import StaffDashboardStyle from "../styles/staff/StaffDashboardStyle";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class StaffDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  render() {
    return (
      <StaffDashboardStyle>
        <h1>Staff Dashboard</h1>
        <br />
        <br />
        <Link to="/staff/staff_profile">Your Profile</Link>
        <br />
        <Link to="/staff/conduct_online_exam">Conduct Online Exam</Link>
        <br />
      </StaffDashboardStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(StaffDashboard);
