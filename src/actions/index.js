import { INCREMENT }  from './types';
import { fetchToken } from "./user";
import { createUser } from "./signup";
import { postItem } from "./postItem";
import { getPosts } from "./items";

 const  incrementFunction =  (number) => {
    return (dispatch) => {
        console.log('Action1111', number);
        number +=1;
      return  dispatch({ type: INCREMENT, payload : number }) ;
    }
};
export {
    fetchToken,
    incrementFunction,
    createUser,
    postItem,
    getPosts
};
