import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    ImageBackground,
} from 'react-native';
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window')
function ItemCard(props) {
    return (
        <View style={{width:width - 40, height: height / 9,}}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Image
                    style={{
                        width: "40%",
                        height: "100%",
                        resizeMode: 'stretch',
                        borderRadius: 5,
                    }}
                    source={props.imageUri}
                />
                <View style={{ position: 'absolute' }}>
                    {
                        (props.prefer == 1) ?
                            <Badge status="error" value="Hot" style={{ color: 'white', paddingTop: 10 }}>
                                <Icon name="md-add-circle-outline" />
                            </Badge>
                            : <Text></Text>
                    }

                </View>

                <View style={{ marginHorizontal: 10, paddingVertical: 5, flex: 1 }}>
                    <View style={{ flexDirection: 'row', height: '70%', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {props.dishName}
                        </Text>
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green' }}>${props.price}</Text>
                            <Text style={{ fontSize: 15, color: '#c6c6c6', textDecorationLine: 'line-through' }}>${props.priceBefore}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5, alignItems: 'center' }}>
                        <Icon name="md-add-circle-outline" color="#ce2f34" size={20} />
                    </View>
                </View>
            </View>


        </View>


    );
}
export default ItemCard
