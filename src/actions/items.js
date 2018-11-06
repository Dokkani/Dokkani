import {Api} from '../api';
import {GET_ITEMS_FAILED, GET_ITEMS_SUCCESS} from "./types";


export const getPosts = () => async  dispatch => {
    await Api.get_all_posts()
        .then(res => {
            dispatch({type: GET_ITEMS_SUCCESS, payload: res.data})
        })
        .catch(error => {
            console.log('error', error);
            dispatch({type: GET_ITEMS_FAILED, payload: 'get items Failed'})
        })
};

