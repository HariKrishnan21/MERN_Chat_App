import { GET_USER, SELECTED_USER } from "../constant/actionTypes";

const initialState = {
  user: {},
  selectedUser: {},
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
}
