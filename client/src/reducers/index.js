import { combineReducers } from "redux";

// import Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import studentAuthReducer from "./studentAuthReducer";
import onlineExamAuthReducer from "./onlineExamAuthReducer";
import staffAuthReducer from "./staffAuthReducer";
import studentReducer from "./studentReducer";
import progressReducer from "./progressReducer";
import successReducer from "./successReducer";
import studentMarksReducer from "./overAllMarksReducer";
import onlineMarksReducer from "./onlineMarksReducer";
import staffReducer from "./staffReducer";
import onlineExamReducer from "./onlineExamReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  studentauth: studentAuthReducer,
  onlineloginauth: onlineExamAuthReducer,
  staffauth: staffAuthReducer,
  student: studentReducer,
  isloading: progressReducer,
  success: successReducer,
  studentmarks: studentMarksReducer,
  onlinemarks: onlineMarksReducer,
  staff: staffReducer,
  onlineexam: onlineExamReducer
});
