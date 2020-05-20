import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { Provider } from 'react-redux';
import store from './store';
import NavHome from './NavHome'
import NavigationService from './service/NavigationService';
import AppContainer from './auth/AuthStack'

class App extends Component {
  render() {
    return (
      <Provider store={store}>


        <NavHome ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        />
      </Provider>
    )
  }

}

export default App;
