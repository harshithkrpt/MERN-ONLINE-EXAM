import { SET_CURRENT_ONLINE_EXAM_STUDENT, GET_ERRORS } from "./types";
import axios from "axios";

import setOnlineToken from "../components/utils/setOnlineToken";
import jwt_decode from "jwt-decode";

// Login (GET ADMIN TOKEN)
export const onlinelogin = onlineData => dispatch => {
  axios
    .post("/online/login", onlineData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      localStorage.setItem("onlineToken", token);
      // Set token to auth header
      setOnlineToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current Admin
      dispatch(setCurrentOnlineStudent(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set LoggedIn User
export const setCurrentOnlineStudent = decoded => {
  return {
    type: SET_CURRENT_ONLINE_EXAM_STUDENT,
    payload: decoded
  };
};

//Logout action
export const logoutonlinestudent = () => dispatch => {
  //Remove Token
  localStorage.removeItem("onlineToken");
  // Remove auth header for future requests
  setOnlineToken(false);
  // Set current user as false
  dispatch(setCurrentOnlineStudent({}));
};
