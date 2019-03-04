// Private Component for adding student marks
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import AddStudentMarksStyle from "../../styles/students/AddStudentMarks";
import { addstudentmarks } from "../../../actions/studentActions";

class AddStudentMarks extends Component {
  state = {
    branch: "",
    rollnumber: "",
    errors: {}
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (Object.keys(this.state.errors).length === 0) {
      // Collecting Student Data
      let addStudentData = {};
      addStudentData.branch = this.state.branch;
      addStudentData.rollnumber = this.state.rollnumber;
      this.props.addstudentmarks(addStudentData, this.props.history);
    }
  };

  render() {
    return (
      <AddStudentMarksStyle>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Branch"
            name="branch"
            value={this.state.branch}
            onChange={this.onChange}
          />
          <TextFieldGroup
            placeholder="Roll Number"
            name="rollnumber"
            value={this.state.rollnumber}
            onChange={this.onChange}
          />
          <input type="submit" value="Add Student Marks" />
        </form>
      </AddStudentMarksStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addstudentmarks }
)(withRouter(AddStudentMarks));
