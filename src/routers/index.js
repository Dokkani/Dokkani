import React, { Component } from 'react';

import SplashScreen from '../scenes/splashscreen';
import Login from '../scenes/login/login';
import Home from '../scenes/home';
import { StackNavigator } from 'react-navigation'

export const Navigator = new StackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions :{
            header:  null
        }
    },
    Login : {
        screen: Login,
        navigationOptions :{
            header:  null
        }
    },
    Home : {
        screen: Home,
    }
},{
    initialRouteName: 'SplashScreen',
})

class Nav extends Component {
    render() {
        return (
            <Navigator />
        )
    }
}

export default Nav
