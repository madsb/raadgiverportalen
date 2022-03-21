<!-- Eksempel på komponent som bruger Vuex -->
<template>
  <div>
    <h3>Vuex:</h3>
    <div class="mt-5">
      Det er tilladt at bruge Vue plugin <strong><a href="https://vuex.vuejs.org/" target="_blank">Vuex</a></strong> til state management i
      leverandør-applikationen. Der er dog nogle begrænsninger når leverandør-applikationen afvikles i Virksomhedsguiden.
      <ul>
        <li>Der kan ikke anvendes <i>...mapGetters</i> helper, så anvend computed property som alternativ</li>
      </ul>
      Forneden ses en simpel tæller, hvis værdi gemmes i Vuex store, og opdateres ved klik på knappen. Se koden i
      <strong>src/components/Applikation.vue</strong>, <strong>/components/StateComponent.vue</strong> og
      <strong>src/components/Counter.vue</strong> for detaljer om håndtering af manglende support af mapGetters.
    </div>

    <Counter />
    <div class="mt-5">
      <button class="button button-primary" @click="change">Opdatér tæller i Vuex store</button>
    </div>
  </div>
</template>

<script lang="ts">
import Counter from './Counter.vue';
import { mapMutations } from 'vuex';

export default {
  components: { Counter },
  name: 'StateComponent',
  methods: {
    ...mapMutations(['change'])
  }
};
</script>
