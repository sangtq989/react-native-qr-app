import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  AsyncStorage,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Users from './users'

import AuthenAxios from '../service/AuthenAxios'

import NavigationService from '../service/NavigationService';
class Login extends Component {

  state = {
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    data: [],
  };
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken',  JSON.stringify(this.state.data));
    NavigationService.navigate('NavHome')
  };

  textInputChange(val) {
    if (val.trim().length >= 4) {
      this.setState({
        ...this.state,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      this.setState({
        ...this.state,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }
  handlePasswordChange(val) {
    if (val.trim().length >= 6) {
      this.setState({
        ...this.state,
        password: val,
        isValidPassword: true
      });
    } else {
      this.setState({
        ...this.state,
        password: val,
        isValidPassword: false
      });
    }
  }
  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry
    });
  }
  handleValidUser(val) {
    if (val.trim().length >= 4) {
      this.setState({
        ...this.state,
        isValidUser: true
      });
    } else {
      this.setState({
        ...this.state,
        isValidUser: false
      });
    }
  }

  async loginHandle(userName, password) {
    await AuthenAxios.login(userName, password).then(response => {     
      this.setState({
        ...this.state,
        data: response.data
      })
      console.log(this.state.data);
    }).catch(error => {
      console.log(error.response)
    });
    if (this.state.username.length == 0 || this.state.password.length == 0) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }
    if (this.state.token == '') {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        { text: 'Okay' }
      ]);
      return;
    }
    this._signInAsync()
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer,]}
        >
          <Text style={[styles.text_footer]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              size={20}
            />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => this.textInputChange(val)}
              onEndEditing={(e) => this.handleValidUser(e.nativeEvent.text)}
            />
            {this.state.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>
          {this.state.isValidUser ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
          }


          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Password</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={this.state.secureTextEntry}
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => this.handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={() => this.updateSecureTextEntry()}
            >
              {this.state.secureTextEntry ?
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>
          {this.state.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
          }


          <TouchableOpacity>
            <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => this.loginHandle(this.state.username, this.state.password)}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
              style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15
              }]}
            >
              <Text style={[styles.textSign, {
                color: '#009387'
              }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }


}
export default Login;
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
    height: height,
  },
  header: {

    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});