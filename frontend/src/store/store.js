import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './userModule.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    userModule
  },
  mutations: {},
  getters: {}
})