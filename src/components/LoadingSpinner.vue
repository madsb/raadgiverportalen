<template>
  <div class="loading-container" :class="{ 'loading-overlay': overlay }">
    <div class="spinner" :aria-label="ariaLabel" role="status" aria-live="polite" />
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
  ariaLabel?: string
  overlay?: boolean
}

withDefaults(defineProps<Props>(), {
  message: '',
  ariaLabel: 'Henter indhold',
  overlay: false
})
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  &.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 100;
  }
}

.loading-message {
  margin-top: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

.spinner {
  // VG-compliant spinner styles will be inherited from global DKFDS
  margin: 0 auto;
}
</style>
