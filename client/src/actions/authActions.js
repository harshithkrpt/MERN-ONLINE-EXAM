import { SET_CURRENT_ADMIN, GET_ERRORS } from "./types";
import axios from "axios";

import setAuthToken from "../components/utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Login (GET ADMIN TOKEN)
export const loginadmin = adminData => dispatch => {
  axios
    .post("/api/admin/login", adminData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current Admin
      dispatch(setCurrentAdmin(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};
