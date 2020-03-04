import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OnlineExamResultStyle from "../styles/onlineexam/OnlineExamResultStyle";

class OnlineExamResult extends Component {
  static propTypes = {
    onlineexam: PropTypes.object.isRequired
  };
  render() {
    const { result } = this.props.onlineexam;
    const resultData =
      Object.keys(result).length > 0 ? (
        <div>
          <p>{result.marks}</p>
          <table>
            <tr>
              <th>Student Option</th>
              <th>Correct Option</th>
            </tr>
            {result.student_options.map((std, index) => {
              return (
                <tr>
                  <td>{std}</td>
                  <td>{result.correct_options[index]}</td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : null;
    return (
      <OnlineExamResultStyle>
        Result
        {resultData}
      </OnlineExamResultStyle>
    );
  }
}

const mapStateToProps = state => ({
  onlineexam: state.onlineexam
});

export default connect(mapStateToProps)(OnlineExamResult);
