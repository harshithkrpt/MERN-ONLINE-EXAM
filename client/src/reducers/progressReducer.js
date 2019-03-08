import { LOADING } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return false;
  }
}
