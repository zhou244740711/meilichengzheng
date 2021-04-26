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

Vue.directive('longpress', {
    // eslint-disable-next-line no-unused-vars
    bind: function(el, binding, vnode) {
        let timer = null
        let start = function(e) {
            // 如果是点击事件，不启动计时器，直接返回
            if(e.type === 'click') {
                return
            }
            if(timer == null) {
                // 创建定时器 (2s之后执行长按功能函数)
                timer = setTimeout(function() {
                    // 执行长按功能函数
                    // console.log(binding)
                    binding.value()
                }, 1000)
            }
        }

        let cancel = function() {
            if(timer !== null) {
                clearTimeout(timer)
                timer = null
            }
        }

        // 添加事件监听器
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)

        // 取消定时器
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
    }
})