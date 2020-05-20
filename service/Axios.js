import axios from 'axios';
import global from "../Global"

const baseUrl = global.hostAddress;
const serviceAxios = {
    fetchCoins: function () {

    },
    fetchCate: function () {
        return axios.get(baseUrl + 'categories');
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
        return axios.post(baseUrl+'checkout', data);
    }


}
export default serviceAxios;