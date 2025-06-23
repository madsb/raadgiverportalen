<template>
  <div class="async-error-boundary">
    <div v-if="hasError" class="alert alert-error" role="alert" aria-atomic="true">
      <div class="alert-body">
        <p class="alert-heading">{{ errorTitle }}</p>
        <p class="alert-text">{{ errorMessage }}</p>
        <div v-if="errorDetails" class="alert-text mt-2">
          <small>{{ errorDetails }}</small>
        </div>
        <div class="d-flex gap-2 mt-3">
          <button v-if="showRetry" class="button button-secondary" @click="retry" :disabled="retrying">
            {{ retrying ? 'Prøver igen...' : 'Prøv igen' }}
          </button>
          <button v-if="showReset" class="button button-tertiary" @click="reset">Nulstil</button>
        </div>
      </div>
    </div>
    <slot v-else :retry="manualRetry" :reset="reset" />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

interface Props {
  errorTitle?: string;
  errorMessage?: string;
  showRetry?: boolean;
  showReset?: boolean;
  appPrefix?: string;
  maxRetries?: number;
  retryDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  errorTitle: 'Der opstod en fejl',
  errorMessage: 'Noget gik galt. Prøv at genindlæse siden eller kontakt support.',
  showRetry: true,
  showReset: false,
  appPrefix: 'raadgiverportalen',
  maxRetries: 3,
  retryDelay: 1000
});

const emit = defineEmits<{
  error: [error: Error, retryCount: number];
  retry: [];
  reset: [];
  maxRetriesReached: [error: Error];
}>();

const hasError = ref(false);
const retrying = ref(false);
const retryCount = ref(0);
const errorDetails = ref<string>('');
const lastError = ref<Error | null>(null);

onErrorCaptured((error: Error) => {
  hasError.value = true;
  lastError.value = error;

  // Enhanced error logging with retry count
  console.error(`${props.appPrefix}: ${error.message} (attempt ${retryCount.value + 1})`, error);

  // Store error details for display
  errorDetails.value = error.message;

  emit('error', error, retryCount.value);

  // Prevent the error from propagating further
  return false;
});

const retry = async () => {
  if (retryCount.value >= props.maxRetries) {
    console.error(`${props.appPrefix}: Max retries (${props.maxRetries}) reached for error:`, lastError.value);
    emit('maxRetriesReached', lastError.value!);
    return;
  }

  retrying.value = true;
  retryCount.value++;

  try {
    // Add delay before retry
    if (props.retryDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, props.retryDelay));
    }

    hasError.value = false;
    errorDetails.value = '';
    emit('retry');
  } finally {
    retrying.value = false;
  }
};

const reset = () => {
  hasError.value = false;
  retrying.value = false;
  retryCount.value = 0;
  errorDetails.value = '';
  lastError.value = null;
  emit('reset');
};

// Allow manual retry from slot
const manualRetry = () => {
  retry();
};
</script>

<style lang="scss" scoped>
.async-error-boundary {
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
