<template>
  <div class="components-demo">
    <h2>Komponenter</h2>
    <p>
      Diverse komponenter og patterns til brug i leverandør-applikationer.
    </p>
    
    <div class="component-sections">
      <section class="component-section">
        <h3>State Komponenter</h3>
        <StateComponent />
      </section>
      
      <section class="component-section">
        <h3>Parameter Varianter</h3>
        <ParameterVariant />
      </section>
      
      <section class="component-section">
        <h3>Scoped Styling</h3>
        <ScopedStyling />
      </section>
      
      <section class="component-section">
        <h3>Download Komponent</h3>
        <DownloadComponent :is-virksomhedsguiden="isVirksomhedsguiden" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import StateComponent from '../../demo/components/StateComponent.vue'
import ParameterVariant from '../../demo/components/ParameterVariant.vue'
import ScopedStyling from '../../demo/components/ScopedStyling.vue'
import DownloadComponent from '../../demo/components/DownloadComponent.vue'

const isVirksomhedsguiden = inject('isVirksomhedsguiden', false)
</script>

<style lang="scss" scoped>
.components-demo {
  h2 {
    margin-bottom: 1rem;
  }
  
  .component-sections {
    margin-top: 2rem;
  }
  
  .component-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: #004080;
    }
  }
}
</style>