// Private Component for entering student data
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import RegisterSubjectsStyle from "../styles/subjects/RegisterSubjectsStyle";
import SubjectInput from "./SubjectInput";
import Button from "../UI/Button";
import { registersubject } from "../../actions/subjectActions";

class RegisterSubject extends Component {
  state = {
    branch: "",
    semwisesubjects: [],
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
      let subjectData = {};
      subjectData.branch = this.state.branch;
      subjectData.semwisesubjects = [...this.state.semwisesubjects];
      this.props.registersubject(subjectData, this.props.history);
    } else {
      // TODO DISPLAY ERRORS AND TO CLEAR ERRORS AFTER 2 SEC
    }
  };

  // add semister
  addSemister = e => {
    if (this.state.semwisesubjects.length < 8) {
      this.setState({ semwisesubjects: [...this.state.semwisesubjects, []] });
    } else {
      this.setState({
        errors: {
          semsubjects: "Cannot add Only 8 Semisters are allowed"
        }
      });
    }
  };

  // add subject
  addSubject(index, e) {
    if (this.state.semwisesubjects[index].length < 9) {
      let sem = [...this.state.semwisesubjects];
      sem[index] = [
        ...this.state.semwisesubjects[index],
        { code: "", allotedcredits: "", subjectname: "" }
      ];
      this.setState({
        semwisesubjects: [...sem]
      });
    } else {
      this.setState({
        errors: {
          semsubjects: "Cannot add Only 9 Subject's Per Sem"
        }
      });
    }
  }

  onChangeSubject(indexX, indexY, e) {
    let sem = [...this.state.semwisesubjects];
    sem[indexX][indexY][e.target.name] = e.target.value;
    this.setState({
      semwisesubjects: [...sem]
    });
  }

  render() {
    let semister = null;

    semister = this.state.semwisesubjects.map((semister, indexX) => (
      <div key={indexX}>
        {semister.map((subject, indexY) => (
          <SubjectInput
            key={indexY}
            code={subject.code}
            subjectname={subject.subjectname}
            allotedcredits={subject.allotedcredits}
            onChange={this.onChangeSubject.bind(this, indexX, indexY)}
          />
        ))}
        <Button
          type="button"
          key={indexX}
          onClick={this.addSubject.bind(this, indexX)}
        >
          Add Subject
        </Button>
      </div>
    ));
    return (
      <RegisterSubjectsStyle>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Branch"
            name="branch"
            value={this.state.branch}
            onChange={this.onChange}
          />
          {semister}
          <Button type="button" onClick={this.addSemister}>
            Add Semister
          </Button>
          <input type="submit" value="Create Subject" />
        </form>
      </RegisterSubjectsStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registersubject }
)(withRouter(RegisterSubject));
