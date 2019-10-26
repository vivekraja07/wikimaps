import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    link: 'https://en.wikipedia.org/wiki/Roman_Empire',
    empireName: 'Viveks Empire'
  },
  mutations: {
    setLink (state, event) {
      state.link = event
    },
    setEmpireName (state, event) {
        state.empireName = event
    }
  },
  actions: {
    linkSet (context, link) {
      context.commit('setLink', link)
    },
    empireNameSet (context, empireName) {
      context.commit('setEmpireName', empireName)
    }
  }
})