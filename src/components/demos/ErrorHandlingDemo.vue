<template>
  <div class="error-handling-demo">
    <h2>Fejlhåndtering</h2>
    <p>Demonstrerer hvordan fejl håndteres med Error Boundaries og async error handling.</p>

    <ErrorBoundaryDemo />
  </div>
</template>

<script setup lang="ts">
import ErrorBoundaryDemo from '../../demo/components/ErrorBoundaryDemo.vue'
</script>

<style lang="scss" scoped>
.error-handling-demo {
  h2 {
    margin-bottom: 1rem;
  }
}
</style>
