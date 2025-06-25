<template>
  <div class="demo-view">
    <h2>Step Navigation Demo</h2>
    <div class="alert alert-info mb-4">
      <div class="alert-body">
        <p class="alert-heading">Kompatibilitet</p>
        <p class="alert-text">
          Dette trin navigation system er inkompatibelt med hovedrouteren. Brug kun til wizards/formularer inden for enkelte komponenter.
        </p>
      </div>
    </div>
    <p>
      Demonstrerer step-baseret navigation som ofte bruges i wizards og multi-step formularer. Understøtter frem/tilbage navigation med
      tilstandshåndtering.
    </p>

    <ErrorBoundary error-title="Navigation fejl" error-message="Der opstod en fejl i navigationen. Prøv at genindlæse siden.">
      <Navigation :step="step" :max-step="maxStep" @decrease-step="decreaseStep" @increase-step="increaseStep" />
    </ErrorBoundary>

    <div class="step-info">
      <p>
        Nuværende step: <strong>{{ step }}</strong> af {{ maxStep }}
      </p>
    </div>

    <div class="back-nav">
      <a href="#demo" class="button button-secondary"> Tilbage til demo oversigt </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import ErrorBoundary from '../../components/ErrorBoundary.vue'

const step = ref(1)
const maxStep = ref(3)

const decreaseStep = () => {
  if (step.value > 1) {
    step.value--
  }
}

const increaseStep = () => {
  if (step.value < maxStep.value) {
    step.value++
  }
}
</script>

<style lang="scss" scoped>
.demo-view {
  padding: 2rem 0;
}

.step-info {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.back-nav {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}
</style>
