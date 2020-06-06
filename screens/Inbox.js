import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    RefreshControl,
    Dimensions,
    Platform,
    ToastAndroid,
    AlertIOS,
    ActivityIndicator,
    ImageBackground
} from "react-native";
import service from '../service/Axios'
import CoinList from "./components/Test/CoinList";
import { connect } from 'react-redux';
import addToCart from '../action'
import store from '../store'
import NavigationService from '../service/NavigationService';
import message from '../service/ToastMessage'


import OrderItem from '../screens/components/Order/OrderItem'

import Constants from 'expo-constants';
const { height, width } = Dimensions.get('window')
class Inbox extends Component {

    initialState = {
        orders: [],
        data: null,
        refreshing: false,
        emptyOrder: true
    };
    constructor(props) {
        super(props);
        this.state = this.initialState
    }
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else if (Platform.OS === 'ios') {
            AlertIOS.alert(msg);
        }
    }
    _getUserData = async () => {
        try {
            var value = await AsyncStorage.getItem('userToken')
            // console.log(JSON.parse(result));   
            if (value != null) {
                this.setState({
                    data: JSON.parse(value)
                })
            }
        } catch (error) {

        }
    };
    async _cancel(order) {
        var user = await AsyncStorage.getItem('userToken');
        delete order.dishes;

        var data = {
            token: JSON.parse(user).token,
            order: order
        };
        // console.log(JSON.stringify(data))
        service.cancelOrder(JSON.stringify(data))
            .then(res => {
                console.log((res.data));
                (res.data) ? message('Cancel success') : message("Order is on the way, you can't cancel anymore")
            })
            .catch(err => {
                console.log("---------err-----------")
                console.log(err.response)
                message('This dish now on the way, please patient');
                this.setState(this.initialState);
                this.componentDidMount();
            }).finally(() =>{
                this.setState(this.initialState);
                this.componentDidMount();
            })
    }
    async getData() {
        await this._getUserData();
        service.getOrder(this.state.data).then(res => {
            if (res.data.length > 0) {
                this.setState({
                    orders: res.data,
                    emptyOrder: true
                })
            }

        }).catch(err => {
            console.log('oof--------------------')
            console.log(err.response)
            if (err.response.status = 422) {
                NavigationService.navigate('Auth')
            }
        })
    }

    async componentDidMount() {
        await this.getData()
    }
    onRefresh = (async () => {
        this.setState({ refreshing: true });
        this.setState(this.initialState);
        await this.componentDidMount();
        this.setState({ refreshing: false })
    });

    render() {
        return (
            <View style={{ height: height, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', paddingVertical: 10 }}>Your Order</Text>
                </View>
                <ScrollView
                    style={{ backgroundColor: '#EFEFEF', width: '100%', }}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                >
                    {
                        (typeof this.state.orders !== 'undefined' && this.state.orders.length > 0)
                            ?
                            this.state.orders.map((item) => {
                                console.log(item)
                                return (
                                    <View key={item.id} style={styles.cartItem}>
                                        <OrderItem click={this._cancel.bind(this)} order={item} dish={item.dishes} />
                                    </View>
                                )
                            })
                            : (this.state.emptyOrder) ?
                                <View style={{ height: height, width: width}}>
                                    <ImageBackground
                                        source={require('../assets/empty.jpg')}
                                        resizeMode='contain'
                                        style={{ width: '100%', height: '60%', marginLeft: 5 }}
                                    >
                                    </ImageBackground>
                                </View>
                            :
                            <View style={styles.container}><ActivityIndicator /></View>

                    }
                </ScrollView>
            </View>

        );
    }
}



export default (Inbox);

const styles = StyleSheet.create({

    indicator: {
        width: width
    },

    container: {
        flex: 10,
        marginTop: Constants.statusBarHeight,
        alignItems: "center"

    },
    cartItem: {
        width: width,
        marginVertical: 10
    },
});