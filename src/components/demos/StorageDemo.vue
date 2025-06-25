<template>
  <div class="storage-demo">
    <h2>Storage API</h2>
    <p>Demonstrerer hvordan man bruger Virksomhedsguidens Storage API til at gemme og hente data.</p>

    <StorageAPI />
  </div>
</template>

<script setup lang="ts">
import StorageAPI from '../../demo/components/StorageAPI.vue'
</script>

<style lang="scss" scoped>
.storage-demo {
  h2 {
    margin-bottom: 1rem;
  }
}
</style>
