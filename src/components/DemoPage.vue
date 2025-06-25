<template>
  <div class="demo-page">
    <h2>Demo Komponenter</h2>

    <div class="demo-sections">
      <section class="demo-section">
        <h3>State Management</h3>
        <div class="demo-grid">
          <PiniaCounter />
          <VuexCounter />
        </div>
      </section>

      <section class="demo-section">
        <h3>Error Handling</h3>
        <ErrorBoundary>
          <template #default>
            <p>Dette indhold er wrapped i en ErrorBoundary</p>
          </template>
          <template #error="{ error }">
            <div class="error-display">Fejl: {{ error?.message || 'Ukendt fejl' }}</div>
          </template>
        </ErrorBoundary>
      </section>
    </div>

    <div class="navigation-links">
      <RouterLink to="/" class="button"> Tilbage til forsiden </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from '../router'
import PiniaCounter from './PiniaCounter.vue'
import VuexCounter from './VuexCounter.vue'
import ErrorBoundary from './ErrorBoundary.vue'
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 2rem 0;
}

.demo-sections {
  margin: 2rem 0;
}

.demo-section {
  margin-bottom: 3rem;

  h3 {
    margin-bottom: 1rem;
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.navigation-links {
  margin-top: 2rem;
}

.error-display {
  padding: 1rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c00;
}
</style>
