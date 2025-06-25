<template>
  <div class="demo-home">
    <h1>Demo Leverandør-applikation</h1>
    <p class="lead">
      Denne applikation kan bruges som skabelon til udvikling af leverandør-applikation, der kan integreres i
      <a href="https://www.virksomhedsguiden.dk" target="__blank">Virksomhedsguiden</a> som Vue 3 komponenter.
    </p>

    <div class="demo-info">
      <p>
        Applikation ID: <code>{{ applikationId }}</code>
      </p>
      <p>
        Ydelse ID: <code>{{ ydelsesId }}</code>
      </p>
    </div>

    <div class="alert alert-info mb-5">
      <div class="alert-body">
        <p class="alert-heading">Navigation Tilgange</p>
        <p class="alert-text">Denne applikation demonstrerer to navigation systemer som er <strong>inkompatible med hinanden</strong>:</p>
        <ul class="alert-text">
          <li><strong>Router System:</strong> Til fuld app navigation mellem sider (bruges i denne demo)</li>
          <li><strong>Trin Navigation:</strong> Til wizards/formularer inden for enkelte komponenter (se Navigation demo)</li>
        </ul>
        <p class="alert-text">Vælg én tilgang til din applikation - blanding af dem vil forårsage konflikter.</p>
      </div>
    </div>

    <div class="demo-navigation">
      <h2>Demo Sektioner</h2>
      <div class="demo-grid">
        <a href="#demo/vg-mode" class="demo-card">
          <h3>VG Mode</h3>
          <p>Test om applikationen kører i Virksomhedsguiden eller standalone mode</p>
        </a>

        <a href="#demo/design" class="demo-card">
          <h3>Design System</h3>
          <p>DKFDS komponenter og VG design patterns</p>
        </a>

        <a href="#demo/auth" class="demo-card">
          <h3>Authentication</h3>
          <p>Login flows og bruger håndtering</p>
        </a>

        <a href="#demo/storage" class="demo-card">
          <h3>Storage API</h3>
          <p>Gem og hent data via VG's storage API</p>
        </a>

        <a href="#demo/navigation" class="demo-card">
          <h3>Step Navigation</h3>
          <p>Wizard/form navigation (incompatible med router)</p>
        </a>

        <a href="#demo/components" class="demo-card">
          <h3>Komponenter</h3>
          <p>Diverse komponenter og patterns</p>
        </a>

        <a href="#demo/api" class="demo-card">
          <h3>API & Data</h3>
          <p>Eksterne API kald og data indsamling</p>
        </a>

        <a href="#demo/error-handling" class="demo-card">
          <h3>Error Handling</h3>
          <p>Error boundaries og fejlhåndtering</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// Get props from provider
const applikationId = inject('applikationId', '')
const ydelsesId = inject('ydelsesId', '')
</script>

<style lang="scss" scoped>
.demo-home {
  padding: 2rem 0;
}

.lead {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.demo-info {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;

  p {
    margin: 0.5rem 0;
  }
}

.demo-navigation {
  h2 {
    margin-bottom: 1.5rem;
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.demo-card {
  display: block;
  padding: 1.5rem;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0067c5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #0067c5;
  }

  p {
    margin: 0;
    color: #666;
  }
}
</style>
