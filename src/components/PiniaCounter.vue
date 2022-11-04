<template>
  <div>
    <h3>Pinia</h3>
    <div class="mt-5">
      Se <strong>{{ componentPath() }}</strong> vedr. registrering og anvendelse. Forneden vises en simpel tæller, hvis værdi gemmes i en
      <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a> store, og kan opdateres ved klik på knappen.
    </div>
    <div class="mt-5">
      <h2 class="displayheading-1">{{ counter }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
import { useCounterStore } from '../stores/counter';
export default defineComponent({
  name: 'PiniaCounter',
  // Får Pinia instansen fra 'src/components/Applikation.vue' via provide/inject pattern
  inject: ['pinia'],
  computed: {
    ...mapState(useCounterStore, ['counter'])
  },
  created() {
    // Da Pinia store ikke registreres globalt, skal dette gøres i hvert komponent, som skal tilgå stores
    this.$pinia = this.pinia;
  },
  methods: {
    componentPath() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["__file"] }]*/
      return this.$options.__file;
    }
  }
});
</script>
