<template>
  <div class="not-found-page">
    <h2>Side ikke fundet</h2>
    <p>Den side du leder efter kunne ikke findes.</p>

    <div class="navigation-links">
      <RouterLink to="/" class="button button-primary"> Gå til forsiden </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from '../router'
</script>

<style lang="scss" scoped>
.not-found-page {
  padding: 2rem 0;
  text-align: center;
}

.navigation-links {
  margin-top: 2rem;
}
</style>
