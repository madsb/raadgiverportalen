<template>
  <div class="demo-view">
    <h2>Error Handling Demo</h2>
    <p>Demonstrerer error boundaries og fejlhåndtering i leverandør-applikationer. Viser både synkrone og asynkrone error handling patterns.</p>

    <ErrorBoundary error-title="Error Boundary Demo fejl" error-message="Der opstod en fejl i error boundary demo komponenten.">
      <ErrorBoundaryDemo />
    </ErrorBoundary>

    <div class="back-nav">
      <RouterLink to="/demo" class="button button-secondary"> Tilbage til demo oversigt </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import ErrorBoundaryDemo from '../components/ErrorBoundaryDemo.vue'
import ErrorBoundary from '../../components/ErrorBoundary.vue'
import RouterLink from '../../router/RouterLink.vue'
</script>

<style lang="scss" scoped>
.demo-view {
  padding: 2rem 0;
}

.back-nav {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}
</style>
