<template>
  <div class="async-error-boundary">
    <div v-if="hasError">
      <slot
        name="error"
        :error="lastError"
        :error-message="errorMessage"
        :error-title="errorTitle"
        :error-details="errorDetails"
        :retry="retry"
        :reset="reset"
        :retrying="retrying"
        :retry-count="retryCount"
        :max-retries="maxRetries"
        :show-retry="showRetry && retryCount < maxRetries"
        :show-reset="showReset"
        :max-retries-reached="retryCount >= maxRetries"
      >
        <!-- Default error display -->
        <div class="alert alert-error" role="alert" aria-atomic="true">
          <div class="alert-body">
            <p class="alert-heading">{{ errorTitle }}</p>
            <p class="alert-text">{{ errorMessage }}</p>
            <div v-if="errorDetails" class="alert-text mt-2">
              <small>{{ errorDetails }}</small>
            </div>
            <div v-if="retryCount >= maxRetries" class="alert alert-warning mt-2">
              <div class="alert-body">
                <p class="alert-text">Maksimalt antal forsøg nået ({{ maxRetries }})</p>
              </div>
            </div>
            <div v-if="(showRetry && retryCount < maxRetries) || showReset" class="d-flex gap-2 mt-3">
              <button v-if="showRetry && retryCount < maxRetries" class="button button-secondary" :disabled="retrying" @click="retry">
                {{ retrying ? 'Prøver igen...' : `Prøv igen (${retryCount}/${maxRetries})` }}
              </button>
              <button v-if="showReset" class="button button-tertiary" :disabled="retrying" @click="reset">Nulstil</button>
            </div>
          </div>
        </div>
      </slot>
    </div>
    <slot v-else :retry="manualRetry" :reset="reset" :has-error="hasError" :retry-count="retryCount" :retrying="retrying" />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, nextTick, readonly } from 'vue'

interface Props {
  errorTitle?: string
  errorMessage?: string
  showRetry?: boolean
  showReset?: boolean
  appPrefix?: string
  maxRetries?: number
  retryDelay?: number
  resetStrategy?: 'soft' | 'hard'
  backoffMultiplier?: number
}

const props = withDefaults(defineProps<Props>(), {
  errorTitle: 'Der opstod en fejl',
  errorMessage: 'Noget gik galt. Prøv at genindlæse siden eller kontakt support.',
  showRetry: true,
  showReset: false,
  appPrefix: 'raadgiverportalen',
  maxRetries: 3,
  retryDelay: 1000,
  resetStrategy: 'soft',
  backoffMultiplier: 1.5
})

const emit = defineEmits<{
  error: [error: Error, retryCount: number]
  retry: [retryCount: number]
  reset: []
  maxRetriesReached: [error: Error]
  beforeRetry: [retryCount: number]
  afterRetry: [retryCount: number]
  retryFailed: [error: Error, retryCount: number]
}>()

const hasError = ref(false)
const retrying = ref(false)
const retryCount = ref(0)
const errorDetails = ref<string>('')
const lastError = ref<Error | null>(null)
const errorBoundaryKey = ref(0)

onErrorCaptured((error: Error) => {
  hasError.value = true
  lastError.value = error

  // Enhanced error logging with retry count
  console.error(`${props.appPrefix}: ${error.message} (attempt ${retryCount.value + 1})`, error)

  // Store error details for display
  errorDetails.value = error.message

  emit('error', error, retryCount.value)

  // Prevent the error from propagating further
  return false
})

const calculateRetryDelay = (attemptNumber: number): number => props.retryDelay * Math.pow(props.backoffMultiplier, attemptNumber)

const retry = async () => {
  if (retrying.value) {
    return
  }

  if (retryCount.value >= props.maxRetries) {
    console.error(`${props.appPrefix}: Max retries (${props.maxRetries}) reached for error:`, lastError.value)
    emit('maxRetriesReached', lastError.value!)
    return
  }

  retrying.value = true
  retryCount.value++

  emit('beforeRetry', retryCount.value)

  try {
    // Calculate delay with backoff
    const delay = calculateRetryDelay(retryCount.value - 1)

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Reset error state
    hasError.value = false
    errorDetails.value = ''

    // Use nextTick to ensure DOM updates before emitting retry
    await nextTick()

    emit('retry', retryCount.value)
    emit('afterRetry', retryCount.value)
  } catch (error) {
    // If retry setup fails, handle gracefully
    hasError.value = true
    lastError.value = error as Error
    errorDetails.value = (error as Error).message
    console.error(`${props.appPrefix}: Retry setup failed`, error)
    emit('retryFailed', error as Error, retryCount.value)
  } finally {
    retrying.value = false
  }
}

const reset = async () => {
  if (retrying.value) {
    return
  }

  retrying.value = true

  try {
    if (props.resetStrategy === 'hard') {
      // Hard reset: Force component re-render by changing key
      errorBoundaryKey.value++
    }

    // Reset all error state
    hasError.value = false
    retrying.value = false
    retryCount.value = 0
    errorDetails.value = ''
    lastError.value = null

    // Use nextTick to ensure DOM updates
    await nextTick()

    emit('reset')
  } finally {
    retrying.value = false
  }
}

// Allow manual retry from slot
const manualRetry = () => {
  retry()
}

// Expose methods and state for parent components
defineExpose({
  retry,
  reset,
  hasError: readonly(hasError),
  lastError: readonly(lastError),
  retryCount: readonly(retryCount),
  retrying: readonly(retrying)
})
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
