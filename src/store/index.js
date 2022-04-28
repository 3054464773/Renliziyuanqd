import { createStore } from 'vuex'

export default createStore({
  state: {
    dtly:{}
  },
  getters: {
      getdtly(state){
        return state.dtly
      }
  },
  mutations: {
    setdtly(state,hddtly){
      state.dtly=hddtly;
      sessionStorage.setItem("token",hddtly.token)
    },
    resetdtly(state){
      state.dtly={}
    }
  },
  actions: {
  },
  modules: {
  }
})
