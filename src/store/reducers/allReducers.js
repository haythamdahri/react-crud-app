import authReducer from "./authReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    authReducer
});

export default allReducers;
