<template>
  <div class="kunde-detail-page">
    <h2>Kunde {{ kundeId }}</h2>
    <nav>
      <a :href="`#kunder/${kundeId}/projekter`">Projekter</a>
      <a :href="`#kunder/${kundeId}/tilbud`">Tilbud</a>
    </nav>
    <p>Kunde detaljer for kunde ID: {{ kundeId }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const kundeId = computed(() => {
  const hash = window.location.hash.slice(1)
  const match = hash.match(/kunder\/(\d+)/)
  return match ? match[1] : ''
})
</script>

<style scoped>
.kunde-detail-page {
  padding: 1rem;
  border-left: 2px solid #ddd;
  margin-left: 1rem;
}

nav {
  margin: 1rem 0;
}

nav a {
  margin-right: 1rem;
}
</style>
