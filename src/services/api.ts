import axios from 'axios';

const api = axios.create({
    baseURL: 'http://redesocialapirest-com-br.umbler.net'
}); 

export default api;