<template>
  <div class="demo-overview">
    <h2>Demo Komponenter</h2>
    <p class="lead">
      Velkommen til demo-sektionen. Her kan du se eksempler på forskellige komponenter og funktionaliteter som er tilgængelige i Rådgiverportalen.
    </p>

    <div class="demo-cards mt-6">
      <div class="row">
        <div class="col-12 col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h3>State Management</h3>
            </div>
            <div class="card-content">
              <p>Se hvordan Pinia og Vuex bruges til state management.</p>
              <RouterLink to="/demo/state" class="button button-primary"> Se eksempler → </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h3>Design System</h3>
            </div>
            <div class="card-content">
              <p>Udforsk DKFDS komponenter og design patterns.</p>
              <RouterLink to="/demo/design" class="button button-primary"> Se komponenter → </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h3>Fejlhåndtering</h3>
            </div>
            <div class="card-content">
              <p>Lær om error boundaries og fejlhåndtering.</p>
              <RouterLink to="/demo/error-handling" class="button button-primary"> Se eksempler → </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h3>Storage API</h3>
            </div>
            <div class="card-content">
              <p>Se hvordan data gemmes og hentes via VG's Storage API.</p>
              <RouterLink to="/demo/storage" class="button button-primary"> Se eksempler → </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from '../router'
</script>

<style lang="scss" scoped>
.demo-overview {
  h2 {
    margin-bottom: 1rem;
  }

  .lead {
    font-size: 1.125rem;
    color: #555;
  }
}

.demo-cards {
  .card {
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;

    .card-header {
      background-color: #f5f5f5;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #ddd;

      h3 {
        margin: 0;
        font-size: 1.25rem;
      }
    }

    .card-content {
      padding: 1.5rem;

      p {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
