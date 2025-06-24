<template>
  <component :is="currentComponent" v-if="currentComponent" />
</template>

<script setup lang="ts">
import { computed, provide, inject } from 'vue'
import { router } from './router-core'

// Depth injection key
const ROUTER_DEPTH_KEY = Symbol('router-depth')

// Get current depth from parent RouterView or default to 0
const depth = inject(ROUTER_DEPTH_KEY, 0) as number

// Provide incremented depth to child RouterViews
provide(ROUTER_DEPTH_KEY, depth + 1)

// Compute current component based on depth
const currentComponent = computed(() => {
  const matched = router.chain[depth]
  return matched?.record?.component || null
})
</script>

<style scoped>
/* RouterView is a transparent container */
</style>