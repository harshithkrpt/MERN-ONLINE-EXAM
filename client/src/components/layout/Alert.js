import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Alert extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { errors, alert } = this.props;
    if (errors !== prevProps.errors) {
      if (errors.email) alert.error(errors.email);
      if (errors.password) alert.error(errors.password);
      if (errors.branch) alert.error(errors.branch);
      if (errors.subjectname) alert.error(errors.subjectname);
      if (errors.code) alert.error(errors.code);
      if (errors.allotedcredits) alert.error(errors.allotedcredits);
      if (errors.common) alert.error(errors.common);
      if (errors.studentprofileerror) alert.error(errors.studentprofileerror);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(withAlert()(Alert));
