// Private Component for adding student marks
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import AddResultStyle from "../../styles/students/AddResultStyle";
import { addresult } from "../../../actions/studentActions";
import Button from "../../UI/Button";
import ResultInput from "./ResultInput";

class AddResults extends Component {
  state = {
    branch: "",
    rollnumber: "",
    results: [],
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
      let resultData = {};
      resultData.branch = this.state.branch;
      resultData.rollnumber = this.state.rollnumber;
      resultData.results = [...this.state.results];
      this.props.addresult(resultData, this.props.history);
    }
  };

  // add semister For Adding Marks
  addSemister = e => {
    if (this.state.results.length < 8) {
      this.setState({ results: [...this.state.results, []] });
    } else {
      this.setState({
        errors: {
          semsubjects: "Cannot add Only 8 Semisters are allowed"
        }
      });
    }
  };

  // add results
  addResult(index, e) {
    if (this.state.results[index].length < 9) {
      let sem = [...this.state.results];
      sem[index] = [
        ...this.state.results[index],
        {
          code: "",
          obtainedcredits: "",
          excludedcredits: "",
          status: "P",
          gpa: "O",
          allotedcredits: ""
        }
      ];
      this.setState({
        results: [...sem]
      });
    } else {
      this.setState({
        errors: {
          semsubjects: "Cannot add Only 9 Subject's Per Semister"
        }
      });
    }
  }

  onChangeResult(indexX, indexY, e) {
    let sem = [...this.state.results];
    sem[indexX][indexY][e.target.name] = e.target.value;
    this.setState({
      results: [...sem]
    });
  }

  render() {
    let semister = null;

    semister = this.state.results.map((semister, indexX) => (
      <div key={indexX}>
        {semister.map((result, indexY) => (
          <ResultInput
            key={indexY}
            code={result.code}
            onChange={this.onChangeResult.bind(this, indexX, indexY)}
            obtainedcredits={result.obtainedcredits}
            excludedcredits={result.excludedcredits}
            status={result.status}
            gpa={result.gpa}
            allotedcredits={result.allotedcredits}
          />
        ))}
        <Button
          type="button"
          key={indexX}
          onClick={this.addResult.bind(this, indexX)}
        >
          Add Subject
        </Button>
      </div>
    ));
    return (
      <AddResultStyle>
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

          {semister}
          <Button type="button" onClick={this.addSemister.bind(this)}>
            Add Semister
          </Button>
          <input type="submit" value="Add Results" />
        </form>
      </AddResultStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addresult }
)(withRouter(AddResults));
