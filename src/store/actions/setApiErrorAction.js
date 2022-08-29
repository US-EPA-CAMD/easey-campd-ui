import * as types from './actionTypes';

const setApiError = (api, state, errorMessage) => ({ type: types.API_ERRORS, payload: {api, state, errorMessage} });

export default setApiError;
