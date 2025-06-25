<template>
  <div class="tilbud-page">
    <h3>Tilbud for kunde {{ kundeId }}</h3>
    <p>Liste over tilbud...</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { router } from '../router/router-core'

const kundeId = computed(() => router.params.id || '')
</script>

<style scoped>
.tilbud-page {
  padding: 1rem;
  background: #f5f5f5;
  margin-top: 1rem;
}
</style>
