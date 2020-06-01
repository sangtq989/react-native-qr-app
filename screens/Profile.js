import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions, Platform,
    AsyncStorage, TouchableOpacity,
    ActivityIndicator 
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import global from '../Global';
import NavigationService from '../service/NavigationService';

const { height, width } = Dimensions.get('window')
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        NavigationService.navigate('Auth')
    };
    _getUserData = async () => {
        try {
            var value = await AsyncStorage.getItem('userToken')
            // console.log(JSON.parse(result));   
            if (value != null) {
                this.setState({
                    data: JSON.parse(value)
                })
            }
        } catch (error) {

        }
    };
    //        

    async componentDidMount() {
        await this._getUserData()
        console.log(this.state.data)
    }
    render() {
        return (
            (this.state.data == null) ? 
            <ActivityIndicator style={styles.center}/> :
                <View style={styles.container}>
                    <View>
                        <Text style={styles.header}>Profile</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Image
                            style={{
                                resizeMode: "cover",
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#dddddd',
                                width: height / 12,
                                height: '100%',
                            }}
                            source={{ uri: global.imgDirectory + 'avatar/' + this.state.data.user.avatar }}
                        />
                        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                            <Text style={{ fontSize: 18 }}>{this.state.data.user.name}</Text>
                            <Text style={{ color: '#c6c6c6' }}>{this.state.data.user.email}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Icon name="md-book" size={20} color="green" />
                        <Text style={{ paddingHorizontal: 20 }}>Terms of condition</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name="md-information-circle-outline" size={20} color="green" />
                        <Text style={{ paddingHorizontal: 20 }}>About me</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name="md-share" size={20} color="green" />
                        <Text style={{ paddingHorizontal: 20 }}>Share</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name="md-log-out" size={20} color="red" />
                        <TouchableOpacity onPress={() => this._signOutAsync()}>
                            <Text style={{ paddingHorizontal: 20 }}>Log out</Text>

                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    center:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginTop: Platform.OS == 'android' ? 40 : 0,
        width: width,
        height: height,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        paddingHorizontal: 20,

    },
    avatar: {
        marginVertical: 20,
        height: height / 12,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    item: {
        borderTopWidth: 0.5,
        borderColor: '#dddddd',
        width: 'auto',
        flexDirection: 'row',
        height: height / 15,
        paddingHorizontal: 20,
        alignItems: 'center'

    }
});