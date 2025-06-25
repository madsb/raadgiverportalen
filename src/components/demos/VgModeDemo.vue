<template>
  <div class="vg-mode-demo">
    <h2>VG Mode</h2>
    <p>
      Test om applikationen kører i Virksomhedsguiden eller standalone mode.
    </p>
    
    <VgMode :is-virksomhedsguiden="isVirksomhedsguiden" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import VgMode from '../../demo/components/VgMode.vue'

const isVirksomhedsguiden = inject('isVirksomhedsguiden', false)
</script>

<style lang="scss" scoped>
.vg-mode-demo {
  h2 {
    margin-bottom: 1rem;
  }
}
</style>