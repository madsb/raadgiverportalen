<template>
  <div class="demo-view">
    <h2>Router Demo</h2>
    <p>Demonstrerer den tilpassede hash-baserede router udviklet specifikt til Virksomhedsguiden-miljøet.</p>

    <ErrorBoundary error-title="Router demo fejl" error-message="Der opstod en fejl i router demo komponenten.">
      <RouterDemo />
    </ErrorBoundary>

    <div class="back-nav">
      <RouterLink to="/demo" class="button button-secondary"> Tilbage til demo oversigt </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import RouterDemo from '../components/RouterDemo.vue'
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
