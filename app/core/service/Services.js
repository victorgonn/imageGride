import axios from 'axios';
const BaseUrl = 'https://jsonplaceholder.typicode.com/photos';

axios.defaults.timeout = 500000;
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

const genericAxios = axios.create({
    baseURL: BaseUrl,
});

//region Login

export const getImageList = () => {
    return genericAxios.get();
};

//endregion
