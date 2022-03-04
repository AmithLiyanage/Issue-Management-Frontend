import { createStore, compose } from "redux";

import rootReducer from "./reducers";

// Create store with reducers and initial state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const store = createStore(rootReducer, initialState, composeEnhancers());

export default store;
