import axios from 'axios';
import global from "../Global";
import { AsyncStorage } from 'react-native'

const baseUrl = global.hostAddress;
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };
const authAxios = {
    login : function(username, password){
        const credentials ={email: username, password:password};
        console.log(JSON.stringify(credentials));
        return axios.post(baseUrl+'login', JSON.stringify(credentials),axiosConfig)       
    },
    checkToken: (token) =>{
        return axios.post(baseUrl+'check-token', JSON.stringify(token) ,axiosConfig)   
    }
}
export default authAxios;