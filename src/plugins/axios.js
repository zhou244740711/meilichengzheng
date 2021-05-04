"use strict";
import { Toast } from 'mint-ui';
import axios from "axios";
// import qs from 'qs'
import router from '../router/index'

// 定义请求头及过期时间
const http = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: process.env.VUE_APP_BASE_API, //process.env.BASE_API,
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 30 * 1000
});

/**
 * 请求拦截 配置header请求参数
 */
http.interceptors.request.use(
    config => {
        config.headers.sn = new Date().getTime();
        if (localStorage.getItem('token')) {
            config.headers["token"] = localStorage.getItem('token')
        }
        // config.data.token = localStorage.token
        // const token = localStorage.token
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
            Toast('当前账号已在其他地方登陆');
            localStorage.removeItem('indexdata')
            localStorage.removeItem('tokensavetime')
            localStorage.removeItem('token')
            router.replace({name: 'login'})
            return 500
        }
        if (response.data.code && response.data.code !== 200) {
            if (response.data.code === 500) {
                Toast('请求错误！');
                return 500
            }
            let msg = response.data.msg;
            Toast(msg);
            return 500
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
  return process.env.VUE_APP_BASE_API + actionName;
};

export default http