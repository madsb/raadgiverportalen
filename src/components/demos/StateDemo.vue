<template>
  <div class="state-demo">
    <h2>State Management</h2>
    <p>Demonstrerer hvordan state management fungerer med både Pinia (anbefalet) og Vuex (legacy).</p>

    <div class="demo-grid mt-6">
      <div class="demo-section">
        <PiniaCounter />
      </div>

      <div class="demo-section">
        <VuexCounter />
      </div>
    </div>

    <div class="mt-6">
      <h3>Nested Routing Demo</h3>
      <p>Denne side demonstrerer også nested routing. Se hvordan URL'en er <code>/demo/state</code>.</p>

      <div class="navigation-demo mt-4">
        <RouterLink to="/demo/state/details" class="button button-secondary"> Se detaljer → </RouterLink>
      </div>

      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from '../../router'
import PiniaCounter from '../PiniaCounter.vue'
import VuexCounter from '../VuexCounter.vue'
</script>

<style lang="scss" scoped>
.state-demo {
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .demo-section {
    padding: 1.5rem;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
  }
}
</style>
