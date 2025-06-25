<template>
  <div class="demo-view">
    <h2>VG Mode Demo</h2>
    <p>
      Denne demo viser om applikationen kører i Virksomhedsguiden eller standalone mode. Dette er nyttigt for at tilpasse funktionalitet baseret på
      konteksten.
    </p>

    <VgMode :is-virksomhedsguiden="isVirksomhedsguiden" />

    <div class="back-nav">
      <a href="#demo" class="button button-secondary"> Tilbage til demo oversigt </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import VgMode from '../components/VgMode.vue'

const isVirksomhedsguiden = inject('isVirksomhedsguiden', true)
</script>

<style lang="scss" scoped>
.demo-view {
  padding: 2rem 0;
}

.back-nav {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}
</style>
