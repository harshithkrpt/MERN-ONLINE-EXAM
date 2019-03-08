import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reporterror } from "../../actions/studentActions";
import ReportErrorStyle from "../styles/students/ReportErrorStyle";
import TextFieldGroup from "../common/TextFieldGroup";
import Button from "../UI/Button";
export class ReportError extends Component {
  state = {
    name: "",
    value: ""
  };

  static propTypes = {
    reporterror: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    const reportData = {};
    reportData.error = this.state.name;
    reportData.correct = this.state.value;
    this.props.reporterror(reportData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    return (
      <ReportErrorStyle>
        <h1>Enter Your Report</h1>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Field Name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.error}
            name="name"
            info="Enter the Field Name to be Corrected Ex:(name , fathername , mobile number) : "
          />
          <TextFieldGroup
            placeholder="Correct Value"
            value={this.state.value}
            onChange={this.onChange}
            error={errors.correct}
            name="value"
            info="Enter the Correct Value "
          />
          <Button type="submit">Submit</Button>
        </form>
      </ReportErrorStyle>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { reporterror }
)(ReportError);
