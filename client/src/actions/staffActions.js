import axios from "axios";
import {
  SET_CURRENT_STAFF_INFORMATION,
  LOADING,
  GET_ERRORS,
  GET_ONLINE_QUESTION_PAPERS,
  GET_OTP,
  GET_CURRENT_EXAMS,
  GET_SUCCESS,
  CLEAR_STAFF
} from "./types";

// GET STAFF PROFILE
export const loadstaffinfo = () => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .get("/api/faculty/profile")
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: SET_CURRENT_STAFF_INFORMATION,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// GET ONLINE QUESTION PAPERS
export const getonlinequestionpapers = reqData => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .post("/api/faculty/questionpapers", reqData)
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: GET_ONLINE_QUESTION_PAPERS,
        payload: res.data.questionpapers
      });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// CONDUCT EXAM
export const conductexam = id => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .post("/api/faculty/createexam/" + id)
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: GET_OTP,
        payload: res.data.otp
      });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// GET CURRENT RUNNING EXAMS
export const currentexams = () => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .get("/api/faculty/currentexams")
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: GET_CURRENT_EXAMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// COMPLETE  EXAM
export const completeexam = (id, branch, year) => dispatch => {
  const reqData = {};
  reqData.branch = branch;
  reqData.year = year;
  dispatch({ type: LOADING, payload: true });
  axios
    .delete("/api/faculty/completeexam/" + id, { data: reqData })
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_SUCCESS, payload: res.data });
      dispatch(clearstaff());
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });

      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const clearstaff = () => {
  return {
    type: CLEAR_STAFF,
    payload: null
  };
};
