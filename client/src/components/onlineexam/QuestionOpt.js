import React from "react";
import { RadioButton, RadioGroup } from "react-radio-buttons";

function QuestionOpt({ question, onChange }) {
  return (
    <div>
      <hr />
      <p>{question.question}</p>
      <RadioGroup onChange={onChange} horizontal>
        {question.options.map((option, index) => {
          return (
            <RadioButton key={index} value={index.toString()}>
              {option}
            </RadioButton>
          );
        })}
      </RadioGroup>
      <hr />
    </div>
  );
}

export default QuestionOpt;
