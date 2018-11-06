import {Api} from "../api";
import {POSTED_SUCCESS, POSTED_FAILED} from "./types";


export const postItem = (item) => async  dispatch => {
    await Api.postNewItem(item)
        .then(res => {
            dispatch({type: POSTED_SUCCESS, payload: res})
        })
        .catch(error => {
            console.log('error', error);
            dispatch({type: POSTED_FAILED, payload: 'Cannot Post the item'})
        })
};
