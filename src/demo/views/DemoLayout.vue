<template>
  <div class="demo-layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'

// Get the main emit function from the root
const emit = defineEmits(['requestToken'])

// Provide requestToken function for child components
provide('requestToken', () => {
  emit('requestToken')
})
</script>

<style lang="scss" scoped>
.demo-layout {
  width: 100%;
}
</style>
