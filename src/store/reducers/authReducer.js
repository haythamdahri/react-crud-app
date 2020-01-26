import {IS_LOGGED, SIGN_IN, SIGN_OUT} from "../constants";

const initState = {}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case SIGN_IN:
            return action.payload.then((user) => !!user).catch((err) => false);
        case SIGN_OUT:
            return true;
        case IS_LOGGED:
            return !!action.payload;
        default:
            return state;
    }
};

export default authReducer;
