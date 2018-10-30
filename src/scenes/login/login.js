
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
        top: 100,
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
        top: 170,
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

type Props = {};
class login extends Component<Props> {


    constructor(props: Props){
        super(props);
       this.state ={
           email: null,
           password: null,
       }
    }
    _onSubmit = (email, password) =>{
        this.props.login(email, password);
        this._goToNextPage(email);
    };
    componentWillReceiveProps(nextProp){
        console.log(nextProp.error);
        console.log(nextProp.user);
    }
    _goToNextPage(){
        this.props.navigation.navigate('Home') ;
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.logo} source={Images.DOKKANI_LOGO} />
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}> Please Sign in</Text>
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Email' value={ this.state.email } onChangeText={(value) =>this.setState({email: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Password' secureTextEntry value={this.state.password} onChangeText={(value) =>this.setState({password: value}) } />
                <Button
                    buttonStyle={styles.buttonLogin} title='Log In' onPress={() => this._onSubmit(this.state.email, this.state.password)} />
            </View>
        );
    }
}

const mapStatetoProp = state => {
    return {
        user: state.user.user,
        error: state.user.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => {
            dispatch(fetchToken(email, password));
            console.log(email, password);
        }
    };
};
export default connect(mapStatetoProp, mapDispatchToProps)(login);
