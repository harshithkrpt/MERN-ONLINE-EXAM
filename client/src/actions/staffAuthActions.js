import { GET_ERRORS, SET_CURRENT_STAFF } from "./types";
import axios from "axios";

import setStaffToken from "../components/utils/setStaffToken";
import jwt_decode from "jwt-decode";

// Login (GET STUDENT TOKEN)
export const stafflogin = staffData => dispatch => {
  axios
    .post("/api/faculty/login", staffData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      localStorage.setItem("facultyToken", token);
      // Set token to auth header for axios
      setStaffToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current Admin
      dispatch(setCurrentStaff(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Current Student
export const setCurrentStaff = decoded => {
  return {
    type: SET_CURRENT_STAFF,
    payload: decoded
  };
};

//Logout action
export const logoutstaff = () => dispatch => {
  //Remove Token
  localStorage.removeItem("facultyToken");
  // Remove auth header for future requests
  setStaffToken(false);
  // Set current user as false
  dispatch(setCurrentStaff({}));
};
