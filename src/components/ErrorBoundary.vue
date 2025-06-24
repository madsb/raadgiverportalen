<template>
  <div class="error-boundary">
    <div v-if="hasError">
      <slot
        name="error"
        :error="lastError"
        :error-message="errorMessage"
        :error-title="errorTitle"
        :retry="retry"
        :reset="reset"
        :retrying="retrying"
        :show-retry="showRetry"
        :show-reset="showReset"
      >
        <!-- Default error display -->
        <div class="alert alert-error" role="alert" aria-atomic="true">
          <div class="alert-body">
            <p class="alert-heading">{{ errorTitle }}</p>
            <p class="alert-text">{{ errorMessage }}</p>
            <div v-if="lastError?.message && showErrorDetails" class="alert-text mt-2">
              <small>{{ lastError.message }}</small>
            </div>
            <div v-if="showRetry || showReset" class="d-flex gap-2 mt-3">
              <button v-if="showRetry" class="button button-secondary" @click="retry" :disabled="retrying">
                {{ retrying ? 'Prøver igen...' : 'Prøv igen' }}
              </button>
              <button v-if="showReset" class="button button-tertiary" @click="reset">Nulstil</button>
            </div>
          </div>
        </div>
      </slot>
    </div>
    <slot v-else :retry="manualRetry" :reset="reset" :has-error="hasError" />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, nextTick, readonly } from 'vue';

interface Props {
  errorTitle?: string;
  errorMessage?: string;
  showRetry?: boolean;
  showReset?: boolean;
  showErrorDetails?: boolean;
  appPrefix?: string;
  resetStrategy?: 'soft' | 'hard';
}

const props = withDefaults(defineProps<Props>(), {
  errorTitle: 'Der opstod en fejl',
  errorMessage: 'Noget gik galt. Prøv at genindlæse siden eller kontakt support.',
  showRetry: false,
  showReset: true,
  showErrorDetails: false,
  appPrefix: 'raadgiverportalen',
  resetStrategy: 'soft'
});

const emit = defineEmits<{
  error: [error: Error];
  retry: [];
  reset: [];
  beforeRetry: [];
  afterRetry: [];
}>();

const hasError = ref(false);
const retrying = ref(false);
const lastError = ref<Error | null>(null);
const errorBoundaryKey = ref(0);

onErrorCaptured((error: Error) => {
  hasError.value = true;
  lastError.value = error;

  // Log error with app prefix as required by VG rules
  console.error(`${props.appPrefix}: ${error.message}`, error);

  emit('error', error);

  // Prevent the error from propagating further
  return false;
});

const retry = async () => {
  if (retrying.value) return;

  retrying.value = true;
  emit('beforeRetry');

  try {
    // Reset error state
    hasError.value = false;
    lastError.value = null;

    // Use nextTick to ensure DOM updates before emitting retry
    await nextTick();

    emit('retry');
    emit('afterRetry');
  } catch (error) {
    // If retry fails, re-trigger error state
    hasError.value = true;
    lastError.value = error as Error;
    console.error(`${props.appPrefix}: Retry failed`, error);
  } finally {
    retrying.value = false;
  }
};

const reset = async () => {
  if (retrying.value) return;

  retrying.value = true;

  try {
    if (props.resetStrategy === 'hard') {
      // Hard reset: Force component re-render by changing key
      errorBoundaryKey.value++;
    }

    // Reset all error state
    hasError.value = false;
    lastError.value = null;

    // Use nextTick to ensure DOM updates
    await nextTick();

    emit('reset');
  } finally {
    retrying.value = false;
  }
};

// Allow manual operations from slot
const manualRetry = () => {
  retry();
};

// Expose methods for parent components
defineExpose({
  retry,
  reset,
  hasError: readonly(hasError),
  lastError: readonly(lastError)
});
</script>

<style lang="scss" scoped>
.error-boundary {
  width: 100%;
}

.d-flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
