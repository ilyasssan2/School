import { combineReducers, compose, createStore } from "redux";
import studentReducer from "./Student/Student_Reducer";
import adminReducer from "./Admin/Admin_Reducer";
const root = combineReducers({
  student: studentReducer,
  admin: adminReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(root, composeEnhancers());
export default store;
