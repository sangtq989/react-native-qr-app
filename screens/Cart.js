import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
    Button,
    TouchableOpacity,
    Image,
    ImageBackground,
    Modal,
    Alert
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


import CartItem from "./components/Cart/CartItem";
import { connect } from 'react-redux';
import service from '../service/Axios';
import * as CartAction from '../action'

const { height, width } = Dimensions.get('window')
class Cart extends Component {
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else if (Platform.OS === 'ios') {
            AlertIOS.alert(msg);
        }
    }
    state = {
        total: 0,
        modalVisible: false
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    createTwoButtonAlert = () =>
        Alert.alert(
            "Confirm your order",
            "Do you want confirm your order",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.submitHandle(this.props.cart) }
            ],
            { cancelable: false }
        );





    calculate() {
        var total = 0
        if (this.props.cart.payload.length > 0) {
            this.props.cart.payload.map(item => {
                total += item.dish_price * item.qty
            })
        }
        return total
    }

    submitHandle(data) {
        // console.log(data);
        data.payload.forEach(function (item) {
            delete item.dish_thumbnail;
            delete item.dish_description;
        });


        //console.log(JSON.stringify(data[0]));     
        service.submitCart(data).then(res => {
            // console.log(res.data);
            if (res.data.success == "success") {
                this.setModalVisible(true);
                this.props.checkout();
            }else{
                this.notifyMessage('Something wrong with internet');
            }
            
        })
    }

    componentDidMount() {
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => { this.setModalVisible(false) }}
                    >
                        <View style={styles.blur}>
                            <View style={styles.modalView}>
                                <Image style={styles.gif} source={require('../assets/success.gif')} />
                                <Text style={styles.modalText}>Your oder has been received</Text>
                                <View style={styles.btnWraper}>
                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#09A561" }}
                                        onPress={() => {
                                            this.setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}> <Icon name="md-checkmark" size={20} /> Back to cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, marginTop: Platform.OS == 'android' ? 40 : 0 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>Cart</Text>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20 }}>Subtotal: </Text>
                        <Text style={{ alignSelf: 'center', color: 'green', fontSize: 20, fontWeight: '700' }}>$ {this.props.cart.total}</Text>
                    </View>
                </View>

                <ScrollView style={{ paddingVertical: 10, backgroundColor: '#ededed' }}>
                    {
                        (typeof this.props.cart.payload !== 'undefined' && this.props.cart.payload.length > 0) ?

                            this.props.cart.payload.map((item) => {
                                return (
                                    <View key={item.id} style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        marginBottom: 10,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        marginHorizontal: 20
                                    }}>
                                        <CartItem dish={item} />

                                    </View>
                                )
                            })

                            :
                            <View style={{ height: height, width: width }}>
                                <ImageBackground
                                    source={require('../assets/empty.jpg')}
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '60%', marginLeft: 5 }}
                                >
                                </ImageBackground>
                            </View>

                    }
                </ScrollView>
                <View style={{ padding: 20 }}>
                    {
                        (this.props.cart.payload.length == 0) ?
                            <Button title="Please choose at least 1 dish" disabled={true} borderRadius="20" />
                            :
                            <Button title="Check out" color="green" borderRadius="20" onPress={this.createTwoButtonAlert} />

                    }

                </View>
            </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        cart: {
            payload: state.cartItem,
            total: state.total,
        }

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkout: (product) => {
            dispatch(CartAction.checkout(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gif: {
        width: "100%",
        height: '50%',
        borderRadius: 20,
    },
    blur: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .6)'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "80%",
        height: '50%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    btnWraper: {
        flex: 1,
        justifyContent: "flex-end"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom:10

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 20,
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",        
    }
});
