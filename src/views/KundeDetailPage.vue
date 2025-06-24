<template>
  <div class="kunde-detail-page">
    <h2>Kunde {{ kundeId }}</h2>
    <nav>
      <RouterLink :to="`/kunder/${kundeId}/projekter`">Projekter</RouterLink>
      <RouterLink :to="`/kunder/${kundeId}/tilbud`">Tilbud</RouterLink>
    </nav>
    <p>Kunde detaljer for kunde ID: {{ kundeId }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { router } from '../router/router-core'
import RouterLink from '../router/RouterLink.vue'

const kundeId = computed(() => router.params.id || '')
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