import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'


const { height, width } = Dimensions.get('window')
export default class DetailItem extends Component {
    render() {
        return (
            <View style={styles.container}>
               

                <Image source={this.props.imageUri}
                    style={styles.thumbnail} />

                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 20, fontWeight:'bold' }}>
                            {this.props.dishName}
                        </Text>
                        <Text style={{fontSize: 15, fontWeight:'bold',color:'green'}}>
                            $ {this.props.dishPrice}
                        </Text>
                    </View>
                    <View style={{alignContent:'center', paddingTop:5}}>
                        <Text numberOfLines={2} style={{fontSize: 15,color:'#C6C6C7'}}>{this.props.dishDesc}</Text>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#dddd",
        height: height/6

    },
    thumbnail: {
        padding: 10,
        borderRadius: 10,
        width: '30%',
        resizeMode: 'stretch'
    },
    content: {
        width:'70%',
        height:'100%',
        paddingHorizontal:15,
        paddingBottom:10
    }


})
