import * as types from '../actions/actionTypes';
import initialState from './initialState';


const authApiStatusReducer = (state = initialState.authApiStatus, action) => {
    if (action.type === types.AUTH_API_STATUS__SUCCESS) {
        return action.payload?.status ?? null;
    }
    return state;
};

export default authApiStatusReducer;
