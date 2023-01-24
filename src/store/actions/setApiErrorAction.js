import * as types from './actionTypes';

const setApiError = (api, state) => ({ type: types.API_ERRORS, payload: {api, state} });

export default setApiError;
