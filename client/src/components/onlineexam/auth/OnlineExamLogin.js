import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { onlinelogin } from "../../../actions/onlineauthActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import LoginStyle from "../../styles/students/LoginStyle";

class OnlineExamLogin extends Component {
  state = {
    userId: "",
    password: "",
    errors: {}
  };

  static propTypes = {
    onlinelogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const onlineExamStudentData = {
      userId: this.state.userId,
      password: this.state.password
    };
    this.props.onlinelogin(onlineExamStudentData);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/online/begin");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/online/begin");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    let { errors } = this.props;
    return (
      <LoginStyle>
        <h1>Online Exam Login</h1>
        <p>Login In to your MRECEXAMCELL Online Exam</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="User Id"
            value={this.state.userId}
            onChange={this.onChange}
            error={errors.userId}
            name="userId"
          />
          <TextFieldGroup
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            name="password"
          />
          <input type="submit" value="Login" />
        </form>
      </LoginStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.onlineloginauth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { onlinelogin }
)(OnlineExamLogin);
