import { createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import { counter } from '../reducers/';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();
const rootReducer = combineReducers({
    counter
});
const configureStore = () => {
    return  createStore(rootReducer,composeWithDevTools(applyMiddleware(logger, thunk)));
};
export default configureStore;

