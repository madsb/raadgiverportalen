<!-- Eksempel på komponent som bruger state management -->
<template>
  <div>
    <h2 class="mt-5">State management:</h2>
    <div class="alert alert-warning mt-5">
      <div class="alert-body">
        <p class="alert-heading">Registrering</p>
        <p class="alert-text">
          Normalt registreres stores globalt i fx. <strong>src/main.ts</strong>. Denne fil inkluderes ikke i den endelige leverandør-applikation når
          den afvikles på Virksomhedsguiden, så derfor skal stores håndteres lidt anderledes. Se følgende sektioner for detaljer vedr. registrering
        </p>
      </div>
    </div>
    <p>Følgende NPM moduler understøttes til state management i leverandør-applikationer.</p>
    <PiniaCounter />
    <div class="mt-5">
      <button class="button button-primary" @click="incrementPinia">Opdater tæller i Pinia</button>
    </div>
    <VuexCounter />
  </div>
</template>

<script setup lang="ts">
import { createPinia, setActivePinia } from 'pinia'
import { useCounterStore } from '../../stores/counter'
import PiniaCounter from '../../components/PiniaCounter.vue'
import VuexCounter from '../../components/VuexCounter.vue'

setActivePinia(createPinia())
const counterStore = useCounterStore()

const incrementPinia = () => counterStore.incrementPinia()
</script>
