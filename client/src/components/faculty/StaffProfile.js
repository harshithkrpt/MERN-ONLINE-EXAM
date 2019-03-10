import React, { Component } from "react";
import { connect } from "react-redux";
import StaffProfile from "../styles/staff/StaffProfile";
import PropTypes from "prop-types";
import { loadstaffinfo } from "../../actions/staffActions";

class StaffDashboard extends Component {
  static propTypes = {
    staff: PropTypes.object.isRequired,
    loadstaffinfo: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (Object.keys(this.props.staff.profile).length === 0) {
      this.props.loadstaffinfo();
    }
  }
  render() {
    const { profile } = this.props.staff;
    const staffdata = (
      <div>
        <p>{profile.name}</p>
        <p>{profile.idcardnumber}</p>
      </div>
    );
    return (
      <StaffProfile>
        <button
          onClick={() => {
            this.props.history.push("/staff/dashboard");
          }}
        >
          Back
        </button>
        <h1>Staff Profile</h1>
        {profile ? staffdata : null}
      </StaffProfile>
    );
  }
}

const mapStateToProps = state => ({
  staff: state.staff
});

export default connect(
  mapStateToProps,
  { loadstaffinfo }
)(StaffDashboard);
