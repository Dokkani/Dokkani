import { StyleSheet, View, Image, Text } from 'react-native';
import React, { Component } from 'react';
import { Colors, Images } from '../../theme';
import { Card } from 'react-native-elements'



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        flex: 1
    },
});

class ItemCardComponent extends Component{
        render() {
        const { item } = this.props;
        console.log('ItemCardComponent', `data:${item.images[0].mime_type};base64,${item.images[0].source}`);
        return (
            <Card style={styles.container}>
                { item.images ?
                    <Image
                        style={{
                            width: 51,
                            height: 51,
                            borderRadius: 25,
                            resizeMode: 'contain',
                        }}
                        source={{ isStatic: true, uri: `data:${item.images[0].mime_type};base64,${item.images[0].source}`}} />
                    : <Image source={Images.item}/>
                }
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text name='user_name'>{item.user_name} </Text>
                        <Text name='item_price' style={{marginLeft: 90}}>${item.price}/Day</Text>
                    </View>
                    <Text> Posted {item.title}</Text>
                    <Text>{item.description}</Text>
                    <View style={{flexDirection: 'row' }}>
                        <Text name='location'>{item.location}</Text>
                        <Text name='posted_At'> {item.date}</Text>
                        <Image source={Images.TEXT}/>
                        <Image source={Images.HEART_SAVED}/>
                    </View>
                </View>
            </Card>

        )
    }
}
export default  ItemCardComponent;
