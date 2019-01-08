import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: null
  },
  mutations: {
    START_LOADER(state) {
      state.isLoading = true;
    },
    STOP_LOADER(state) {
      state.isLoading = false;
    }
  },
  actions: {},
  getters: {
    isLoading: state => state.isLoading
  }
});
