<template>
  <div class="projekter-page">
    <h3>Projekter for kunde {{ kundeId }}</h3>
    <ul>
      <li>
        <a :href="`#kunder/${kundeId}/projekter/1`">Projekt 1</a>
      </li>
      <li>
        <a :href="`#kunder/${kundeId}/projekter/2`">Projekt 2</a>
      </li>
    </ul>
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
