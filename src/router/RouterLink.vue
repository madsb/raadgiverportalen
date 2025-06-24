<template>
  <a :href="'#' + to" @click.prevent="handleClick">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { navigate } from './router-core'

const props = defineProps<{
  to: string
}>()

const handleClick = () => {
  navigate(props.to)
}
</script>