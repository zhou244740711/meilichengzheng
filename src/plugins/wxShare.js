/* eslint-disable */
import Vue from 'vue';
import wx from 'weixin-js-sdk';
//存储服务器授权链接
const jsSDKAuth = 'XXX/wx_jssign_package.json';
//存储各个链接的签名信息
const signMap = new Map();
// 设置默认的分享信息，因为如分享图、请求授权项、隐藏授权项等基本不变，此处设置直接引用，避免使用时繁琐设置
const defaultWxShareConfig = {
    title: "美丽城镇",
    desc: '打造新时代美丽城镇建设人才培养体系！',
    link: location.href,
    imgUrl: '/images/logofx.png',
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'closeWindow'],
    hideMenuList: ['menuItem:editTag', 'menuItem:delete', 'menuItem:originPage', 'menuItem:readMode','menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand']
}
//存储临时的分享信息
const wxShareConfig = {

}

const wxShare = {
    //各个页面加载后，调用此方法，传入的参数config是对象，其属性参考defaultWxShareConfig
    updateWxShareConfig(config = {}) {
        wxShareConfig.title = config.title || defaultWxShareConfig.title;
        wxShareConfig.desc = config.desc || defaultWxShareConfig.desc;
        wxShareConfig.link = config.link || defaultWxShareConfig.link;
        wxShareConfig.imgUrl = config.imgUrl || defaultWxShareConfig.imgUrl;
        wxShareConfig.jsApiList = config.jsApiList || defaultWxShareConfig.jsApiList;
        wxShareConfig.hideMenuList = config.hideMenuList || defaultWxShareConfig.hideMenuList;
        //微信中二次分享的处理，截取到有效的分享链接
        var authUrl = wxShareConfig.link.split("#")[0];
        authUrl = authUrl.split("?")[0];
        //判断是否已经签名了
        if (signMap.has(authUrl)) {
            this._wxConfigJSSDK(signMap.get(authUrl), wxShareConfig);
        } else {
            this._wxShareAuth(authUrl);
        }

    },

    //从服务器获取某分享链接的签名信息，并存储起来
    _wxShareAuth(authUrl) {
        //此处我使用的是自己封装的网络请求方法
        const promise = Vue.$http.get(jsSDKAuth + "?url=" + encodeURIComponent(authUrl));
        promise.then(res => {
            //此处请根据各自的服务器返回数据文档进行操作
            if (res.data.code == 200) {
                //分享链接授权签名信息
                const sign = res.data.data;
                signMap.set(authUrl, sign);
                this._wxConfigJSSDK(sign);
            }
        });
        promise.catch((err) => {
            console.log(err.response);
        })
    },

    //将签名信息更新到微信的SDK中
    _wxConfigJSSDK(shareSign) {
        wx.config({
            debug: false,
            appId: shareSign.appId,
            timestamp: shareSign.timestamp,
            nonceStr: shareSign.nonceStr,
            signature: shareSign.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        })
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function() {
            const {title,desc,link,imgUrl} = wxShareConfig;
            wx.onMenuShareAppMessage({
                title,
                desc,
                link,
                imgUrl,
                success: function() {
                    console.log("分享成功");
                },
                fail: function() {
                    console.log("分享失败");
                },
                cancel: function() {
                    console.log("取消分享");
                }
            })
            wx.onMenuShareTimeline({
                title,
                link,
                imgUrl,
                success: function() {
                    console.log("分享成功");
                },
                cancel: function() {
                    console.log("取消分享");
                }
            })

        });

        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        wx.error(function(res) {
            console.log("分享失败: error", res);
        });

    }
}
//导出工具类
export default wxShare;
//将工具类添加到Vue静态方法方便调用
Vue.prototype.$wxShare = wxShare;