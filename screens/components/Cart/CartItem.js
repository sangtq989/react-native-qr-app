import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import * as CartAction from '../../../action'
import global from '../../../Global'


const { height, width } = Dimensions.get('window');
class CartItem extends Component {
    add(item) {
        this.props.addItem(item);
    }
    remove(item) {
        this.props.removeItem(item);
    }
    delete(item){
       this.props.deleteItem(item)
    }
    click(id) {
        console.log(id)
    }
    render() {
        const dish = this.props.dish
        var thumbnail = JSON.parse(dish.dish_thumbnail);
        var uri = encodeURI(global.imgDirectory + thumbnail[0]);        
        return (
            
            <View style={{
                width: width - 40, height: height / 8
            }}>
                <View style={{ flexDirection: 'row', height: "100%", width: '100%' }}>

                    <View style={{
                        width: "40%",
                        height: "100%",                        
                    }}>
                        <TouchableOpacity onPress={() => this.click(dish.id)}>
                            <Image style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 5,
                                resizeMode: 'stretch',
                            }} source={{uri: uri}} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '60%', paddingVertical: 5, paddingHorizontal: 10 }}>
                        <View style={{ flex: 1, height: '70%', }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontSize: 15, flex: 12, fontWeight: 'bold' }}>
                                    {dish.dish_name}
                                </Text>
                                <TouchableOpacity onPress={()=> this.delete(dish)}>
                                    <Icon name="md-close" size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green', paddingEnd: 10 }}>${dish.dish_price * dish.qty}</Text>
                                <Text style={{ fontSize: 15, color: '#c6c6c6', textDecorationLine: 'line-through', }}>${dish.dish_price * dish.qty + 12}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity onPress={() => this.remove(dish)}>
                                    <Icon name="md-remove" color="#ce2f34" size={20} />
                                </TouchableOpacity>
                                <Text style={{ paddingHorizontal: 10, fontSize: 15 }}>{dish.qty}</Text>
                                <TouchableOpacity onPress={() => this.add(dish)}>
                                    <Icon name="md-add" color="#ce2f34" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </View>


        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => {
            dispatch(CartAction.removeFromCart(product))
        },
        addItem: (product) => {
            dispatch(CartAction.addToCartUnsafe(product))
        },
        deleteItem: (product) => {
            dispatch(CartAction.remove1FromCart(product))
        }
    }
}
export default connect(null, mapDispatchToProps)(CartItem);