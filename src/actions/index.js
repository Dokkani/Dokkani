import { INCREMENT }  from './types';
import { fetchToken } from "./user";
import { postUser } from "./signup";

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
    postUser
};
