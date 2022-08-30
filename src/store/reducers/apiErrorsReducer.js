import * as types from '../actions/actionTypes';
import initialState from './initialState';


const apiErrors = (reduxState = initialState.apiErrors, action) => {
  if (action.type === types.API_ERRORS) {
    const {api, state, errorMessage } = action.payload;
    return Object.assign({}, reduxState, { [api]: {state, message: errorMessage} });
  }
  return reduxState;
};

export default apiErrors;
