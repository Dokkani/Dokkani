
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import { SearchBar } from 'react-native-elements'
import AppStyles from "../../theme/AppStyles";
import ItemCardComponent from "./ItemCardComponent";
import { getPosts } from "../../actions";
import _ from 'lodash';
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
        this.state = {
            items : [],
            all_items: {}
        };
        console.log('home');
    }
    _onSubmit = () =>{
        this.props.navigation.navigate('PostItem') ;
    };

   async componentWillMount(){
        await this.props.getItems();
    }
   componentWillReceiveProps(nextProp){
        if(nextProp.items !== this.state.items){
            console.log('items: ', nextProp.items);
            this.setState({
                items: nextProp.items,
            })
        }
   }
   renderItem = ({ item, index }) => (
        <ItemCardComponent key={index} item={item}/>
       );


    _searchByCategories = category => {
        let items = _.filter(this.props.items, ['category', category]);
        this.setState({
            items,
        })
   };
   render() {
        return (
            <View style={styles.container}>
                <View  style={styles.div}>
                    <Image source={Images.USER_LOGO} style={styles.user_logo}/>
                    <SearchBar round inputStyle={styles.searchBar} lightTheme={true} placeholder='Search anything by name' style={{marginLeft: -25}} />
                </View>
                <Text style={AppStyles.h3}> Search By Category</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}} >
                        <TouchableOpacity style={{zIndex: 2}} onPress={() => this._searchByCategories('clothes')}>
                             <Image resizeMode='contain' style={styles.category_image}  source={Images.CLOTHES_LOGO} />
                        </TouchableOpacity>
                        <Text style={styles.category}> Clothes</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <TouchableOpacity style={{zIndex: 2}} onPress={() => this._searchByCategories('household')}>
                        <Image resizeMode='contain' style={styles.category_image}  source={Images.HOUSE_LOGO}/>
                        </TouchableOpacity>
                        <Text style={styles.category}> House Hold</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <TouchableOpacity style={{zIndex: 2}} onPress={() => this._searchByCategories('electronics')}>
                        <Image resizeMode='contain' style={styles.category_image}  source={Images.MOBILE_LOGO} />
                        </TouchableOpacity>
                        <Text style={styles.category}> Electronics</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <TouchableOpacity style={{zIndex: 2}} onPress={() => this._searchByCategories('tools')}>
                        <Image resizeMode='contain' style={styles.category_image}  source={Images.OTHER_LOGO}  />
                        </TouchableOpacity>
                        <Text style={styles.category}> Others</Text>
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.items}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
                        />
                </ScrollView>
                <TouchableOpacity style={{zIndex: 2}} onPress={() => this._onSubmit()}>
                    <Image source={Images.BUTTON_ADD} style={AppStyles.button_add} />
                </TouchableOpacity>
            </View>

        );
    }
    _keyExtractor = (item, index) => item.id;
}

const mapStatetoProp = state => {
    return {
        items: state.posts.items,
        error: state.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getItems: () => {
            dispatch(getPosts());
        }
    };
};
export default connect(mapStatetoProp, mapDispatchToProps)(Home);
