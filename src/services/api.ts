import axios from 'axios';
const URL = 'https://api-rede-social.herokuapp.com'
const api = axios.create({
    baseURL: URL
});
export { URL };
export default api;