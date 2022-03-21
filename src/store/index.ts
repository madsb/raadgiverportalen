// Simpel Vuex store med en tæller som state
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    change(state) {
      state.count++;
    }
  },
  getters: {
    count: state => state.count
  }
});
