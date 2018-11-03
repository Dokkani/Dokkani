import {Api} from "../api";
import {GETITEMS_FAILED, GETITEMS_SUCCESS} from "./types";


export const getItems = () => async  dispatch => {
    await Api.getItems(distance, start_location, end_location)
        .then(res => {
            dispatch({type: GETITEMS_SUCCESS, payload: res})
        })
        .catch(error => {
            console.log('error', error);
            dispatch({type: GETITEMS_FAILED, payload: 'get items Failed'})
        })
};
