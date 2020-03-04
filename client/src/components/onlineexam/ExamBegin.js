import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getquestions } from "../../actions/onlineExamActions";
import TextFieldGroup from "../common/TextFieldGroup";
import ExamBeginStyle from "../styles/onlineexam/ExamBeginStyle";
import Button from "../UI/Button";

class ExamBegin extends Component {
  state = {
    otp: ""
  };
  static propTypes = {
    getquestions: PropTypes.func.isRequired
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const reqDate = {};
    reqDate.otp = this.state.otp;
    this.props.getquestions(reqDate, this.props.history);
  };
  componentDidMount() {
    if (this.props.onlineexam.questions !== null) {
      this.props.history.push("/online/exam");
    }
  }

  render() {
    return (
      <ExamBeginStyle>
        <div>Enter Otp</div>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Enter Otp"
            name="otp"
            value={this.state.otp}
            onChange={this.onChange}
          />
          <Button type="submit">Start Exam</Button>
        </form>
      </ExamBeginStyle>
    );
  }
}

const mapStateToProps = state => ({
  onlineexam: state.onlineexam
});

export default connect(
  mapStateToProps,
  {
    getquestions
  }
)(ExamBegin);
