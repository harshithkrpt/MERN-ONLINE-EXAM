import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardStyle from "../styles/admin/DashboardStyle";
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  render() {
    return (
      <DashboardStyle>
        <h1>Dashboard</h1>
        <br />
        <br />
        <Link to="/register-student">Register Srudent</Link> <br />
        <Link to="/register-subject">Register Subject</Link> <br />
        <Link to="/create-online-paper">Create Online Exam Paper</Link> <br />
        <Link to="/add-results">ADD RESULTS</Link> <br />
        <Link to="/add-results">ADD STUDENT MARKS</Link> <br />
        <Link to="/admin-register">ADMIN REGISTER</Link> <br />
        <Link to="/view-students">VIEW STUDENTS</Link> <br />
        <Link to="/pass-percentage">PASS PERCENTAGE</Link> <br />
        <Link to="staff-details">STAFF DETAILS</Link> <br />
        <Link to="/view-student-details">VIEW STUDENT RESULTS</Link> <br />
      </DashboardStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Dashboard);
