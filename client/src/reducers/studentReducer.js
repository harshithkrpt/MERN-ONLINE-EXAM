import { SET_CURRENT_STUDENT_INFORMATION } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_STUDENT_INFORMATION:
      return action.payload;

    default:
      return state;
  }
}
