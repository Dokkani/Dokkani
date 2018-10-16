import { INCREMENT } from '../actions/types';

export const counter = (state = 0, action ) => {
    switch (action.type) {
        case INCREMENT:
            console.log(INCREMENT);
            return {...state, number: action.payload};
        default:
            return state
    }
}
