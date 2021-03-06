import { INCREMENT } from '../actions/types';
import user from './user';
import posts from './item';

const counter = (state = 0, action ) => {
    switch (action.type) {
        case INCREMENT:
            console.log(INCREMENT);
            return {...state, number: action.payload};
        default:
            return state
    }
}
export default {
    user,
    posts,
}
