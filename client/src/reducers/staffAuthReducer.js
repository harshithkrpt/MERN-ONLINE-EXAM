import { SET_CURRENT_STAFF } from "../actions/types";
import isEmpty from "./validations/is-empty";

const initialState = {
  isAuthenticated: false,
  staff: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_STAFF:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        staff: action.payload
      };
    default:
      return state;
  }
}
