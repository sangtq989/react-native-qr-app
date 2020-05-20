import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Explore from './screens/Explore'
import Cart from './screens/Cart'
import Inbox from './screens/Inbox'
import Profile from './screens/Profile'
import Scan from './screens/Scan'
import CartIcon from './screens/components/Cart/CartIcon'




const { height, width } = Dimensions.get('window');

const NavHome = createBottomTabNavigator({
    Explore: {
        screen: Explore,
        navigationOptions: {
            tabBarLabel: 'EXPLORE',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-search" color={tintColor} size={24} />
            )
        }
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            tabBarLabel: 'Cart',
            tabBarIcon: ({ tintColor }) => (
                <CartIcon name="md-cart" color={tintColor} size={24} />
            )
        }
    },
    Scan: {
        screen: Scan,
        navigationOptions: {
            tabBarLabel: 'Scan',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-qr-scanner" color={tintColor} size={24} />
            ),
            header: null,
            style: {
                width: width,
                height: height
            }
        }
    },
    Inbox: {
        screen: Inbox,
        navigationOptions: {
            tabBarLabel: 'INBOX',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-chatboxes" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" color={tintColor} size={24} />
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        style: {
            borderTopWidth: 0,
        }
    }
});

// const NavHome = createAppContainer(NavHomeContainer);
export default (NavHome)