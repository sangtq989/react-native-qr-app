import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions, TouchableHighlight, TouchableOpacity, ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation';

import global from '../Global'
import service from '../service/Axios';

import Detail from './components/Exprore/Category/Detail';
import ItemCard from './components/ItemCard';
import Category from './components/Exprore/Category';
import DetailDishScreen from "./components/Dish/DetailDishScreen";
import AllCategoriesScreen from "./components/Category/AllCategoriesScreen"
import Loader from "../screens/components/Loader"
import Scan from "../screens/Scan"



const { height, width } = Dimensions.get('window')
class Explore extends Component {
    static navigationOptions = {
        title: 'He`',
      };
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            allCate: [],
            dishNew: []
        };
    }

    goToAllCate(allCate) {
        this.props.navigation.navigate('AllCategoriesScreen', { allCate: allCate });
    }

    goToDetail(idCate, nameCate) {
        this.props.navigation.navigate('Detail', { id: idCate, name: nameCate });
    }
    goToDetailDish(id) {
        const { navigate } = this.props.navigation;
        navigate('DetailDishScreen', { id: id });
    }

    componentDidMount() {
        this._isMounted = true;
        
        if (this._isMounted) {
            service.fetchCate().then(res => {
                this.setState({
                    allCate: res.data
                });
            //    console.log(res.config.headers)
            })
            service.fetchAllDish().then(res => {
                this.setState({
                    ...this.state.dishNew,
                    dishNew: res.data
                });
            })
        }


    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        // console.log(this.state.dishNew)
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <View style={{ paddingVertical: 10, backgroundColor: 'white', }}>
                        <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            
                        }}>
                            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Search"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                    </View>
                    <ScrollView scrollEventThrottle={16} style={{ paddingBottom: 20 }}>
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                    Category
                                </Text>

                                <TouchableOpacity onPress={() => this.goToAllCate(this.state.allCate)}>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 20, color: 'green', alignSelf: 'center' }}>
                                        See all
                                </Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ height: 130, marginTop: 20, }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {(this.state.allCate.length == 0) ? <View style={styles.cateLoader}><ActivityIndicator size="large" color="#00ff00" /></View> : this.state.allCate.map(item => {
                                        return (

                                            <TouchableOpacity key={item.id} onPress={() => this.goToDetail(item.id, item.category_name)}>
                                                <Category imageUri={{ uri: global.imgDirectory + "categories/" + item.cate_thumbnail }}
                                                    name={item.category_name}
                                                />
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20, }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    Meal today
                                </Text>

                                <View style={{ width: width - 40, height: 200, marginTop: 20, marginBottom: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/home.jpg')}
                                    />
                                </View>

                                {

                                    (this.state.dishNew.length == 0) ? <View style={styles.contentLoader}><ActivityIndicator size="large" color="#00ff00" /></View> :
                                        this.state.dishNew.map(item => {
                                            {
                                                var thumbnail = JSON.parse(item.dish_thumbnail);
                                                var uri = encodeURI(global.imgDirectory + thumbnail[0]);
                                                {/* console.log(item.dish_thumbnail);  */ }
                                            }
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

                                                }}>
                                                    <TouchableOpacity onPress={() => this.goToDetailDish(item.id)}>
                                                        <ItemCard
                                                            dishName={item.dish_name}
                                                            price={item.dish_price}
                                                            priceBefore={item.dish_price + 12}
                                                            imageUri={{ uri: uri }}
                                                            prefer={item.dish_prefer}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })
                                }
                            </View>
                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Explore = createStackNavigator({
    Explore: {
        screen: Explore,
        navigationOptions: {
            header: null,
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }
        }
    },
    AllCategoriesScreen: {
        screen: AllCategoriesScreen,
        navigationOptions: {
            title: "All categories",
        }
    },
    DetailDishScreen: {
        screen: DetailDishScreen,
        navigationOptions: {
            header: null,
        }
    },

}, {

});
const styles = StyleSheet.create({
    cateLoader: {
        flex: 1,
        width: width,
        justifyContent: 'center'
    },
    contentLoader: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
    }
});
