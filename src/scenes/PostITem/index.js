
import React, { Component } from 'react';
import { StyleSheet, View, Image,  ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import {  FormInput, Button, Text } from 'react-native-elements'
import PhotoUpload from 'react-native-photo-upload'
import { postItem } from "../../actions/postItem";

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
        top: 20,
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
        top: 40,
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
                title : null,
                description : null,
                avatar : null,
                location : null,
                price : null,
                user: '5bce2060a1f6b700155ba6f5',
                item : {
                    images: []
                },
        }
    }
    _onSubmit = async () =>{
        let item = this.state.item;
        item.title = this.state.title;
        item.description = this.state.description;
        item.images.push('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');
        item.location = this.state.location;
        item.price = this.state.price;
        item.user = this.state.user;
        await this.props.postItem(item);
        this.props.navigation.navigate('Home', {
            item
        });
        console.log('item: ', item)
    };
    componentWillReceiveProps(nextProp){
        console.log(nextProp.error);
        console.log(nextProp.item);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.logo} source={Images.DOKKANI_LOGO} />
                <Text style={styles.title}>Post a New Item</Text>
                <ScrollView>
                <View >
                    <PhotoUpload containerStyle={{height: 200}}
                                 onPhotoSelect={avatar => {
                                     if (avatar) {
                                         this.state.avatar = avatar;
                                     }
                                 }}
                    >
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 25,
                                marginBottom: -70,
                            }}
                            resizeMode='cover'
                            source={{
                                uri: 'https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png'
                            }}
                        />
                    </PhotoUpload>
                    <FormInput shake={true} containerStyle={styles.inputText} placeholder='Product Title' value={ this.state.title } onChangeText={(value) =>this.setState({title: value}) } />
                    <FormInput shake={true} containerStyle={styles.inputText}  placeholder='Description' value={ this.state.description } onChangeText={(value) =>this.setState({description: value}) } />
                    <FormInput shake={true} containerStyle={styles.inputText} placeholder='Price per Day' value={ this.state.price } onChangeText={(value) =>this.setState({price: value}) } />
                    <FormInput shake={true} containerStyle={styles.inputText} placeholder='Address' value={ this.state.location } onChangeText={(value) =>this.setState({location: value}) } />
                </View>
                <Button
                    buttonStyle={styles.buttonLogin} title='Post' onPress={() => this._onSubmit()} />
                </ScrollView>
            </View>
        );
    }
}

const mapStatetoProp = state => {
    return {
        item: state.item,
        error: state.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postItem: (item) => {
            dispatch(postItem(item));
        }
    };
};
export default connect(mapStatetoProp, mapDispatchToProps)(PostItem);
