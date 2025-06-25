<template>
  <div class="tilbud-page">
    <h3>Tilbud for kunde {{ kundeId }}</h3>
    <p>Liste over tilbud...</p>
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
.tilbud-page {
  padding: 1rem;
  background: #f5f5f5;
  margin-top: 1rem;
}
</style>
