<template>
  <div class="home-page">
    <h2>Velkommen til Rådgiverportalen</h2>
    <p>Dette er forsiden af applikationen.</p>

    <div class="navigation-links">
      <RouterLink to="/demo" class="button button-primary"> Se demo komponenter </RouterLink>
      <RouterLink to="/demo/state/details" class="button button-secondary ml-3"> Direkte til nested route </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from '../router'
</script>

<style lang="scss" scoped>
.home-page {
  padding: 2rem 0;
}

.navigation-links {
  margin-top: 2rem;
}
</style>
