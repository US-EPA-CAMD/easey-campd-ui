import * as types from '../actions/actionTypes';
import initialState from './initialState';


const apiErrors = (reduxState = initialState.apiErrors, action) => {
  if (action.type === types.API_ERRORS) {
    const {api, state } = action.payload;
    return Object.assign({}, reduxState, { [api]: {state} });
  }
  return reduxState;
};

export default apiErrors;
