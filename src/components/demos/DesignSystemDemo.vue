<template>
  <div class="design-system-demo">
    <h2>DKFDS Design System</h2>
    <p>Eksempler på komponenter fra Det Fælles Designsystem (DKFDS) som bruges i Virksomhedsguiden.</p>

    <Design />
  </div>
</template>

<script setup lang="ts">
import Design from '../../demo/components/Design.vue'
</script>

<style lang="scss" scoped>
.design-system-demo {
  h2 {
    margin-bottom: 1rem;
  }
}
</style>
