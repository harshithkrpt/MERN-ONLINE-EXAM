import { GET_ONLINE_MARKS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ONLINE_MARKS:
      return action.payload;
    default:
      return {};
  }
}
