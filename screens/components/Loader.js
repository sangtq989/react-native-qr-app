import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";

export default class Loader extends Component {
    render() {
        return (
            <View>
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../../1531-loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    }
})
