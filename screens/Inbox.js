import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableHighlight, ScrollView
} from "react-native";
import service from '../service/Axios'
import CoinList from "./components/Test/CoinList";
import { connect } from 'react-redux';
import addToCart from '../action'
import store from '../store'

class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: [],
        };
    }

    handle(payload) {        
        this.props.addItem(payload);
    }

    componentDidMount() {
        
    }
    render() {

        return (
            <Text>Hello</Text>
        );
    }
}



export default (Inbox);

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});