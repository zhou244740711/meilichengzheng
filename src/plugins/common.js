import Vue from 'vue'
import moment from 'moment'

Vue.prototype.imgurl = function (url) {
    return 'http://42.192.77.195:7010/' + url
}
Vue.prototype.isnull = function (t) {
    if (t === '' && t === undefined && t === null) {
        return true
    } else {
        return false
    }
}

//  全局过滤器 时间戳
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD') {
    if (dataStr) {
        return moment(dataStr).format(pattern)
    } else {
        return dataStr
    }
})