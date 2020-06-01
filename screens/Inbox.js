import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    RefreshControl,
    Dimensions
} from "react-native";
import service from '../service/Axios'
import CoinList from "./components/Test/CoinList";
import { connect } from 'react-redux';
import addToCart from '../action'
import store from '../store'
import NavigationService from '../service/NavigationService';

import OrderItem from '../screens/components/Order/OrderItem'

import Constants from 'expo-constants';
const { height, width } = Dimensions.get('window')
class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            data: null,
            refreshing: false
        };
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

    async componentDidMount() {
        await this._getUserData();
        service.getOrder(this.state.data).then(res => {
            //console.log(res.data);
            this.setState({
                orders: res.data
            })
            console.log(this.state.orders)
        }).catch(err => {
            console.log('oof--------------------')
            console.log(err.response)
            //NavigationService.navigate('Auth')
        })
        console.log(this.state.data)
    }
    onRefresh = (async () => {
        this.setState({ refreshing: true });
        await this.componentDidMount();
        this.setState({ refreshing: false })
    });

    render() {

        return (
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
            >
                {
                    (typeof this.state.orders !== 'undefined' && this.state.orders.length > 0)
                        ?
                        this.state.orders.map(() => {
                            return (
                                <View>
                                    <Text>test</Text>
                                    <OrderItem title='Customized Card 1' expanded={false}>
                                        <Text>Hello, this is first line.</Text>
                                        <Text>Hello, this is second line.</Text>
                                        <Text>Hello, this is third line.</Text>
                                    </OrderItem>
                                </View>

                            )
                        })
                        :
                        <Text>Nothing</Text>

                }
            </ScrollView>
        );
    }
}



export default (Inbox);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});