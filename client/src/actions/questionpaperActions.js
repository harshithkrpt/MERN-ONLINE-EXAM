import axios from "axios";
import { GET_ERRORS } from "./types";

export const addquestionpaper = (studentResultData, history) => dispatch => {
  axios
    .post("/online-exam/online-paper/", studentResultData)
    .then(res => history.push("/online-question-papers"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
