import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isHome:false
  },
  mutations: {
    changeIsHome(state,flag:boolean){
      state.isHome = flag;
    }
  },
  actions: {

  },
});
