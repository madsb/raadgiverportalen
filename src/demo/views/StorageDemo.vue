<template>
  <div class="demo-view">
    <h2>Storage API Demo</h2>
    <p>Demonstrerer hvordan man gemmer og henter data via Virksomhedsguiden's storage API. Understøtter både bruger-specifik og delt data storage.</p>

    <AsyncErrorBoundary
      error-title="Storage API fejl"
      error-message="Der opstod en fejl ved kommunikation med storage systemet. Dine data er muligvis ikke blevet gemt."
      :max-retries="2"
      :retry-delay="2000"
      show-reset
    >
      <StorageAPI
        :tekstnoegle-bundt-id="tekstnoegleBundtId"
        :tekstnoegle-cvr-nummre="tekstnoegleCvrNumre"
        :token="token"
        :bruger="bruger"
        @request-token="requestToken"
      />
    </AsyncErrorBoundary>

    <div class="back-nav">
      <a href="#demo" class="button button-secondary"> Tilbage til demo oversigt </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import StorageAPI from '../components/StorageAPI.vue'
import AsyncErrorBoundary from '../../components/AsyncErrorBoundary.vue'

// Get injected values
const token = inject('token', '')
const bruger = inject('bruger', null)
const tekstnoegleBundtId = inject('tekstnoegleBundtId', '')
const tekstnoegleCvrNumre = inject('tekstnoegleCvrNumre', [])
const requestToken = inject('requestToken', () => {})
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
