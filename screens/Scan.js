import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform, Image,
    SafeAreaView,
    Alert,
    Modal,
    TouchableHighlight,
    ToastAndroid,
    AlertIOS,
    ActivityIndicator,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';

import { withNavigationFocus } from 'react-navigation'
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import * as CartAction from '../action'

import service from '../service/Axios';
import global from '../Global'
import NavigationService from '../service/NavigationService';

import CameraComp from '../screens/components/Camera'

const { height, width } = Dimensions.get('window')
const opacity = 'rgba(0, 0, 0, .6)';
class Scan extends Component {
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else if (Platform.OS === 'ios') {
            AlertIOS.alert(msg);
        }
    }
    // Component State
    state = {
        hasCameraPermission: null, // if app has permissions to acess camera
        isScanned: false,  // scanned
        modalVisible: false,
        dishData: [],
        uri: '',
        // isFocused: this.props.navigation.isFocused(),
    }
    async componentDidMount() {
        // ask for camera permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        console.log(status);
        this.setState({ hasCameraPermission: status === "granted" ? true : false });
    }
    handleBarCodeScanned = ({ data }) => {
        try {
            var obj = JSON.parse(data);
            this.getURI(obj)
        } catch (error) {
            console.log(error)
        }
        if (obj != undefined) {
            this.setState({ modalVisible: true });
            service.fetchDishDetail(obj.id).then(res => {
                this.setState({
                    dishData: res.data
                });
            })
        } else {
            this.notifyMessage("Maybe it not our QR code, Please try again");
        }


    }
    handle(item) {
        this.props.addItem(item);
        this.notifyMessage('Added to cart');
    }
    renderCamera() {
        const focus = this.props.navigation.isFocused()
        const { hasCameraPermission, isScanned } = this.state;
        if (hasCameraPermission === false) {
            //permission denied
            return (
                <Text>Grand permison</Text>
            )
        } else if (!focus) {
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
    getURI(obj) {
        try {
            var t = obj.dish_thumbnail;
            var thumbnail = JSON.parse(t);
            const uri = encodeURI(global.imgDirectory + thumbnail[Object.keys(thumbnail)[0]]);
            this.setState({ uri: uri })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, width: width, height: height }}>
                {this.renderCamera()}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {

                                (this.state.dishData.length == 0) ?
                                    <View style={styles.cateLoader}><ActivityIndicator size="large" color="#00ff00" /></View>
                                    :
                                    <View>
                                        <Image
                                            style={{ width: '100%', height: "40%", resizeMode: 'stretch', borderTopLeftRadius: 7, borderTopRightRadius: 7 }}
                                            source={{ uri: this.state.uri }}
                                        />
                                        <View style={{
                                            position: 'absolute', top: 10,
                                            right: 10,
                                        }}>
                                            <TouchableHighlight style={{
                                                width: 20,
                                                height: 20,
                                            }} onPress={() => this.setState({ modalVisible: false })}>
                                                <Icon name="md-close" color={'rgba(255,255,255,0.7)'} size={24} />
                                            </TouchableHighlight>
                                        </View>
                                        <Text style={styles.modalText}>{this.state.dishData.dish_name}</Text>
                                        <Text textBreakStrategy="balanced" style={styles.modalContent}>{this.state.dishData.dish_description}</Text>
                                        <View style={styles.modalButton}>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: "#DB3C36" }}
                                                onPress={() => {
                                                    this.setState({ modalVisible: false });
                                                    this.handle(this.state.dishData)
                                                }}>
                                                <Text style={styles.textStyle}> <Icon name="md-cart" size={18} /> Add to cart</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: "#09A561" }}
                                                onPress={() => {
                                                    this.setState({ modalVisible: false });
                                                    NavigationService.navigate('DetailDishScreen', { id: this.state.dishData.id })
                                                }}>
                                                <Text style={styles.textStyle}><Icon name="md-menu" size={18} /> Go to detail</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                            }
                        </View>
                    </View>
                </Modal>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (product) => {
            dispatch(CartAction.addToCartUnsafe(product))
        }
    }
}

export default connect(null, mapDispatchToProps)(withNavigationFocus(Scan))