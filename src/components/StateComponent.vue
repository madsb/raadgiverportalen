<!-- Eksempel på komponent som bruger state management -->
<template>
  <div>
    <h2 class="mt-5">State management:</h2>
    <div class="alert alert-warning mt-5">
      <div class="alert-body">
        <p class="alert-heading">Registrering</p>
        <p class="alert-text">
          Normalt registreres stores globalt i fx. <strong>src/main.ts</strong>. Denne fil inkluderes ikke i den endelige leverandør-applikation når
          den afvikles på Virksomhedsguiden, så derfor skal stores håndteres lidt anderledes. Se følgende sektioner for detaljer vedr. registrering
        </p>
      </div>
    </div>
    <div>Følgende NPM moduler understøttes til state management i leverandør-applikationer.</div>
    <PiniaCounter />
    <div class="mt-5">
      <button class="button button-primary" @click="incrementPinia">Opdater tæller i Pinia</button>
    </div>
    <VuexCounter />
    <div class="mt-5">
      <button class="button button-primary" @click="incrementVuex">Opdater tæller i Vuex</button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import { store } from '../store';
import { useCounterStore } from '../stores/counter';
import PiniaCounter from './PiniaCounter.vue';
import VuexCounter from './VuexCounter.vue';

export default defineComponent({
  name: 'StateComponent',
  components: { VuexCounter, PiniaCounter },
  inject: ['pinia'],
  created() {
    this.$pinia = this.pinia;
    this.$store = store;
  },
  methods: {
    ...mapActions(useCounterStore, ['incrementPinia']),
    ...mapMutations(['incrementVuex'])
  }
});
</script>
