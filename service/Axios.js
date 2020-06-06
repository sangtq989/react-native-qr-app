import axios from 'axios';
import global from "../Global";
import { AsyncStorage } from 'react-native'

const baseUrl = global.hostAddress;



async function loadToken() {
    let t = '';
    try {
        const tk = await AsyncStorage.getItem('userToken') || '';
        return t = JSON.parse(tk).token;
    } catch (error) {
        console.log('Load token error: ', error);
    }
}


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",      
    }
};
const serviceAxios = {
    fetchCate: function () {
        return axios.get(baseUrl + 'categories', axiosConfig);
    },
    fetchDishByCate: function (idCate) {
        return axios.get(baseUrl + 'category/' + idCate);
    },
    fetchAllDish: function () {
        return axios.get(baseUrl + 'all-dish');
    },
    fetchDishDetail: function (id) {
        return axios.get(baseUrl + 'dish/' + id);
    },
    submitCart: function (data) {
        return axios.post(baseUrl + 'checkout', data);
    },
    getOrder: (user) => {
        return axios.post(baseUrl + 'user-order', user);
    },
    cancelOrder: (data) =>{
        return axios.post(baseUrl + 'cancel-order', data,axiosConfig);
    }
}
export default serviceAxios;