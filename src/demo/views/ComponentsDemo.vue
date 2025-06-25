<template>
  <div class="demo-view">
    <h2>Komponenter Demo</h2>
    <p>Demonstrerer diverse komponenter og patterns brugt i leverandør-applikationer.</p>

    <section>
      <h3>Parameter Variant</h3>
      <ParameterVariant :variant="variant" />
    </section>

    <hr />

    <section>
      <h3>Responsive Design</h3>
      <Responsive />
    </section>

    <hr />

    <section>
      <h3>Scoped Styling</h3>
      <ScopedStyling />
    </section>

    <hr />

    <section>
      <h3>State Management</h3>
      <StateComponent />
    </section>

    <hr />

    <section>
      <h3>Download Component</h3>
      <ErrorBoundary error-title="Download fejl" error-message="Der opstod en fejl i download komponenten.">
        <DownloadComponent :is-virksomhedsguiden="isVirksomhedsguiden" />
      </ErrorBoundary>
    </section>

    <div class="back-nav">
      <a href="#demo" class="button button-secondary"> Tilbage til demo oversigt </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import ParameterVariant from '../components/ParameterVariant.vue'
import Responsive from '../components/Responsive.vue'
import ScopedStyling from '../components/ScopedStyling.vue'
import StateComponent from '../components/StateComponent.vue'
import DownloadComponent from '../components/DownloadComponent.vue'
import ErrorBoundary from '../../components/ErrorBoundary.vue'

const variant = inject<any>('variant', null)
const isVirksomhedsguiden = inject('isVirksomhedsguiden', true)
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
