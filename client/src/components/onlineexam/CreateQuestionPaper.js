import React, { Component } from "react";
import CreateQuestionPaperStyle from "../styles/onlineexam/CreateQuestionPaperStyle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../UI/Button";
import QuestionInput from "./QuestionInput";
import TextFieldGroup from "../common/TextFieldGroup";
import { addquestionpaper } from "../../actions/questionpaperActions";

class CreateQuestionPaper extends Component {
  state = {
    branch: "",
    date: "",
    year: "",
    semister: "",
    subject: "",
    questions: [],
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
      // Collecting Question Paper Data
      let questionPaperData = {};
      questionPaperData.branch = this.state.branch;
      questionPaperData.date = this.state.date;
      questionPaperData.year = this.state.year;
      questionPaperData.semister = this.state.semister;
      questionPaperData.subject = this.state.subject;
      questionPaperData.questions = [...this.state.questions];
      this.props.addquestionpaper(questionPaperData, this.props.history);
    }
  };

  // Add Question
  addQuestion = e => {
    if (this.state.questions.length < 125) {
      this.setState({
        questions: [
          ...this.state.questions,
          {
            question: "",
            options: [],
            answer: ""
          }
        ]
      });
    } else {
      this.setState({
        errors: {
          semsubjects: "Only 125 Questions Can Be Added"
        }
      });
    }
  };

  // add option
  addOption(indexX, e) {
    if (this.state.questions[indexX].options.length < 4) {
      let quest = [...this.state.questions];
      quest[indexX].options = [...this.state.questions[indexX].options, ""];
      this.setState({
        questions: [...quest]
      });
    } else {
      this.setState({
        errors: {
          semsubjects: "Only 4 Options Per Question"
        }
      });
    }
  }

  onChangeQuestionInput(indexX, e) {
    let quest = [...this.state.questions];

    if (e.target.name.split(" ")[0] !== "options") {
      quest[indexX][e.target.name] = e.target.value;
    } else {
      let ind = parseInt(e.target.name.split(" ")[1]);
      quest[indexX][e.target.name.split(" ")[0]][ind] = e.target.value;
    }
    this.setState({ questions: [...quest] });
  }

  render() {
    let questions = null;
    questions = this.state.questions.map((question, indexX) => (
      <div key={indexX}>
        {
          <QuestionInput
            question={question.question}
            options={question.options}
            answer={question.answer}
            addOption={this.addOption.bind(this, indexX)}
            onChange={this.onChangeQuestionInput.bind(this, indexX)}
          />
        }
      </div>
    ));
    return (
      <CreateQuestionPaperStyle>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Branch"
            name="branch"
            value={this.state.branch}
            onChange={this.onChange}
          />
          <TextFieldGroup
            placeholder="Date of exam"
            name="date"
            value={this.state.date}
            onChange={this.onChange}
          />
          <TextFieldGroup
            placeholder="Year (1|2|3|4)"
            name="year"
            value={this.state.year}
            onChange={this.onChange}
          />
          <TextFieldGroup
            placeholder="Semister (1 | 2)"
            name="semister"
            value={this.state.semister}
            onChange={this.onChange}
          />
          <TextFieldGroup
            placeholder="Subject Name"
            name="subject"
            value={this.state.subject}
            onChange={this.onChange}
          />
          {questions}
          <Button type="button" onClick={this.addQuestion}>
            Add Question
          </Button>
          <input type="submit" value="Add Results" />
        </form>
      </CreateQuestionPaperStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addquestionpaper }
)(CreateQuestionPaper);
