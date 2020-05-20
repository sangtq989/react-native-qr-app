import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,Platform
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'


const { height, width } = Dimensions.get('window')
class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>Profile</Text>
                </View>
                <View style={styles.avatar}>
                    <Image
                        style={{resizeMode:"cover", 
                        borderRadius: 10, 
                        borderWidth: 1, 
                        borderColor: '#dddddd',
                        width: height/12 ,
                        height:'100%',
                        }}
                        source={require('../assets/home.jpg')}
                    />
                    <View style={{paddingHorizontal:20,paddingVertical:10}}>
                        <Text style={{fontSize:18}}>Pham Duc Sang</Text>
                        <Text style={{color:'#c6c6c6'}}>Sangtq969@gmail.com</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon name="md-book" size={20} color="green" />
                    <Text style={{paddingHorizontal:20}}>Terms of condition</Text>
                </View>
                <View style={styles.item}>
                    <Icon name="md-information-circle-outline" size={20} color="green" />
                    <Text style={{paddingHorizontal:20}}>About me</Text>
                </View>
                <View style={styles.item}>
                    <Icon name="md-share" size={20} color="green" />
                    <Text style={{paddingHorizontal:20}}>Share</Text>
                </View>
                <View style={styles.item}>
                    <Icon name="md-log-out" size={20} color="red" />
                    <Text style={{paddingHorizontal:20}}>Log out</Text>
                </View>
            </View>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'android' ? 40 : 0 ,
        width: width,
        height: height,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        paddingHorizontal: 20,

    },
    avatar: {        
        marginVertical:20,              
        height: height/12,       
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    item:{
        borderTopWidth: 0.5, 
        borderColor: '#dddddd',
        width:'auto',
        flexDirection: 'row',       
        height: height/15,        
        paddingHorizontal: 20,
        alignItems:'center'   
        
    }
});