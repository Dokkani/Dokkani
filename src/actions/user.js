import {Api} from '../api';
import {LOGIN_FAILED, LOGIN_SUCCESS} from "./types";


export const fetchToken = (email, password) => async  dispatch => {
    await Api.fetchToken(email, password)
        .then(res => {
            dispatch({type: LOGIN_SUCCESS, payload: res})
        })
        .catch(error => {
            console.log('error', error);
            dispatch({type: LOGIN_FAILED, payload: 'Login Failed'})
        })
};

