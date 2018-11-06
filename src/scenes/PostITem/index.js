
import React, { Component } from 'react';
import { StyleSheet, View, Image,  ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import {  FormInput, Button, Text } from 'react-native-elements'
import PhotoUpload from 'react-native-photo-upload'
import { postItem } from "../../actions/postItem";
import { Dropdown } from 'react-native-material-dropdown';


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
                category: null,
                image: null,
                item: {}
        }
    }
    _onSubmit = async () =>{
        let item = this.state.item;
        item.title = this.state.title;
        item.description = this.state.description;
        item.image =this.state.avatar;
/*
        item.location = this.state.location;
*/
        item.price = this.state.price;
        item.category = 'clothes';
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
        let data = [{
            value: 'clothes',
        }, {
            value: 'electronics',
        }, {
            value: 'household',
        },{
            value: 'other',
        }];
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
                                         console.log(this.state.avatar);
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
                    <Dropdown
                        label='Category'
                        data={data}
                        name={this.state.category}
                        containerStyle={{width: 310, justifyContent: 'center', marginLeft: 20}}
                    />
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
