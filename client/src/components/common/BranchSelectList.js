import React from "react";
import SelectListGroup from "./SelectListGroup";

function BranchSelectList({ value, onChange }) {
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
    <SelectListGroup
      placeholder="Branch"
      name="branch"
      value={value}
      onChange={onChange}
      options={optionBranch}
    />
  );
}

export default BranchSelectList;
