import React, { Component } from "react";
import { connect } from "react-redux";
import ConductOnlineExamStyle from "../styles/staff/ConductOnlineExamStyle";
import PropTypes from "prop-types";
import {
  getonlinequestionpapers,
  conductexam,
  currentexams,
  completeexam,
  clearstaff
} from "../../actions/staffActions";
import BranchSelectList from "../common/BranchSelectList";
import Button from "../UI/Button";

class ConductOnlineExam extends Component {
  state = {
    branch: "CSE"
  };
  static propTypes = {
    staff: PropTypes.object.isRequired,
    getonlinequestionpapers: PropTypes.func.isRequired
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClick = e => {
    const reqData = {};
    reqData.branch = this.state.branch;
    this.props.getonlinequestionpapers(reqData);
  };
  currentExams = () => {
    this.props.currentexams();
  };
  conductExam = (id, e) => {
    this.props.conductexam(id);
  };
  completeExam = (id, branch, year, e) => {
    let bool = window.confirm("Are You Sure");
    if (bool) {
      this.props.completeexam(id, branch, year);
    }
  };
  render() {
    const { questionpapers, otp, currentexams } = this.props.staff;
    const { id } = this.props.auth.staff;
    const paperData = questionpapers ? (
      <div>
        {questionpapers.map(paper => {
          return (
            <ul style={{ padding: "10px", width: "200px" }} key={paper.id}>
              <li> branch : {paper.branch}</li>
              <li> year : {paper.year}</li>
              <li> semister : {paper.semister}</li>
              <li> mid : {paper.mid}</li>
              <li>subject : {paper.subject}</li>
              <li>
                {!paper.examconducted ? (
                  <Button onClick={this.conductExam.bind(this, paper.id)}>
                    Conduct Exam
                  </Button>
                ) : (
                  "Exam Already Conducted"
                )}
              </li>
            </ul>
          );
        })}
      </div>
    ) : null;
    const currentExamData = currentexams ? (
      <div>
        {currentexams.map(exam => {
          return (
            <ul style={{ padding: "10px", width: "200px" }} key={exam.id}>
              <li> branch : {exam.branch}</li>
              <li> year : {exam.year}</li>
              <li> semister : {exam.semister}</li>
              <li> mid : {exam.mid}</li>
              <li>subject : {exam.examname}</li>
              <li>OTP : {exam.otp}</li>
              <li>
                {exam.facultyid === id ? (
                  <Button
                    onClick={this.completeExam.bind(
                      this,
                      exam.examid,
                      exam.branch,
                      exam.year
                    )}
                  >
                    Complete Exam
                  </Button>
                ) : (
                  "You Did not Create Exam"
                )}
              </li>
            </ul>
          );
        })}
      </div>
    ) : null;
    const otpData = otp ? <div>OTP : {otp}</div> : null;
    return (
      <ConductOnlineExamStyle>
        <button
          onClick={() => {
            this.props.history.push("/staff/dashboard");
            this.props.clearstaff();
          }}
        >
          Back
        </button>
        <h1>Conduct Online Exam</h1>
        <label htmlFor="branch">Select Branch</label>
        <BranchSelectList value={this.state.branch} onChange={this.onChange} />
        <Button onClick={this.onClick}>Submit</Button>
        <hr />
        {paperData}
        <br />
        <Button onClick={this.currentExams}>Get Current Exams</Button>
        <br />
        <br />
        <br />
        <hr />
        {otpData}
        <hr />
        <h1>Current Ruiing Exams</h1>
        {currentExamData}
      </ConductOnlineExamStyle>
    );
  }
}

const mapStateToProps = state => ({
  staff: state.staff,
  auth: state.staffauth
});

export default connect(
  mapStateToProps,
  {
    getonlinequestionpapers,
    conductexam,
    currentexams,
    completeexam,
    clearstaff
  }
)(ConductOnlineExam);
