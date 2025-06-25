<template>
  <div class="api-demo">
    <h2>API & Data</h2>
    <p>
      Eksterne API kald og dataopsamling i leverandør-applikationer.
    </p>
    
    <div class="api-sections">
      <section class="api-section">
        <h3>Eksterne API'er</h3>
        <ExternalAPI />
      </section>
      
      <section class="api-section">
        <h3>Dataopsamling</h3>
        <DataCollector />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExternalAPI from '../../demo/components/ExternalAPI.vue'
import DataCollector from '../../demo/components/DataCollector.vue'
</script>

<style lang="scss" scoped>
.api-demo {
  h2 {
    margin-bottom: 1rem;
  }
  
  .api-sections {
    margin-top: 2rem;
  }
  
  .api-section {
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