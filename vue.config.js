// vue-cli 3.0 配置文件
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vant: 'vant'
    }
  }
}
