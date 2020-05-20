import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class CoinList extends Component {

  static propTypes = {
    coins: PropTypes.array.isRequired
  };
  render() {
    return (
      <View style={styles.coinsList}>
        <Text>{this.props.coins.dish_name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  coinsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin:50
  },
  cointext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});