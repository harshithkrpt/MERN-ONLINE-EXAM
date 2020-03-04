import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import InputStyle from "../UI/InputStyle";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => (
  <InputStyle>
    <div className="Input">
      <input
        type={type}
        className={classnames("Input-text", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor="input" className="Input-label">
        {placeholder}
      </label>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <small className="invalid-feedback">{error}</small>}
    </div>
  </InputStyle>
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  type: PropTypes.string.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
