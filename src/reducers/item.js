import { POSTED_FAILED, POSTED_SUCCESS, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../actions/types';

const INIT_STATE = {
    item: null,
    items: null,
    error: null,
};
export default (state = INIT_STATE, action) => {
    switch (action.type){
        case POSTED_SUCCESS:
            return { ...state, item: action.payload };
        case POSTED_FAILED:
            return { ...state, error: action.payload };
        case GET_ITEMS_SUCCESS:
            return { ...state, items: action.payload };
        case GET_ITEMS_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
