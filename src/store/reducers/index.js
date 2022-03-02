import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";

const rootReducer = combineReducers({
  authData: authReducer,
  data: dataReducer,
});

export default rootReducer;
