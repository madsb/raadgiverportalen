<template>
  <div class="demo-view">
    <h2>API & Data Demo</h2>
    <p>Demonstrerer eksterne API kald og data indsamling i leverandør-applikationer.</p>

    <section>
      <h3>Eksterne API</h3>
      <ErrorBoundary error-title="Ekstern API fejl" error-message="Der opstod en fejl i ekstern API komponenten.">
        <ExternalAPI />
      </ErrorBoundary>
    </section>

    <hr />

    <section>
      <h3>Data Indsamling</h3>
      <ErrorBoundary
        error-title="Data indsamling fejl"
        error-message="Der opstod en fejl ved data indsamling. Dine data er muligvis ikke blevet gemt korrekt."
      >
        <DataCollector />
      </ErrorBoundary>
    </section>

    <div class="back-nav">
      <RouterLink to="/demo" class="button button-secondary"> Tilbage til demo oversigt </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExternalAPI from '../components/ExternalAPI.vue'
import DataCollector from '../components/DataCollector.vue'
import ErrorBoundary from '../../components/ErrorBoundary.vue'
import RouterLink from '../../router/RouterLink.vue'
</script>

<style lang="scss" scoped>
.demo-view {
  padding: 2rem 0;
}

section {
  margin: 2rem 0;

  h3 {
    margin-bottom: 1rem;
  }
}

.back-nav {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

hr {
  margin: 2rem 0;
}
</style>
