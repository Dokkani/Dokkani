import {Api} from "../api";
import {SIGNUP_FAILED, SIGNUP_SUCCESS} from "./types";


export const createUser = (user) => async  dispatch => {
    await Api.postUser(user)
        .then(res => {
            dispatch({type: SIGNUP_SUCCESS, payload: res})
        })
        .catch(error => {
            console.log('error', error);
            dispatch({type: SIGNUP_FAILED, payload: 'sign up Failed'})
        })
};
