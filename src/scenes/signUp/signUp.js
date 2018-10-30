
import React, { Component } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import {  FormInput, Button, Text } from 'react-native-elements'
import { fetchToken } from '../../actions/user';

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
        top: 60,
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
    subtitle2: {
        fontSize: 16,
        color: Colors.disabledButton,
        fontFamily: 'avenir',
        position: 'absolute',
        left: 30,
        top: 240,
    },
    title: {
        color: '#535D7E',
        letterSpacing: -0.8,
        lineHeight: 40,
        fontSize: 25,
        fontFamily: 'avenir-book',
        position: 'absolute',
        left: 30,
        top: 140,
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
    link : {
        color: Colors.secondary,
        marginTop: 10,
    }


});

type Props = {};
class signUp extends Component<Props> {


    constructor(props: Props){
        super(props);
        this.state = {
            email: '',
        };
    }
    _onSubmit = (email) =>{
        this.props.navigation.navigate('signUp_second', {
            email
        });
        console.log('screen 1: ', email)
    };

    _NextScreen = ( ) => {
        this.props.navigation.navigate('Login');
    };
    componentWillReceiveProps(nextProp){
        console.log(nextProp.error);
        console.log(nextProp.email);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.logo} source={Images.DOKKANI_LOGO} />
                <Text style={styles.title}>Get Started!</Text>
                <Text style={styles.subtitle}> Sign up for new account, enter your email </Text>
                 <Text style={styles.subtitle2}> and get started.</Text>
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Email' value={ this.state.email} onChangeText={(value) =>this.setState({email: value}) } />
                <Button
                    buttonStyle={styles.buttonLogin} title='Next' onPress={() => this._onSubmit(this.state.email)} />
                 <Text style={{color: Colors.disabledButton, marginTop: 13}}> Already have an account? </Text><Text onPress={() => this._NextScreen()} style={styles.link}>Sign In</Text>
            </View>
        );
    }
}

const mapStatetoProp = state => {
    return {
        email: state.email,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (email) => {
            console.log('2',email);
        }
    };
};
export default connect(mapStatetoProp, mapDispatchToProps)(signUp);
