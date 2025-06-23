<template>
  <div class="error-boundary">
    <div v-if="hasError" class="alert alert-error" role="alert" aria-atomic="true">
      <div class="alert-body">
        <p class="alert-heading">{{ errorTitle }}</p>
        <p class="alert-text">{{ errorMessage }}</p>
        <button 
          v-if="showRetry" 
          class="button button-secondary mt-3" 
          @click="retry"
        >
          Prøv igen
        </button>
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

interface Props {
  errorTitle?: string;
  errorMessage?: string;
  showRetry?: boolean;
  appPrefix?: string;
}

const props = withDefaults(defineProps<Props>(), {
  errorTitle: 'Der opstod en fejl',
  errorMessage: 'Noget gik galt. Prøv at genindlæse siden eller kontakt support.',
  showRetry: true,
  appPrefix: 'raadgiverportalen'
});

const emit = defineEmits<{
  error: [error: Error];
  retry: [];
}>();

const hasError = ref(false);

onErrorCaptured((error: Error) => {
  hasError.value = true;
  
  // Log error with app prefix as required by VG rules
  console.error(`${props.appPrefix}: ${error.message}`, error);
  
  emit('error', error);
  
  // Prevent the error from propagating further
  return false;
});

const retry = () => {
  hasError.value = false;
  emit('retry');
};
</script>

<style lang="scss" scoped>
.error-boundary {
  width: 100%;
}
</style> 