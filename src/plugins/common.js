import Vue from 'vue'
import moment from 'moment'

Vue.prototype.imgurl = function (url) {
    if (url !== undefined && url !== null && url !== '') {
        return process.env.VUE_APP_IMG_API + url
    } else {
        return ''
    }
}
Vue.prototype.isnull = function (t) {
    if (t === '' || t === undefined || t === null) {
        return true
    } else {
        return false
    }
}

// 全局过滤器 时间戳
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD') {
    if (dataStr) {
        return moment(dataStr).format(pattern)
    } else {
        return dataStr
    }
})