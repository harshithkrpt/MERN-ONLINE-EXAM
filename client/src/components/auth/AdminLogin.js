import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginadmin } from "../../actions/authActions";
import LoginStyle from "../styles/students/LoginStyle";
import TextFieldGroup from "../common/TextFieldGroup";

class AdminLogin extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  static propTypes = {
    loginadmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const loginAdmin = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginadmin(loginAdmin);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    let { errors } = this.props;
    return (
      <LoginStyle>
        <h1>Login Admin</h1>
        <p>Sign In to your MRECEXAMCELL Admin Account</p>
        <div className="margin" />
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            name="email"
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
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginadmin }
)(AdminLogin);
