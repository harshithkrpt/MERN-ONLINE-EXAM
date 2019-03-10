import {
  SET_CURRENT_STAFF_INFORMATION,
  GET_ONLINE_QUESTION_PAPERS,
  GET_OTP,
  GET_CURRENT_EXAMS,
  CLEAR_STAFF
} from "../actions/types";

const initialState = {
  profile: {},
  questionpapers: null,
  otp: null,
  currentexams: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_STAFF_INFORMATION:
      return { ...state, profile: action.payload };
    case GET_ONLINE_QUESTION_PAPERS:
      return {
        ...state,
        questionpapers: action.payload
      };
    case GET_OTP:
      return { ...state, otp: action.payload };
    case GET_CURRENT_EXAMS:
      return { ...state, currentexams: action.payload };
    case CLEAR_STAFF:
      return {
        profile: {},
        questionpapers: null,
        otp: null,
        currentexams: null
      };
    default:
      return state;
  }
}
