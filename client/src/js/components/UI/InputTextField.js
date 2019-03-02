import React from "react";
import styled from "styled-components";

function InputTextField() {
  return (
    <Input>
      <input
        id="password-field"
        type="password"
        class="input"
        name="password"
      />
    </Input>
  );
}

const Input = (styled.div = `

`);

export default InputTextField;
