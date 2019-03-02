import { SET_CURRENT_ADMIN } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  admin: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload
      };
    default:
      return state;
  }
}
