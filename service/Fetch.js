const baseUrl = "http://10.226.212.122:8000/api/";
const service = {
    fetchCoins: function () {
        
    },
    fetchCate: function (){
        return fetch(baseUrl+'categories')
            .then(response => response.json())
            .catch((error) => console.error(error));
    },
    fetchDishByCate: function (idCate){
        return fetch(baseUrl+'category/'+idCate)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }
}
export default service;