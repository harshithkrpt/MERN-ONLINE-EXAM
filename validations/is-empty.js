// this function will return the values are empty are not in boolean
const isEmpty = value =>
  value === undefined ||
  value === null ||
  value === NaN ||
  (typeof value == "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
