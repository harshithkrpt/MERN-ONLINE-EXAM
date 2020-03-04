import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";

function SubjectInput({
  code,
  subjectname,
  allotedcredits,
  onChange,
  ...rest
}) {
  return (
    <div {...rest}>
      <TextFieldGroup
        placeholder="Code"
        name="code"
        value={code}
        onChange={onChange}
      />
      <TextFieldGroup
        placeholder="Subject Name"
        name="subjectname"
        value={subjectname}
        onChange={onChange}
      />
      <TextFieldGroup
        placeholder="Alloted Credits"
        name="allotedcredits"
        value={allotedcredits}
        onChange={onChange}
      />
    </div>
  );
}

SubjectInput.propTypes = {
  code: PropTypes.string.isRequired,
  subjectname: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  allotedcredits: PropTypes.string.isRequired
};

export default SubjectInput;
