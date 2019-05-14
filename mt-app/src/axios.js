import axios from 'axios'
axios.defaults.baseURL = 'http://api.duyiedu.com'
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.params = {
        ...config.params,
        appkey: 'xiaofeigao_1556940523905'
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
export default axios; 