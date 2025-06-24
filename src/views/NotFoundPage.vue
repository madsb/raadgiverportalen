<template>
  <div class="not-found-page">
    <h1>404 - Side ikke fundet</h1>
    <p>Den side du leder efter findes ikke.</p>
    <RouterLink to="/">Gå til forsiden</RouterLink>
  </div>
</template>

<script setup lang="ts">
import RouterLink from '../router/RouterLink.vue'
</script>

<style scoped>
.not-found-page {
  padding: 2rem;
  text-align: center;
}
</style>