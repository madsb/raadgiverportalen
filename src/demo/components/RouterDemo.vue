<template>
  <div class="router-demo-section">
    <h2>Hash-baseret Router Demo</h2>
    <p>
      Denne sektion demonstrerer den tilpassede hash-baserede router, som er udviklet specifikt til Virksomhedsguiden-miljøet. Routeren understøtter
      dyb linking, browser navigation, route guards og nested layouts - alt sammen uden at bruge
      <code>history.pushState</code> eller eksterne router-biblioteker.
    </p>

    <div class="row">
      <div class="col-12">
        <div class="router-info mb-4">
          <h3>Nuværende rute information</h3>
          <dl class="info-list">
            <dt>Path:</dt>
            <dd>
              <code>{{ router.path || '/' }}</code>
            </dd>
            <dt>Parametre:</dt>
            <dd>
              <code>{{ JSON.stringify(router.params) }}</code>
            </dd>
            <dt>Matched komponent:</dt>
            <dd>{{ router.chain[0]?.record?.component?.name || 'Ingen' }}</dd>
            <dt>Meta data:</dt>
            <dd>
              <code>{{ JSON.stringify(router.chain[0]?.record?.meta || {}) }}</code>
            </dd>
          </dl>
        </div>

        <div class="router-controls mb-4">
          <h3>Navigation</h3>
          <div class="button-group">
            <button class="button button-secondary" @click="navigate('/')">Forside</button>
            <button class="button button-secondary" @click="navigate('/kunder')">Kunder (kræver login)</button>
            <button class="button button-secondary" @click="navigate('/kunder/42')">Kunde #42</button>
            <button class="button button-secondary" @click="navigate('/kunder/42/projekter')">Projekter for kunde #42</button>
            <button class="button button-secondary" @click="navigate('/kunder/42/projekter/123')">Projekt #123</button>
            <button class="button button-secondary" @click="navigate('/ikke-fundet')">404 Side</button>
          </div>
        </div>

        <div class="router-demo-content">
          <h3>Router indhold demonstration</h3>
          <div class="router-view-container">
            <p>Router information og navigation demo. Brug knapperne ovenfor for at teste navigation.</p>
            <p>Nuværende route bliver renderet i hovedapplikationen, ikke her i demo komponenten.</p>
          </div>
        </div>

        <div class="scroll-behavior-demo mt-4">
          <h3>Scroll Behavior Demo</h3>
          <p>Vælg scroll behavior:</p>
          <div class="button-group">
            <button class="button button-secondary" @click="setDefaultScrollBehavior">Standard (scroll til top)</button>
            <button class="button button-secondary" @click="setKeepPositionBehavior">Behold position</button>
            <button class="button button-secondary" @click="setConditionalBehavior">Betinget (kun ved nye ruter)</button>
          </div>
          <p class="mt-2">
            <small>Nuværende behavior: {{ currentBehavior }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { router, navigate, setScrollBehavior } from '../../router/router-core'
import type { ScrollBehaviorHandler } from '../../router/router-core'

const currentBehavior = ref('Standard')

// Default behavior - always scroll to top
const setDefaultScrollBehavior = () => {
  setScrollBehavior((to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, left: 0 }
  })
  currentBehavior.value = 'Standard'
}

// Keep current position
const setKeepPositionBehavior = () => {
  setScrollBehavior(() => false)
  currentBehavior.value = 'Behold position'
}

// Conditional - only scroll to top for new routes
const setConditionalBehavior = () => {
  setScrollBehavior((to, from, savedPosition) => {
    // If we have a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }

    // If navigating between same base route (e.g., /kunder/1 to /kunder/2), keep position
    if (to.path.split('/')[1] === from?.path.split('/')[1]) {
      return false
    }

    // Otherwise scroll to top
    return { top: 0 }
  })
  currentBehavior.value = 'Betinget'
}
</script>

<style scoped lang="scss">
.router-demo-section {
  margin: 2rem 0;
}

.router-info {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}

.info-list {
  margin: 0;

  dt {
    font-weight: bold;
    display: inline-block;
    min-width: 150px;
  }

  dd {
    display: inline;
    margin: 0;

    &::after {
      content: '\A';
      white-space: pre;
    }
  }
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .button {
    margin-bottom: 0.5rem;
  }
}

.router-view-container {
  min-height: 200px;
  border: 2px dashed #ddd;
  padding: 1rem;
  background-color: #fafafa;
  margin-top: 1rem;
}

.router-controls {
  h3 {
    margin-bottom: 1rem;
  }
}
</style>
