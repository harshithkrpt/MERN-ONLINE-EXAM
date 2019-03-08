import React, { Component } from "react";
import { connect } from "react-redux";
import { loadstudentinfo } from "../../actions/studentActions";
import StudentBasicInfoStyle from "../styles/students/StudentBasicInfoStyle";
import PropTypes from "prop-types";
import ReportError from "./ReportError";

class StudentBasicInfo extends Component {
  state = {
    isVisible: false
  };
  static propTypes = {
    student: PropTypes.object.isRequired
  };
  componentDidMount(e) {
    this.props.loadstudentinfo();
  }
  componentDidUpdate(prevProps) {
    if (this.props.success !== prevProps.success) {
      this.setState({ isVisible: !this.state.isVisible });
    }
  }
  onClick = e => {
    this.props.history.push("/student/dashboard");
  };
  reportErrorData = e => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    const { student } = this.props;
    const { isVisible } = this.state;
    let data = null;
    if (!student) {
      data = <div>Loading...</div>;
    } else {
      data = (
        <React.Fragment>
          <p onClick={this.onClick}>BACK</p>
          <p>{student.name}</p>
          <p>{student.age}</p>
          <button type="button" onClick={this.reportErrorData}>
            {isVisible ? "Cancel Report" : "Report Error"}
          </button>

          <br />
          <br />
          <hr />
          {isVisible ? <ReportError /> : null}
        </React.Fragment>
      );
    }
    return <StudentBasicInfoStyle>{data}</StudentBasicInfoStyle>;
  }
}

const mapStateToProps = state => ({
  student: state.student,
  success: state.success
});

export default connect(
  mapStateToProps,
  { loadstudentinfo }
)(StudentBasicInfo);
