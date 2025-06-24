<template>
  <div class="projekter-page">
    <h3>Projekter for kunde {{ kundeId }}</h3>
    <ul>
      <li>
        <RouterLink :to="`/kunder/${kundeId}/projekter/1`">Projekt 1</RouterLink>
      </li>
      <li>
        <RouterLink :to="`/kunder/${kundeId}/projekter/2`">Projekt 2</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { router } from '../router/router-core'
import RouterLink from '../router/RouterLink.vue'

const kundeId = computed(() => router.params.id || '')
</script>

<style scoped>
.projekter-page {
  padding: 1rem;
  background: #f5f5f5;
  margin-top: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
</style>