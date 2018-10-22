
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

});

type Props = {};
class Home extends Component<Props> {


    constructor(props: Props){
        super(props);
        console.log('Home');
        console.log('yoo',props);
    }

    _goToNextPage(){
        console.log('going places!');

    }

    render() {
        return (
            <View style={styles.container}>
                <Text> {this.props.email} </Text>
            </View>
        );
    }
}


export default connect()(Home);
