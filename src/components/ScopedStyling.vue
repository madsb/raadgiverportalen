<!-- Eksempel på komponent, som bruger vue-multiselect med scoped styling -->
<template>
  <div>
    <h2 class="mt-5">Scoped styling:</h2>
    <p>
      Det er vigtigt alt styling i leverandør-applikationen ikke påvirker Virksomhedsguiden eller andre leverandør-applikationer. Derfor skal alle
      &lt;style&gt; tags bruge <strong>scoped</strong> attributten. Dette gælder naturligvis også stylesheets, der importeres fra NPM moduler.
    </p>
    <div class="custom-multiselect">
      <multiselect v-model="value" :options="options" class="mt-5" placeholder="Vælg et land" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import multiselect from 'vue-multiselect';

const value = ref(null);
const options = ['Danmark', 'Sverige', 'Norge'];
</script>

<style lang="scss" scoped>
// Deep selector er nødvendig her når style er scoped
:deep(.custom-multiselect) {
  @import '../styles/components/_multiselect.scss';
}
</style>
