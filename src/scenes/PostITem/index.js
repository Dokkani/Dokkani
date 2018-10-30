
import React, { Component } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import {  FormInput, Button, Text } from 'react-native-elements'
import { fetchToken } from '../../actions/user';
import PhotoUpload from 'react-native-photo-upload'

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
    buttonUpload : {
        marginTop: 20,
        backgroundColor: '#7F85FC',
        width: 310,
        height: 56,
        borderRadius: 6,
    }

});

type Props = {};
class PostItem extends Component<Props> {

    constructor(props: Props){
        super(props);
        this.state ={
            item: {
                title : null,
                description : null,
                upload : null,
                location : null,
                price : null
            },
        }
    }
    _onSubmit = (username, password) =>{
        console.log(username, password);
        this.props.login(username, password);
        this._goToNextPage(username);
    };
    componentWillReceiveProps(nextProp){
        console.log(nextProp.error);
        console.log(nextProp.item);
    }
    _goToNextPage(){
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.logo} source={Images.DOKKANI_LOGO} />
                <Text style={styles.title}>Post an item</Text>
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Product Title' value={ this.state.item.title } onChangeText={(value) =>this.setState({title: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText}  placeholder='Description' value={ this.state.item.description } onChangeText={(value) =>this.setState({description: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Price per Day' value={ this.state.item.price } onChangeText={(value) =>this.setState({price: value}) } />
                <FormInput shake={true} containerStyle={styles.inputText} placeholder='Address' value={ this.state.item.location } onChangeText={(value) =>this.setState({location: value}) } />
                <Button
                    buttonStyle={styles.buttonUpload} title='Upload'  onPress={() => console.log('yooo')} />
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                            console.log('Image base64 string: ', avatar)
                        }
                    }}
                >
                    <Image
                        style={{
                            paddingVertical: 30,
                            width: 150,
                            height: 150,
                            borderRadius: 75
                        }}
                        resizeMode='cover'
                        source={{
                            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                        }}
                    />
                </PhotoUpload>
                <Button
                    buttonStyle={styles.buttonLogin} title='Post' onPress={() => console.log('clickk')} />
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
        login: (username, password) => {
            dispatch(fetchToken(username, password));
        }
    };
};
export default connect(mapStatetoProp, mapDispatchToProps)(PostItem);
