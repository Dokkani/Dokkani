
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
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
class SplashScreen extends Component<Props> {


    constructor(props: Props){
        super(props);
        console.log('SplashScreen');
    }

    componentDidMount() {
        setTimeout(() => {
                this._goToNextPage();
        }, 2000);
    }

    _goToNextPage(){
        this.props.navigation.navigate('signUp') ;
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.logo} source={Images.DOKKANI_LOGO} />
            </View>
        );
    }
}


export default connect()(SplashScreen);
