import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import PropTypes from "prop-types";
import SelectListGroup from "../../common/SelectListGroup";

function SubjectInput({
  code,
  obtainedcredits,
  excludedcredits,
  status,
  gpa,
  onChange,
  allotedcredits
}) {
  let optionsStatus = [
    {
      label: "PASS",
      value: "P"
    },
    {
      label: "FAIL",
      value: "F"
    }
  ];

  let optionsGPA = [
    {
      label: "O",
      value: "O"
    },
    {
      label: "A+",
      value: "A+"
    },
    {
      label: "A",
      value: "A"
    },
    {
      label: "B+",
      value: "B+"
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
      label: "F",
      value: "F"
    },
    {
      label: "ABSENT",
      value: "ABS"
    }
  ];
  return (
    <div>
      <TextFieldGroup
        placeholder="Code"
        name="code"
        value={code}
        onChange={onChange}
      />
      <TextFieldGroup
        placeholder="Alloted Credits"
        name="allotedcredits"
        value={allotedcredits}
        onChange={onChange}
      />
      <TextFieldGroup
        placeholder="Obtained Credits"
        name="obtainedcredits"
        value={obtainedcredits}
        onChange={onChange}
      />
      <TextFieldGroup
        placeholder="Excluded Credits"
        name="excludedcredits"
        value={excludedcredits}
        onChange={onChange}
      />
      <label>Status</label>
      <SelectListGroup
        placeholder="Status"
        name="status"
        value={status}
        onChange={onChange}
        options={optionsStatus}
      />
      <label>GPA</label>
      <SelectListGroup
        placeholder="GPA"
        name="gpa"
        value={gpa}
        onChange={onChange}
        options={optionsGPA}
      />
    </div>
  );
}

SubjectInput.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  obtainedcredits: PropTypes.string.isRequired,
  excludedcredits: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  gpa: PropTypes.string.isRequired,
  allotedcredits: PropTypes.string.isRequired
};

export default SubjectInput;
