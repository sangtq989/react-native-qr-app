import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    Dimensions, Platform, TouchableOpacity, TouchableHighlight
} from 'react-native';

import DetailItem from '../Category/DetailItem'
import DetailDishScreen from '../../Dish/DetailDishScreen';
import { StackNavigator } from 'react-navigation';
import service from '../../../../service/Axios'
import global from '../../../../Global'


const { height, width } = Dimensions.get('window')
class Detail extends Component {
    name = this.props.navigation.state.params.name;
    constructor(props) {
        super(props);
        this.state = {
            dishes: [],
        };
    }
    goToDetail(id) {
        const { navigate } = this.props.navigation;
        navigate('DetailDishScreen', { id: id });
    }


    componentDidMount() {
        service.fetchDishByCate(this.props.navigation.state.params.id).then(res => {
            this.setState({ dishes: res.data });
        })
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),
        };
    };
    render() {
        return (
            <View style={{ backgroundColor: "white", width: '100%', height: '100%' }}>
                <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>

                </View>

                <ScrollView>
                    {
                        (this.state.dishes != []) ?
                            this.state.dishes.map(item => {
                                var thumbnail = JSON.parse(item.dish_thumbnail);

                                var uri = encodeURI(global.imgDirectory + thumbnail[0])

                                return (
                                    <TouchableOpacity key={item.id} onPress={() => { this.goToDetail(item.id) }}>
                                        <DetailItem
                                            imageUri={{ uri: uri }}
                                            dishName={item.dish_name}
                                            dishSlug={item.dish_slug}
                                            dishPrice={item.dish_price}
                                            dishDesc={item.dish_description}
                                        />
                                    </TouchableOpacity>

                                );
                            })
                            : <ActivityIndicator size="large" color="#00B970" style={{
                                flex: 1,
                                justifyContent: "center"
                            }} />
                    }
                </ScrollView>
            </View>
        );
    }

}
export default Detail;