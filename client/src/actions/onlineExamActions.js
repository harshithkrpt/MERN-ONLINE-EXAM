import axios from "axios";
import {
  GET_QUESTIONS_ONLINE,
  LOADING,
  GET_ERRORS,
  POST_FINAL_SUBMIT
} from "./types";

export const getquestions = (reqData, history) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .post("/online/writeexam", reqData)
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_QUESTIONS_ONLINE, payload: res.data });
      history.push("/online/exam");
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const finalsubmit = (reqData, history) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  axios
    .post("/online/finalsubmit", reqData)
    .then(res => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: POST_FINAL_SUBMIT, payload: res.data });
      history.push("/online/result");
    })
    .catch(err => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
