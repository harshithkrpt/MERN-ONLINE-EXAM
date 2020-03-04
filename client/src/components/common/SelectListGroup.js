import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import InputStyle from "../UI/InputStyle";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <InputStyle>
      <div className="form-group">
        <select
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          name={name}
          value={value}
          onChange={onChange}
        >
          {selectOptions}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <small className="invalid-feedback">{error}</small>}
      </div>
    </InputStyle>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
