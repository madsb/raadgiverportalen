<template>
  <div class="demo-view">
    <h2>Design System Demo</h2>
    <p>Demonstrerer DKFDS komponenter og VG design patterns. Alle komponenter følger WCAG 2.1 AA tilgængelighedskrav.</p>

    <Design />

    <div class="back-nav">
      <RouterLink to="/demo" class="button button-secondary"> Tilbage til demo oversigt </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Design from '../components/Design.vue'
import RouterLink from '../../router/RouterLink.vue'
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
