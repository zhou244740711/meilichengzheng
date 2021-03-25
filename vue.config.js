const path = require('path')
module.exports = {
    devServer: {
        host:'0.0.0.0',
        port: 8080,
        open: true,
        proxy: {
            '/api': {
                target: `http://localhost:10000`,
                pathRewrite: { '^/api': '' },
            }
        },
        disableHostCheck: true
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    },
}

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/imports.styl'),
            ],
        })
}