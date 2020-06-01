//Import React
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
    StatusBar,
    Button, AsyncStorage
} from 'react-native';

//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthenAxios from '../service/AuthenAxios'

import Login from './Login';
import Register from './Register';
import NavHome from '../NavHome';
import NavigationService from '../service/NavigationService';
class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken'); 
        const token = JSON.parse(userToken);      
        //console.log(token.token)       
        await AuthenAxios.checkToken(token).then(response => {
            //console.log(response.data);
            AsyncStorage.setItem('userToken',  JSON.stringify(response.data)).then(
                NavigationService.navigate('NavHome')
            );
        }).catch(error => {
            console.log(error.response)
            NavigationService.navigate('Auth')
        });
        //NavigationService.navigate(userToken ? 'NavHome' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}



const Auth = createStackNavigator(
    {
        Login: Login,
        Register: Register,
    },
    {
        headerMode: 'none'
    }
);

const App = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        NavHome: NavHome,
        Auth: Auth,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'AuthLoading',
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
// const AppContainer = createSwitchNavigator(App)
export default App;