import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Animated,
    TouchableHighlight, Button,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';


import Collapsible from 'react-native-collapsible';
import service from '../../../service/Axios'

const { height, width } = Dimensions.get('window')

export default class OrderItem extends Component {
    state = {
        isCollapsed: true
    }
    constructor(props) {
        super(props);
    }

    _renderSwitch(param) {
        switch (param) {
            case 0:
                return (
                    <View style={styles.footer}>
                        <View>
                            <Text>Status</Text>
                            <Text style={{ color: "#FFC871" }}>Pending</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {this._renderButton()}
                        </View>

                    </View>
                )

            case 2:
                return (
                    <View style={styles.footer}>
                        <View>
                            <Text>Status</Text>
                            <Text style={{ color: "#C93A5B" }}>Cancelled</Text>
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.footer}>
                        <View>
                            <Text>Status</Text>
                            <Text style={{ color: "#437eb7" }}>Delivered</Text>
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.footer}>
                        <View>
                            <Text>Status</Text>
                            <Text style={{ color: "#25C486" }}>On the ways</Text>
                        </View>
                    </View>
                );
            default:
                return 'foo';
        }
    }
    _renderButton() {
        return (
            <TouchableOpacity onPress={() => this.props.click(this.props.order)}>
                <View
                    style={{
                        backgroundColor: '#F6E0E7',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        marginTop: 5
                    }}>
                    <Text style={{ color: '#CC687F', fontWeight: 'bold' }}>
                        Cancel
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.setState({
                    isCollapsed: !this.state.isCollapsed
                })}>
                    <View style={[styles.title]}>
                        <View>
                            <Text style={{ color: '#1B9D69', fontWeight: 'bold' }}>Order #{this.props.order.id}</Text>
                            <Text style={styles.text}>{this.props.order.order_at}</Text>
                        </View>
                        <View>
                            <Text>$ {this.props.order.order_total_price}</Text>
                            <Text style={styles.text}>items</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={this.state.isCollapsed}>
                    <View style={styles.item}>
                        {this.props.dish.map(item => {
                            return (
                                <View key={item.dish_name} style={styles.row}>
                                    <Text style={styles.text}>{item.dish_name} x{item.pivot.quantity}</Text>
                                    <Text style={styles.text}>$ {item.dish_price}</Text>
                                </View>
                            )
                        })}
                    </View>
                    {
                        this._renderSwitch(this.props.order.order_status)
                    }
                </Collapsible>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white'
    }, text: {
        color: "#cbcbcb"
    },
    row: {
        width: '100%',
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingVertical: 20,
        borderBottomColor: "#cbcbcb",
        borderBottomWidth: 1,
        borderRadius: 20

    },
    item: {
        padding: 10
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignContent: "center",
    }
})
