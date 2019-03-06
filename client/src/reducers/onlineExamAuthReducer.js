import { SET_CURRENT_ONLINE_EXAM_STUDENT } from "../actions/types";
import isEmpty from "./validations/is-empty";

const initialState = {
  isAuthenticated: false,
  online_student: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ONLINE_EXAM_STUDENT:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        online_student: action.payload
      };
    default:
      return state;
  }
}
