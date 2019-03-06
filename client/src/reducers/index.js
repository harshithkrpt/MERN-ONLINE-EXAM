import { combineReducers } from "redux";

// import Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import studentAuthReducer from "./studentAuthReducer";
import onlineExamAuthReducer from "./onlineExamAuthReducer";
import staffAuthReducer from "./staffAuthReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  studentauth: studentAuthReducer,
  onlineloginauth: onlineExamAuthReducer,
  staffauth: staffAuthReducer
});
