import React, { Component, } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
    Button,
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native'
import { SliderBox } from "react-native-image-slider-box";

import service from '../../../service/Axios';
import global from '../../../Global'
import { connect } from 'react-redux';
import * as CartAction from '../../../action'

const { height, width } = Dimensions.get('window')
class DetailDishScreen extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dishDetail: "",
            images: null
        };
    }
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else if (Platform.OS === 'ios') {
            AlertIOS.alert(msg);
        }
    }
    handle(item) {
        this.props.addItem(item);
        this.notifyMessage('Added to cart');
    }

    async  componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            await service.fetchDishDetail(this.props.navigation.state.params.id).then(res => {
                this.setState({
                    dishDetail: res.data,
                    images: res.data.dish_thumbnail
                });
            })

        }

    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const img = JSON.parse(this.state.images);
        if (img != null) {
            var i = Object.values(img);
            var i2 = i.map(el => global.imgDirectory + el)
        }

        return (
            <View style={styles.container}>
                {
                    (i != null) ?
                        <SliderBox
                            images={i2}
                            autoplay={true}
                            sliderBoxHeight={height / 3}
                            ImageComponentStyle={{ borderRadius: 5, width: '97%', marginTop: 5 }}
                            resizeMethod={'resize'}
                            resizeMode={'stretch'}
                            dotColor="#00B970"
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 0,
                                padding: 0,
                                margin: 0,
                                backgroundColor: "rgba(128, 128, 128, 0.92)"
                            }}
                        />
                        :
                        <ActivityIndicator size="large" color="#00B970" style={{
                            flex: 1,
                            justifyContent: "center"
                        }} />
                }

                <View style={styles.detail}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.state.dishDetail.dish_name}</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#33C386' }}>$ {this.state.dishDetail.dish_price}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text textBreakStrategy="balanced" style={{ textAlign: 'justify' }}>
                            {this.state.dishDetail.dish_description}
                        </Text>
                    </View>
                    <View style={styles.button}>
                        {
                            (this.state.dishDetail != '') ?
                                <Button
                                    title="Add to cart"
                                    color="#841584"
                                    onPress={() => this.handle(this.state.dishDetail)}
                                /> :
                                <Text></Text>
                        }


                    </View>
                </View>

            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (product) => {
            dispatch(CartAction.addToCartUnsafe(product))
        }
    }
}

export default connect(null, mapDispatchToProps)(DetailDishScreen)
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingTop: Platform.OS == 'android' ? 30 : null
    },
    detail: {
        padding: 20,
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: height / 12,
        justifyContent: 'space-between',
        flex: 2
    },
    content: {
        flex: 5
    },
    button: {
        marginTop: 10,
        justifyContent: "flex-end",
        flex: 5
    }

})
