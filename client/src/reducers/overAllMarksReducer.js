import { GET_OVERALL_MARKS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OVERALL_MARKS:
      return action.payload;
    default:
      return {};
  }
}
