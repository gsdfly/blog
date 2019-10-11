import axios from 'axios'
import config from '@/utils/config';
let instance = axios.create({
    baseURL:'/api'
});

instance.interceptors.request.use((config:any) => {
    let token = localStorage.getItem('token');
    if(token){
        config.headers['token'] = token;
    }
    return config
},(error:any)=>{
    return Promise.reject(error);
})

instance.interceptors.response.use((config:any) => {
    return config.data
},(error:any)=>{
    return Promise.reject(error);
})
export default instance;
