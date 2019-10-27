import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    link: 'https://en.wikipedia.org/wiki/Roman_Empire',
    empireName: 'Roman Empire',
    information: 'One of the largest empires that consisted largely of a disciplined full-time army centered around the Rome Region of Italy'
    },
  mutations: {
    setLink (state, event) {
      state.link = event
    },
    setEmpireName (state, event) {
        state.empireName = event
    },
    setInformation(state, event) {
      state.information = event
    }
  },
  actions: {
    linkSet (context, link) {
      context.commit('setLink', link)
    },
    empireNameSet (context, empireName) {
      context.commit('setEmpireName', empireName)
    },
    informationSet (context, information) {
      console.log("info")
      console.log(information)
      context.commit('setInformation', information)
    }
  }
})