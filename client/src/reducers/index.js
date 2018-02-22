import { combineReducers } from "redux";
import { reducer as login } from "./loginReducer";
import { reducer as signup } from "./signupReducer";
const rootReducer = combineReducers({ login, signup });

export default rootReducer;
