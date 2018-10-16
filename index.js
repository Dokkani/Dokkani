/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import ConfigureStore from './src/store/store';

const store = ConfigureStore();
const RNRedux = () => (
    <Provider store = { store }>
        <App />
    </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);

