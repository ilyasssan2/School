import { STUDENT__LOGIN, STUDENT__LOGOUT } from "./Student_types";

const intialState = {
  token: "",
  student: {},
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case STUDENT__LOGIN:
      return { ...state, token: action.token, student: action.student };
    case STUDENT__LOGOUT:
      state = {};
      return { ...state };

    default:
      return { ...state };
  }
};
export default reducer;
