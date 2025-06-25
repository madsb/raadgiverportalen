<template>
  <component :is="currentComponent" v-if="currentComponent" />
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { getRouter } from './router-core'

// Inject parent depth or default to 0
const parentDepth = inject<number>('routerViewDepth', 0)
const depth = parentDepth

// Provide depth for nested RouterViews
provide('routerViewDepth', depth + 1)

// Get router instance
const router = getRouter()

// Compute current component based on depth
const currentComponent = computed(() => {
  if (!router) {
    return null
  }

  const matches = router.state.matches

  if (depth >= matches.length) {
    return null
  }

  return matches[depth].route.component
})
</script>
