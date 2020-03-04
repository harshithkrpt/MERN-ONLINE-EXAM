import { GET_ERRORS } from "./types";
import axios from "axios";

export const registersubject = (subjectData, history) => dispatch => {
  axios
    .post("/api/subject", subjectData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
