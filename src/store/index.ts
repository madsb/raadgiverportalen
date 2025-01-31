// Simpel Vuex store med en tæller som state
import { createStore } from 'vuex';

export const store = createStore({
  state: {
    count: 3
  },
  mutations: {
    incrementVuex(state: { count: number }) {
      state.count++;
    }
  },
  getters: {
    count: (state: { count: number }) => state.count
  }
});
