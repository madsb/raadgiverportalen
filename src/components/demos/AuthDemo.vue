<template>
  <div class="auth-demo">
    <h2>Autentificering</h2>
    <p>Demonstrerer login flow og JWT token håndtering i Virksomhedsguiden.</p>

    <LoginDemo />
  </div>
</template>

<script setup lang="ts">
import LoginDemo from '../../demo/components/LoginDemo.vue'
</script>

<style lang="scss" scoped>
.auth-demo {
  h2 {
    margin-bottom: 1rem;
  }
}
</style>
