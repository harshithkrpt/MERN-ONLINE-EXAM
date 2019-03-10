import {
  GET_ERRORS,
  SET_CURRENT_STUDENT,
  SET_CURRENT_STUDENT_INFORMATION,
  LOADING,
  GET_SUCCESS,
  GET_ONLINE_MARKS,
  GET_OVERALL_MARKS
} from "./types";
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
  dispatch({ type: LOADING, payload: true });
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
      dispatch({ type: LOADING, payload: false });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: LOADING, payload: false });
    });
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
  dispatch({ type: SET_CURRENT_STUDENT_INFORMATION, payload: {} });
  dispatch(setCurrentStudent({}));
};

// GET BASIC  INFO
export const loadstudentinfo = () => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .get("/api/student/profile")
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: SET_CURRENT_STUDENT_INFORMATION,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//REPORT ERROR
export const reporterror = reportData => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .post("/api/student/profile/report", reportData)
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// GET MARKS online and OverAll Marks
// GOOD ONE
export const getoverallmarks = () => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .get("/api/student/marks")
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_OVERALL_MARKS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const getonlinemarks = () => dispatch => {
  axios
    .get("/api/student/onlinemarks")
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ONLINE_MARKS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
