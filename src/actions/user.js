import {Api} from '../api';
import {LOGIN_FAILED, LOGIN_SUCCESS} from "./types";

export const fetchToken = (username, password) => async  dispatch => {
    await Api.fetchToken(username, password)
        .then(res => {
            dispatch({type: LOGIN_SUCCESS, payload: res})
        })
        .catch(error => {
            console.log('error', error);
            dispatch({type: LOGIN_FAILED, payload: 'Login Failed'})
        })
};

