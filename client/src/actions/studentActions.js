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
