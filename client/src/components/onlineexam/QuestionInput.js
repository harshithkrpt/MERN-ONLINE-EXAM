import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import Button from "../UI/Button";

function QuestionInput({ addOption, onChange, question, options, answer }) {
  let displayOptions = null;

  displayOptions = options.map((option, index) => {
    return (
      <TextFieldGroup
        key={index}
        placeholder="Option"
        name={"options " + index}
        value={option}
        onChange={onChange}
      />
    );
  });
  return (
    <div>
      <TextFieldGroup
        placeholder="Question"
        name="question"
        value={question}
        onChange={onChange}
      />
      <TextFieldGroup
        placeholder="Answer"
        name="answer"
        value={answer}
        onChange={onChange}
      />
      {displayOptions}
      <Button type="button" disabled={options.length === 4} onClick={addOption}>
        Add Option
      </Button>
    </div>
  );
}

QuestionInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  answer: PropTypes.string.isRequired,
  addOption: PropTypes.func.isRequired
};

export default QuestionInput;
