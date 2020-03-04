import React, { Component } from "react";
import { connect } from "react-redux";
import { finalsubmit } from "../../actions/onlineExamActions";
import QuestionOpt from "./QuestionOpt";
import MainExamStyle from "../styles/onlineexam/MainExamStyle";
import Button from "../UI/Button";

export class MainExam extends Component {
  state = {
    studentoptions: []
  };

  componentDidMount() {
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      return (ev.returnValue = "Are you sure you want to close?");
    });
    if (this.props.onlineexam.questions === null) {
      this.props.history.push("/online/begin");
    }
  }

  onChange = (index, e) => {
    const studentOptions = [...this.state.studentoptions];
    studentOptions[index] = (parseInt(e) + 1).toString();
    this.setState({ studentoptions: [...studentOptions] });
  };

  finalSubmit = e => {
    const reqData = {};
    reqData.paperIndex = this.props.onlineexam.paperIndex;
    reqData.examId = this.props.onlineexam.examId;
    reqData.examname = this.props.onlineexam.examname;
    reqData.mid = this.props.onlineexam.mid;
    reqData.student_options = this.state.studentoptions;
    let bool = true;
    for (let i = 0; i < reqData.student_options.length; i++) {
      if (reqData.student_options[i] === null)
        bool = window.confirm(
          "You Did Not Answer All the Questions Are You Sure ?"
        );
    }
    if (bool) {
      this.props.finalsubmit(reqData, this.props.history);
    }
  };

  render() {
    const { questions } = this.props.onlineexam;
    const questionData = questions
      ? questions.map((question, index) => {
          return (
            <QuestionOpt
              key={index}
              question={question}
              onChange={this.onChange.bind(this, index)}
            />
          );
        })
      : null;
    return (
      <MainExamStyle>
        <h1>Final Submit</h1>
        {questionData}
        <Button onClick={this.finalSubmit}>Final Submit</Button>
      </MainExamStyle>
    );
  }
}

const mapStateToProps = state => ({
  onlineexam: state.onlineexam
});

export default connect(
  mapStateToProps,
  { finalsubmit }
)(MainExam);
