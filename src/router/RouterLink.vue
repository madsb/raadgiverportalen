<template>
  <a :href="href" :class="classes" @click="handleClick">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getRouter } from './router-core'

interface Props {
  to: string
  replace?: boolean
  activeClass?: string
  exactActiveClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  replace: false,
  activeClass: 'router-link-active',
  exactActiveClass: 'router-link-exact-active'
})

const router = getRouter()

// Compute href
const href = computed(() => '#' + props.to)

// Compute active classes
const classes = computed(() => {
  if (!router) {
    return {}
  }

  const isActive = router.isActive(props.to)
  const isExactActive = router.state.path === props.to

  return {
    [props.activeClass]: isActive,
    [props.exactActiveClass]: isExactActive
  }
})

// Handle click
const handleClick = (event: MouseEvent) => {
  // Allow modifier keys to work normally
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return
  }

  // Prevent default navigation
  event.preventDefault()

  if (!router) {
    return
  }

  // Navigate using router
  if (props.replace) {
    router.replace(props.to)
  } else {
    router.push(props.to)
  }
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: var(--link-active-color, #0066cc);
}

.router-link-exact-active {
  font-weight: bold;
}
</style>
