<template>
  <div>
    <h3>Vuex</h3>
    <div class="mt-5">
      Se <strong>{{ componentPath() }}</strong> vedr. registrering og anvendelse. Forneden vises en simpel tæller, hvis værdi gemmes i
      <a href="https://vuex.vuejs.org/" target="_blank">Vuex</a> store, og kan opdateres ved klik på knappen.
    </div>
    <div class="mt-5">
      Bemærk dog, at Vuex ikke længere er Vues officielle bibliotek til state management, og er i maintenance mode. Derfor anbefales det, at man
      bruger Pinia som efter Vue 3 nu er det officielle bibliotek.
    </div>
    <div class="mt-5">
      <h2 class="displayheading-1">{{ count }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { store } from '../store';
export default defineComponent({
  name: 'VuexCounter',
  computed: {
    ...mapGetters(['count'])
  },
  beforeCreate() {
    // Da Vuex store ikke registreres globalt, skal dette gøres i hvert komponent, som skal tilgå stores
    this.$store = store;
  },
  methods: {
    componentPath() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["__file"] }]*/
      return this.$options.__file;
    }
  }
});
</script>
