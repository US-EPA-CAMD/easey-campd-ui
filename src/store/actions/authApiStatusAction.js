import * as types from "./actionTypes";
import * as authApi from '../../utils/api/authApi';
import setApiError from './setApiErrorAction';
import { beginApiCall } from './apiStatusActions';

export const authApiStatusSuccess = (payload) => ({ type: types.AUTH_API_STATUS__SUCCESS, payload });

export function authApiStatus() {
    return (dispatch) => {
        dispatch(beginApiCall());
        return authApi
            .authApiStatus(() => dispatch(setApiError('authApiStatus', true)))
            .then((res) => {
                if (res) { dispatch(authApiStatusSuccess(res.data)) };
            })
            .catch((err) => {
                dispatch(setApiError('authApiStatus', true))
                console.error(err);
            });
    };
}
