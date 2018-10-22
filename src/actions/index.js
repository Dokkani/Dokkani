import { INCREMENT }  from './types';
import { fetchToken } from "./user";

 const  incrementFunction =  (number) => {
    return (dispatch) => {
        console.log('Action', number);
        number +=1;
      return  dispatch({ type: INCREMENT, payload : number }) ;
    }
};
export {
    fetchToken,
    incrementFunction
};
