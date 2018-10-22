
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../../theme';
import {  FormInput } from 'react-native-elements'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    logo: {
        width: 300,
        height: 30,
    },
});

type Props = {};
class signUp extends Component<Props> {


    constructor(props: Props){
        super(props);
        console.log('login');
    }

    componentDidMount() {
        setTimeout(() => {
            this._goToNextPage(this);
        }, 2000);
    }

    _goToNextPage(){
        return ;
    }

    render() {
        return (
            <View style={styles.container}>
                <FormInput placeholder='Full Name' />
                <FormInput placeholder='Username' />
                <FormInput placeholder='Email' />
                <FormInput placeholder='Password' />
                <FormInput placeholder='Phone Number' />

                <Button
                    title='Sign Up' />
            </View>
        );
    }
}


export default connect()(signUp);
