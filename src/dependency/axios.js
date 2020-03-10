'use strict'

import Vue from 'vue'
import axios from 'axios'

// API项目接口
const config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const http = axios.create(config)

http.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function (response) {
    const responseData = response.data
    if (responseData.code === 200) {
      return responseData.data
    } else {

    }
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        return http
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin

export { http }
