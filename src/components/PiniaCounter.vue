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
      <button class="button button-primary mt-3" @click="increment">Tæl op</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createPinia, getActivePinia, setActivePinia } from 'pinia'
import { computed } from 'vue'
import { useCounterStore } from '../stores/counter'

// Check if Pinia is already active, if not create and set it
if (!getActivePinia()) {
  setActivePinia(createPinia())
}

const counterStore = useCounterStore()
const counter = computed(() => counterStore.counter)

const increment = () => {
  counterStore.incrementPinia()
}
</script>
