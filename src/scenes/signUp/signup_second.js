
import React, { Component } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import {  FormInput, Button, Text } from 'react-native-elements'
import {createUser } from '../../actions/signup';
import {Api} from "../../api";
import {SIGNUP_FAILED, SIGNUP_SUCCESS} from "../../actions/types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    logo: {
        position: 'absolute',
        height:15,
        width: 130,
        left: 0,
        top: 40,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.disabledButton,
        fontFamily: 'avenir',
        position: 'absolute',
        left: 30,
        top: 220,

    },
    title: {
        color: '#535D7E',
        letterSpacing: -0.8,
        lineHeight: 40,
        fontSize: 25,
        fontFamily: 'avenir-book',
        position: 'absolute',
        left: 30,
        top: 100,
    },
    inputText: {
        backgroundColor: '#fff',
        borderRadius: 6,
        width: 310,
        height: 56,
        justifyContent: 'center',
        borderColor: Colors.inputBorder,
        borderWidth: 0.5,
        margin: 5,
        padding: 10,
    },
    buttonLogin: {
        marginTop: 20,
        backgroundColor: '#7F85FC',
        width: 310,
        height: 56,
        borderRadius: 6,

    },


});

class signUp_second extends Component {

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: null,
            first_name: '',
            last_name: '',
            user_name: '',
            address: '',
            phone: '',
            location: '',
            latitude: '',
            longitude: '',
            isValid: true,
            errorMessage: '',
            user: {},
        }
    }
    _onSubmit = async () =>{
        let user = this.state.user;
        user.email = this.state.email;
        user.first_name = this.state.first_name;
        user.last_name = this.state.last_name;
        user.user_name = this.state.last_name + this.state.first_name ;
        user.password = this.state.password;
        user.phone = this.state.phone;
        user.address = this.state.address;
        this.props.sign_Up(user);
        this.props.navigation.navigate('Home', {
            user
        });
        console.log('user: ', user)
    };
    componentWillMount(){
       const { navigation } = this.props;
       this.setState({
           email: navigation.getParam('email'),
       })
    }
    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.logo} source={Images.DOKKANI_LOGO} />
                <Text style={styles.title}>Complete Profile</Text>
                <View style={{marginTop: 40 }}>
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='First Name' value={ this.state.first_name } onChangeText={(value) =>this.setState({first_name: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Last Name' value={ this.state.last_name } onChangeText={(value) =>this.setState({last_name: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText} secureTextEntry placeholder='password' value={ this.state.password } onChangeText={(value) =>this.setState({password: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText} placeholder=' +1 | Phone Number' value={ this.state.phone } onChangeText={(value) =>this.setState({phone: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Address' value={ this.state.address } onChangeText={(value) =>this.setState({address: value}) } />
                </View>
                <Button
                    buttonStyle={styles.buttonLogin} title='Next' onPress={() => this._onSubmit()} />
            </View>
        );
    }
}

const mapStatetoProp = state => {
    return  {
        user: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sign_Up: (user) => {
            dispatch(createUser(user));
        }
    };
};
export default connect(mapStatetoProp, mapDispatchToProps)(signUp_second);
