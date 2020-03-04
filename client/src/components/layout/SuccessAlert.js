import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SuccessAlert extends Component {
  static propTypes = {
    success: PropTypes.any.isRequired
  };
  componentDidUpdate(prevProps) {
    const { success, alert } = this.props;
    if (success !== prevProps.success) {
      alert.success(success);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  success: state.success
});

export default connect(mapStateToProps)(withAlert()(SuccessAlert));
