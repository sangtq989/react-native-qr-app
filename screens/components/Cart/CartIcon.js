import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';

class CartIcon extends Component {
    render() {
        const { name, color, size } = this.props;
        return (
          <View style={{ width: 24, height: 24, margin: 5 }}>
            <Icon name={name} size={size} color={color} />
            {this.props.length > 0 && (
              <View
                style={{
                  // If you're using react-native < 0.57 overflow outside of parent
                  // will not work on Android, see https://git.io/fhLJ8
                  position: 'absolute',
                  right: -6,
                  top: -3,
                  backgroundColor: 'red',
                  borderRadius: 6,
                  width: 12,
                  height: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 8, fontWeight: 'bold', textAlign:'auto'}}>
                  {this.props.length}
                </Text>
              </View>
            )}
          </View>
        );
    }
}

function mapStateToProps(state) {
  return {
      length: state.cartItem.length,
  }
};
export default connect(mapStateToProps)(CartIcon)