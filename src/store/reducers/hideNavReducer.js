import * as types from '../actions/actionTypes';
import initialState from './initialState';


const hideNavReducer = (state = initialState.hideNav, action) => {
  if (action.type === types.HIDE_NAV) {
    return  action.payload;
  }
  return state;
};

export default hideNavReducer;
