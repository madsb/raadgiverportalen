<!-- Vuex underkomponent, som bruger den injected 'reactivyKey' til at vise reaktiv state fra Vuex store  -->
<template>
  <div>
    <div class="mt-5">
      {{ count }}
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '../store';

export default {
  name: 'Counter',
  computed: {
    /**
     * Det er ikke muligt at anvende standard hjælpe funktion ...mapGetters, da den mister sin reaktivitet når applikationen afvikles i Virksomhedsguiden og derfor ikke viser ændringer i storen.
     * Man bør i stedet bruge computed property, og anvende den injectede 'reactivyKey' i udtrykket for at tvinge funktionen til at blive evalueret når store state ændrer sig.
     */
    count() {
      return this.reactiveKey.value ? this.$store.getters.count : 0;
    }
  },
  store,
  // Den injectes, så man slipper for "prop drilling". Den kunne også være angivet som normal prop hvis der er få niveauer.
  inject: ['reactiveKey']
};
</script>
