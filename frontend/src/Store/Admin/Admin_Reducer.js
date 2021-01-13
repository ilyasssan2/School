import { ADMIN__LOGIN, ADMIN__LOGOUT } from "./Admin_types";

const intialState = {
  token: "",
  admin: {},
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ADMIN__LOGIN:
      return { ...state, token: action.token, admin: action.admin };
    case ADMIN__LOGOUT:
      state = {};
      return { ...state };

    default:
      return { ...state };
  }
};
export default reducer;
