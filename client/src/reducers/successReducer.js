import { GET_SUCCESS, CLEAR_SUCCESS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SUCCESS:
      return {};
    case GET_SUCCESS:
      return action.payload.success;

    default:
      return state;
  }
}
