
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import { SearchBar } from 'react-native-elements'
import AppStyles from "../../theme/AppStyles";
import ItemCardComponent from "./ItemCardComponent";
import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
        flex: 1
    },
    div: {
        flexDirection: 'row',
        margin: 10,
    },
    searchBar: {
        backgroundColor: Colors.white,
        borderColor: Colors.white ,
        width: 290,
    },
    user_logo : {
      width: 40,
      height: 40,
      justifyContent: 'flex-start',
       marginRight: 5,
    },
    category : {
        margin: 8,
        justifyContent: 'center',
       // fontWeight: '300',
    },
    category_image : {
        margin: 8,
        justifyContent: 'center',
        //fontWeight: '300',
    }
});

type Props = {};
class Home extends Component<Props> {


    constructor(props: Props){
        super(props);
        console.log('home');
    }
    _onSubmit = () =>{
        console.log('psotitem');
        this._goToNextPage();
    };

    _goToNextPage(){
        this.props.navigation.navigate('PostItem') ;
    }

    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.div}>
                    <Image source={Images.USER_LOGO} style={styles.user_logo}/>
                    <SearchBar round inputStyle={styles.searchBar} lightTheme={true} placeholder='Search anything by name' />
                </View>
                <Text> this.props.user.name</Text>
                <Text style={AppStyles.h3}> Search By Category</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Image resizeMode='contain' style={styles.category_image}  source={Images.CLOTHES_LOGO} />
                        <Text style={styles.category}> Clothes</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Image resizeMode='contain' style={styles.category_image}  source={Images.HOUSE_LOGO} />
                        <Text style={styles.category}> House Hold</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Image resizeMode='contain' style={styles.category_image}  source={Images.MOBILE_LOGO} />
                        <Text style={styles.category}> Electronics</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Image resizeMode='contain' style={styles.category_image}  source={Images.OTHER_LOGO} />
                        <Text style={styles.category}> Others</Text>
                    </View>
                </View>
                <ScrollView>
                <ItemCardComponent/>
                <ItemCardComponent/>
                <ItemCardComponent/>
                <ItemCardComponent/>
                </ScrollView>
                <TouchableOpacity style={{zIndex: 2}} onPress={() => this._onSubmit()}>
                <Image source={Images.BUTTON_ADD} style={AppStyles.button_add} />
                </TouchableOpacity>
            </View>

        );
    }
}


export default connect()(Home);
