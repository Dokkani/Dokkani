import { createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers  from '../reducers/';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import Reactotron from '../ReactotronConfig';
const logger = createLogger();
const rootReducer = combineReducers(reducers);
const configureStore = () => {
    return  Reactotron.createStore(rootReducer,composeWithDevTools(applyMiddleware(logger, thunk)));
};
export default configureStore;

