<template>
  <div class="kunder-page">
    <h1>Kunder</h1>
    <ul>
      <li>
        <RouterLink to="/kunder/1">Kunde 1</RouterLink>
      </li>
      <li>
        <RouterLink to="/kunder/2">Kunde 2</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import RouterLink from '../router/RouterLink.vue'
</script>

<style scoped>
.kunder-page {
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

li {
  margin: 0.5rem 0;
}
</style>
