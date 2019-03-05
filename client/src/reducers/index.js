import { combineReducers } from "redux";

// import Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import studentAuthReducer from "./studentAuthReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  studentauth: studentAuthReducer
});
