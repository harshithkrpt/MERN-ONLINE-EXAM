// Private Component for entering student data
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import { registerstudent } from "../../../actions/studentActions";
import SelectListGroup from "../../common/SelectListGroup";
import StudentInfoStyle from "../../styles/students/Registerstudent";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import isEmpty from "../../../reducers/validations/is-empty";

class RegisterStudent extends Component {
  state = {
    hallticketnumber: "",
    admindate: "",
    batch: "",
    dob: "",
    age: "",
    caste: "BC",
    category: "A",
    name: "",
    fathername: "",
    mothername: "",
    studentemail: "",
    branch: "CSE",
    studentmobilenumber: "",
    parentmobilenumber: "",
    pincode: "",
    state: "",
    city: "",
    locality: "",
    errors: {}
  };

  static propTypes = {
    registerstudent: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const studentData = {
      hallticketnumber: this.state.hallticketnumber,
      admindate: this.state.admindate,
      batch: this.state.batch,
      dob: this.state.dob,
      age: this.state.age,
      caste: this.state.caste,
      category: this.state.category,
      name: this.state.name,
      fathername: this.state.fathername,
      mothername: this.state.mothername,
      studentemail: this.state.studentemail,
      branch: this.state.branch,
      studentmobilenumber: this.state.studentmobilenumber,
      parentmobilenumber: this.state.parentmobilenumber,
      pincode: this.state.pincode,
      state: this.state.state,
      city: this.state.city
    };
    if (!isEmpty(this.state.locality))
      studentData.locality = this.state.locality;
    this.props.registerstudent(studentData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    let optionsCaste = [
      {
        label: "BC",
        value: "BC"
      },
      {
        label: "OC",
        value: "OC"
      },
      {
        label: "SC",
        value: "SC"
      },
      {
        label: "ST",
        value: "ST"
      }
    ];

    let optionsCategory = [
      {
        label: "A",
        value: "A"
      },
      {
        label: "B",
        value: "B"
      },
      {
        label: "C",
        value: "C"
      },
      {
        label: "D",
        value: "D"
      }
    ];

    let optionBranch = [
      {
        label: "CSE",
        value: "CSE"
      },
      {
        label: "EEE",
        value: "EEE"
      },
      {
        label: "ECE",
        value: "ECE"
      },
      {
        label: "MECH",
        value: "MECH"
      },
      {
        label: "IT",
        value: "IT"
      },
      {
        label: "CIVIL",
        value: "CIVIL"
      },
      {
        label: "MINING",
        value: "MINING"
      }
    ];

    return (
      <StudentInfoStyle>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Hall Ticket Number"
            name="hallticketnumber"
            value={this.state.hallticketnumber}
            onChange={this.onChange}
            error={errors.hallticketnumber}
          />
          <TextFieldGroup
            placeholder="Joining Date"
            name="admindate"
            value={this.state.admindate}
            onChange={this.onChange}
            error={errors.admindate}
          />
          <TextFieldGroup
            placeholder="Batch"
            name="batch"
            value={this.state.batch}
            onChange={this.onChange}
            error={errors.batch}
          />
          <TextFieldGroup
            placeholder="Date Of Birth"
            name="dob"
            value={this.state.dob}
            onChange={this.onChange}
            error={errors.dob}
          />
          <TextFieldGroup
            placeholder="Age"
            name="age"
            value={this.state.age}
            onChange={this.onChange}
            error={errors.age}
            type="number"
          />
          <SelectListGroup
            placeholder="Caste"
            name="caste"
            value={this.state.caste}
            onChange={this.onChange}
            error={errors.caste}
            options={optionsCaste}
          />
          <SelectListGroup
            placeholder="Category"
            name="category"
            value={this.state.category}
            onChange={this.onChange}
            error={errors.category}
            options={optionsCategory}
          />
          <TextFieldGroup
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="Father Name"
            name="fathername"
            value={this.state.fathername}
            onChange={this.onChange}
            error={errors.fathername}
          />

          <TextFieldGroup
            placeholder="Mother Name"
            name="mothername"
            value={this.state.mothername}
            onChange={this.onChange}
            error={errors.mothername}
          />

          <TextFieldGroup
            placeholder="Student Email"
            name="studentemail"
            value={this.state.studentemail}
            onChange={this.onChange}
            error={errors.studentemail}
          />
          <SelectListGroup
            placeholder="Branch"
            name="branch"
            value={this.state.branch}
            onChange={this.onChange}
            error={errors.branch}
            options={optionBranch}
          />
          <TextFieldGroup
            placeholder="Student Mobile Number"
            name="studentmobilenumber"
            value={this.state.studentmobilenumber}
            onChange={this.onChange}
            error={errors.studentmobilenumber}
          />

          <TextFieldGroup
            placeholder="Parent Mobile"
            name="parentmobilenumber"
            value={this.state.parentmobilenumber}
            onChange={this.onChange}
            error={errors.parentmobilenumber}
          />
          <TextAreaFieldGroup
            placeholder="Locality"
            name="locality"
            value={this.state.locality}
            onChange={this.onChange}
            error={errors.locality}
          />

          <TextFieldGroup
            placeholder="Pincode"
            name="pincode"
            value={this.state.pincode}
            onChange={this.onChange}
            error={errors.pincode}
          />

          <TextFieldGroup
            placeholder="City"
            name="city"
            value={this.state.city}
            onChange={this.onChange}
            error={errors.city}
          />
          <TextFieldGroup
            placeholder="State"
            name="state"
            value={this.state.state}
            onChange={this.onChange}
            error={errors.state}
          />
          <input type="submit" value="Register Student" />
        </form>
      </StudentInfoStyle>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerstudent }
)(withRouter(RegisterStudent));
