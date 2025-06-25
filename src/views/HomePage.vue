<template>
  <div class="home-page">
    <h1>Rådgiverportalen</h1>
    <p>Velkommen til Rådgiverportalen</p>
    <nav>
      <a href="#kunder">Kunder</a>
    </nav>

    <div style="margin-top: 100vh">
      <h2 id="section-bottom">Bund sektion</h2>
      <p>Dette er en sektion i bunden af siden for at teste scroll behavior.</p>
      <a href="#">Tilbage til top</a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
