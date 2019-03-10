import React, { Component } from "react";
import { connect } from "react-redux";
import StudentDashboardStyle from "../styles/students/StudentDashboardStyle";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export class StudentDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  render() {
    return (
      <StudentDashboardStyle>
        <h1>StudentDashboard</h1>
        <br />
        <br />
        <Link to="/student/basic_information">Basic Information</Link> <br />
        <Link to="/student/academic_information">Academic Information</Link>
        <br />
        <Link to="/student/exam_time_table">Exam Time Table</Link> <br />
        <Link to="/student/online_payments">Online Payments</Link> <br />
        <Link to="/student/marks_details">Marks Details</Link> <br />
        <Link to="/student/contact_us">Contact Us</Link> <br />
      </StudentDashboardStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(StudentDashboard);
