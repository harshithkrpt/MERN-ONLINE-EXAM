import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registeradmin } from "../../actions/authActions";
import styled from "styled-components";
import TextFieldGroup from "../common/TextFieldGroup";
import { withRouter } from "react-router-dom";

class AdminRegister extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  static propTypes = {
    registeradmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const registerAdmin = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      password2: this.state.password2
    };
    this.props.registeradmin(registerAdmin, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    let { errors } = this.props;

    return (
      <RegisterStyle>
        <h1>Create New Admin</h1>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            name="name"
          />
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
          <TextFieldGroup
            type="password"
            placeholder="Re-Enter Password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
            name="password2"
          />
          <input type="submit" value="Register" />
        </form>
      </RegisterStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registeradmin }
)(withRouter(AdminRegister));

const RegisterStyle = styled.div`
  position: fixed;
  top: 50%;
`;
