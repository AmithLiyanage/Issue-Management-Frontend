import { createStore, compose, applyMiddleware  } from "redux";
import thunk from "redux-thunk"
import rootReducer from "./reducers";

// Create store with reducers and initial state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
