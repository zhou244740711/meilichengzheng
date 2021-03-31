"use strict";
import { Toast } from 'mint-ui';
import axios from "axios";
// import qs from 'qs'

let baseURL = "http://42.192.77.195:7020"

// 定义请求头及过期时间
const http = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: baseURL, //process.env.BASE_API,
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000
});

/**
 * 请求拦截 配置header请求参数
 */
http.interceptors.request.use(
    config => {
        config.headers.sn = new Date().getTime();
        config.headers["token"] = sessionStorage.token
        // config.data.token = sessionStorage.token
        // const token = sessionStorage.token
        // if(config.method==='post'){
        //     config.data=qs.stringify({
        //         token: token,
        //         ...config.data
        //     })
        // }else if(config.method==='get'){
        //     config.params={
        //         token: token,
        //         ...config.params
        //     }
        // }
        return config;
    },
    error => {
      return Promise.reject(error);
    }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
    response => {
        if (response.data.code === 401) {
            Toast(response.data.msg);
            console.log('去登陆')
            this.$router.push({name: 'login'})
            return
        }
        if (response.data.code && response.data.code !== 200) {
            if (response.data.code === 500) {
                Toast('请求错误！');
                return
            }
            let msg = response.data.msg;
            Toast(msg);
        }
        return response.data.data;
    },
    error => {
        return Promise.reject(error);
    }
);
/**
 * 请求地址处理
 */
http.adornUrl = actionName => {
  return baseURL + actionName;
};

export default http