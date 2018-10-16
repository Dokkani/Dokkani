import { INCREMENT }  from './types';

export const  incrementFunction =  (number) => {
    return (dispatch) => {
        console.log('Action', number);
        number +=1;
      return  dispatch({ type: INCREMENT, payload : number }) ;
    }
};

