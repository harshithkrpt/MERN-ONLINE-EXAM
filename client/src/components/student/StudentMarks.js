import React, { Component } from "react";
import { connect } from "react-redux";
import StudentMarksStyle from "../styles/students/StudentMarksStyle";
import PropTypes from "prop-types";
import DisplayOverallMarks from "./marks/DisplayOverallMarks";
import DisplayOnlineMarks from "./marks/DisplayOnlineMarks";
import { getonlinemarks, getoverallmarks } from "../../actions/studentActions";

class StudentMarks extends Component {
  state = {
    displayOnlineMarks: false,
    displayStudentMarks: false
  };
  static propTypes = {
    student: PropTypes.object.isRequired,
    studentmarks: PropTypes.object.isRequired,
    onlinemarks: PropTypes.object.isRequired,
    getonlinemarks: PropTypes.func.isRequired,
    getoverallmarks: PropTypes.func.isRequired
  };

  onlineMarks = e => {
    this.props.getonlinemarks();
  };

  studentMarks = e => {
    this.props.getoverallmarks();
  };

  render() {
    const { student, studentmarks, onlinemarks } = this.props;
    const { displayOnlineMarks, displayStudentMarks } = this.state;
    return (
      <StudentMarksStyle>
        <button onClick={this.onlineMarks}>Online Marks</button>
        <button onClick={this.studentMarks}>Overall Marks</button>
        <div className="modal">
          {displayOnlineMarks ? (
            <DisplayOnlineMarks studentprofile={student} marks={onlinemarks} />
          ) : null}
          {displayStudentMarks ? (
            <DisplayOverallMarks
              studentprofile={student}
              marks={studentmarks}
            />
          ) : null}
        </div>
      </StudentMarksStyle>
    );
  }
}

const mapStateToProps = state => ({
  student: state.student,
  studentmarks: state.studentmarks,
  onlinemarks: state.onlinemarks
});

export default connect(
  mapStateToProps,
  { getonlinemarks, getoverallmarks }
)(StudentMarks);
