<template>
  <div class="projekt-detail-page">
    <h4>Projekt {{ projektId }} (Kunde {{ kundeId }})</h4>
    <p>Projekt detaljer...</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const kundeId = computed(() => {
  const hash = window.location.hash.slice(1)
  const match = hash.match(/kunder\/(\d+)/)
  return match ? match[1] : ''
})

const projektId = computed(() => {
  const hash = window.location.hash.slice(1)
  const match = hash.match(/projekter\/(\d+)/)
  return match ? match[1] : ''
})
</script>

<style scoped>
.projekt-detail-page {
  padding: 1rem;
  border: 1px solid #ddd;
  margin-top: 1rem;
  background: white;
}
</style>
