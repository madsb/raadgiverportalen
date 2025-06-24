<template>
  <div class="projekt-detail-page">
    <h4>Projekt {{ projektId }} (Kunde {{ kundeId }})</h4>
    <p>Projekt detaljer...</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { router } from '../router/router-core'

const kundeId = computed(() => router.params.id || '')
const projektId = computed(() => router.params.projektId || '')
</script>

<style scoped>
.projekt-detail-page {
  padding: 1rem;
  border: 1px solid #ddd;
  margin-top: 1rem;
  background: white;
}
</style>