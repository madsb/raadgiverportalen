<template>
  <div>
    <h3>Pinia</h3>
    <p class="mt-5">
      <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a> er Vues officielle bibliotek til state management. Se
      <strong>src/components/PiniaCounter.vue</strong> vedr. registrering og anvendelse. Forneden vises en simpel tæller, hvis værdi gemmes i en Pinia
      <em>store</em>, og tælles op ved at klikke på knappen.
    </p>
    <div class="mt-5">
      <h2 class="displayheading-1">{{ counter }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createPinia, setActivePinia } from 'pinia'
import { computed } from 'vue'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
setActivePinia(createPinia())

const counter = computed(() => counterStore.counter)
</script>
