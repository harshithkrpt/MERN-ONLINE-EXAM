import { SET_CURRENT_STUDENT } from "../actions/types";
import isEmpty from "./validations/is-empty";

const initialState = {
  isAuthenticated: false,
  student: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_STUDENT:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        student: action.payload
      };
    default:
      return state;
  }
}
