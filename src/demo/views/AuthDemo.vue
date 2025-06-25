<template>
  <div class="demo-view">
    <h2>Authentication Demo</h2>
    <p>Demonstrerer login flows og bruger håndtering i Virksomhedsguiden kontekst. Inkluderer både JWT token håndtering og bruger information.</p>

    <ErrorBoundary error-title="Login fejl" error-message="Der opstod en fejl i login systemet. Prøv at genindlæse siden eller kontakt support.">
      <LoginDemo :token="token" :bruger="bruger" :is-logged-in="isLoggedIn" :hash-before-login="hashBeforeLogin" @request-token="requestToken" />
    </ErrorBoundary>

    <hr />

    <ErrorBoundary error-title="Login komponent fejl" error-message="Der opstod en fejl i login komponenten.">
      <LoginComponent />
    </ErrorBoundary>

    <div class="back-nav">
      <RouterLink to="/demo" class="button button-secondary"> Tilbage til demo oversigt </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import LoginDemo from '../components/LoginDemo.vue'
import LoginComponent from '../components/LoginComponent.vue'
import ErrorBoundary from '../../components/ErrorBoundary.vue'
import RouterLink from '../../router/RouterLink.vue'

// Get injected values
const token = inject('token', '')
const bruger = inject('bruger', null)
const isLoggedIn = inject('isLoggedIn', false)
const hashBeforeLogin = inject('hashBeforeLogin', '')
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

hr {
  margin: 2rem 0;
}
</style>
