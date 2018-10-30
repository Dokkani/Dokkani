import React, { Component } from 'react';

import SplashScreen from '../scenes/splashscreen';
import Login from '../scenes/login/login';
import Home from '../scenes/home';
import signUp from '../scenes/signUp/signUp';
import signUp_second from '../scenes/signUp/signup_second';
import { StackNavigator } from 'react-navigation';
import PostItem from '../scenes/PostITem';

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
        navigationOptions :{
            title: 'Home'
        }
    },
    signUp : {
        screen: signUp,
        navigationOptions :{
            header:  null,
            title: 'Back',
        }
    },
    signUp_second : {
        screen: signUp_second,
    },
    PostItem : {
        screen: PostItem,
        navigationOptions :{
            title: 'Post New Item'
        }
    },
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
