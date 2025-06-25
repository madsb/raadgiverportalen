<template>
  <div class="home-page">
    <h1>Rådgiverportalen</h1>
    <p>Velkommen til Rådgiverportalen</p>
    <nav>
      <RouterLink to="/kunder">Kunder</RouterLink>
    </nav>

    <div style="margin-top: 100vh">
      <h2 id="section-bottom">Bund sektion</h2>
      <p>Dette er en sektion i bunden af siden for at teste scroll behavior.</p>
      <RouterLink to="/">Tilbage til top</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import RouterLink from '../router/RouterLink.vue'
</script>

<style scoped>
.home-page {
  padding: 2rem;
}

nav {
  margin-top: 2rem;
}

nav a {
  margin-right: 1rem;
}
</style>
