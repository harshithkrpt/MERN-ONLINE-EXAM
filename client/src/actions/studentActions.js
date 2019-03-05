import { GET_ERRORS, SET_CURRENT_STUDENT } from "./types";
import axios from "axios";

import setStudentToken from "../components/utils/setStudentToken";
import jwt_decode from "jwt-decode";

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

// Login (GET STUDENT TOKEN)
export const studentlogin = studentData => dispatch => {
  axios
    .post("/api/student/login", studentData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      localStorage.setItem("studentToken", token);
      // Set token to auth header for axios
      setStudentToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current Admin
      dispatch(setCurrentStudent(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Current Student
export const setCurrentStudent = decoded => {
  return {
    type: SET_CURRENT_STUDENT,
    payload: decoded
  };
};

//Logout action
export const logoutstudent = () => dispatch => {
  //Remove Token
  localStorage.removeItem("studentToken");
  // Remove auth header for future requests
  setStudentToken(false);
  // Set current user as false
  dispatch(setCurrentStudent({}));
};
