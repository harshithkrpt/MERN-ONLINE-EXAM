import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stafflogin } from "../../../actions/staffAuthActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import LoginStyle from "../../styles/students/LoginStyle";

class StaffLogin extends Component {
  state = {
    userId: "",
    password: "",
    errors: {}
  };

  static propTypes = {
    stafflogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const staffLoginData = {
      idcardnumber: this.state.userId,
      password: this.state.password
    };
    this.props.stafflogin(staffLoginData);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/staff/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/staff/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    let { errors } = this.props;
    return (
      <LoginStyle>
        <h1>Staff Login</h1>
        <p>Sign In to your MRECEXAMCELL Staff Account</p>
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
  auth: state.staffauth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { stafflogin }
)(StaffLogin);
