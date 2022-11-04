// Simpel Pinia store med en tæller som state
import { createPinia, defineStore } from 'pinia';

export const useCounterStore = defineStore('piniaCounter', {
  state: () => ({ count: 5 }),
  getters: {
    counter: state => state.count
  },
  actions: {
    incrementPinia() {
      this.count++;
    }
  }
});

const store = createPinia();
export default store;
