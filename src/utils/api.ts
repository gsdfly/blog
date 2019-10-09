import axios from 'axios'
import config from '@/utils/config';
let instance = axios.create({
    // baseURL:config.baseURI
});

instance.interceptors.request.use((config:any) => {
    return config
},(error:any)=>{
    return Promise.reject(error);
})

instance.interceptors.response.use((config:any) => {
    return config
},(error:any)=>{
    return Promise.reject(error);
})
export default instance;
