import {combineReducers, compose, createStore} from 'redux'
import studentReducer from './Student/Student_Reducer';
const root = combineReducers({
    student : studentReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(root , composeEnhancers())
export default store;