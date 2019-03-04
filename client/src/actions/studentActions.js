import { GET_ERRORS } from "./types";
import axios from "axios";

export const registerstudent = (studentData, history) => dispatch => {
  axios
    .post("/api/student", studentData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addresult = (studentResultData, history) => dispatch => {
  axios
    .post("/api/result", studentResultData)
    .then(res => history.push("/add-student-marks"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      history.push("/register-student");
    });
};

export const addstudentmarks = (studentMarksData, history) => dispatch => {
  axios
    .post("/api/studentmarks", studentMarksData)
    .then(res => history.push("/update-student-info"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
