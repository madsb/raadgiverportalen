<template>
  <div class="state-details mt-6">
    <div class="details-box">
      <h4>State Management Detaljer</h4>
      <p>
        Dette er en nested route under <code>/demo/state/details</code>. Den demonstrerer hvordan RouterView komponenter kan være nested i hinanden.
      </p>

      <ul>
        <li>Parent route: <code>/demo/state</code></li>
        <li>Child route: <code>/demo/state/details</code></li>
        <li>RouterView depth: {{ routerViewDepth }}</li>
      </ul>

      <RouterLink to="/demo/state" class="button button-secondary mt-4"> ← Tilbage til State Management </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { RouterLink } from '../../router'

// Get the current RouterView depth from the router system
const routerViewDepth = inject<number>('routerViewDepth', 0)
</script>

<style lang="scss" scoped>
.state-details {
  .details-box {
    background-color: #e8f4fd;
    border: 1px solid #b3d9f2;
    border-radius: 4px;
    padding: 1.5rem;

    h4 {
      margin-bottom: 1rem;
      color: #004080;
    }

    code {
      background-color: #f5f5f5;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
    }

    ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
  }
}
</style>
