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
        return (
            <Card style={styles.container}>
                <Image source={Images.item}/>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text name='user_name'>John Doe </Text>
                        <Text name='item_price'>$19/Day</Text>
                    </View>
                    <Text> Posted a Surfboard</Text>
                    <Text> This Surfboard is a good brand, brand new great for beginner</Text>
                    <View style={{flexDirection: 'row' }}>
                            <Image source={Images.LOCATOR} />
                            <Text name='location'>Venice</Text>
                        <Text name='posted_At'> An Hour Ago</Text>
                        <Image source={Images.TEXT}/>
                        <Image source={Images.HEART_SAVED}/>
                    </View>
                </View>
            </Card>

        )
    }
}
export default  ItemCardComponent
