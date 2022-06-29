import axios from "axios";
const instance = axios.create();
instance.defaults.baseURL='http://localhost:8888';
instance.interceptors.request.use(function (config) {
    config.headers.common['JwtDemo'] =sessionStorage.getItem("token");
    return config;
});
instance.interceptors.response.use(function (response) {
    if(response.data.code!=200){
       alert("权限不足！")
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance