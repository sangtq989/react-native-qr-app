import React, { Component } from 'react'
import { Text, View ,SafeAreaView,StyleSheet, Dimensions} from 'react-native'
import { withNavigationFocus } from "react-navigation";
import { Camera } from 'expo-camera';


const { height, width } = Dimensions.get('window')
const opacity = 'rgba(0, 0, 0, .6)';
class CameraComp extends Component {
    renderCamera() {
        const focus = this.props.navigation.isFocused()
        if (!focus) {
            return null
        } else if (focus) {
            return (
                <SafeAreaView style={styles.container}>
                    <Camera
                        onBarCodeScanned={isScanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFill} ratio="16:9" type={Camera.Constants.Type.back} >
                        <View style={styles.layerTop}>
                            <Text style={styles.header}>Put the dish QR here</Text>

                        </View>
                        <View style={styles.layerCenter}>
                            <View style={styles.layerLeft} />
                            <View style={styles.focused} />
                            <View style={styles.layerRight} />
                        </View>
                        <View style={styles.layerBottom} />
                    </Camera>
                </SafeAreaView>
            )
        }
    }
    render() {
        return (
          <View style={{ flex: 1 }}>
             {this.renderCamera()}
          </View>
          )
    }
}
const styles = StyleSheet.create({
    cateLoader: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    header: {
        fontSize: 30,
        alignSelf: "center",
        color: 'white',
        marginTop: height / 9
    },
    layerTop: {
        flex: 3,
        backgroundColor: opacity,
        alignItems: "center",

    },
    layerCenter: {
        flex: 3,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        width: width * 0.7,
        height: width * 0.7,
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 3,
        backgroundColor: opacity
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        height: '70%',
        width: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,

    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginVertical: 15,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    modalContent: {
        height: '40%',
        paddingHorizontal: 10,
        textAlign: 'justify'
        // backgroundColor: 'blue'
    },
    modalButton: {
        flexDirection: "row",
        justifyContent: 'space-around'
    }

});
export default withNavigationFocus(CameraComp)