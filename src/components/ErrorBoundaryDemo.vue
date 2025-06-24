<template>
  <div>
    <h2 class="mt-5">Error Boundary Demo:</h2>
    <p class="mb-5">Demonstration af error boundary komponenter og hvordan de håndterer forskellige typer fejl</p>

    <div class="alert alert-info mb-4">
      <div class="alert-body">
        <p class="alert-heading">Test Error Boundaries</p>
        <div class="alert-text">
          <p>
            Klik på knapperne nedenfor for at teste forskellige error boundary scenarier. Bemærk hvordan fejlene bliver fanget og håndteret uden at
            crashe hele applikationen. Nu med slot-baseret customization!
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <h3>Basic Error Boundary</h3>
        <ErrorBoundary
          error-title="Demo fejl fanget"
          error-message="Dette er en demonstration af basic error boundary funktionalitet."
          show-error-details
          reset-strategy="soft"
          @error="handleDemoError"
          @reset="handleReset"
        >
          <div class="border p-3 mb-3">
            <h4>Komponent med potentielle fejl</h4>
            <p>Denne sektion er beskyttet af en ErrorBoundary</p>
            <button class="button button-secondary me-2" @click="triggerSyncError">Trigger Sync Fejl</button>
            <button class="button button-secondary" @click="triggerRenderError">Trigger Render Fejl</button>
            <div v-if="showBrokenComponent">
              {{ brokenData.nonExistent.property }}
            </div>
          </div>
        </ErrorBoundary>
      </div>

      <div class="col-12 col-md-6">
        <h3>Async Error Boundary</h3>
        <AsyncErrorBoundary
          error-title="Async demo fejl fanget"
          error-message="Dette er en demonstration af async error boundary med retry funktionalitet."
          :max-retries="2"
          :retry-delay="1000"
          :backoff-multiplier="1.5"
          show-reset
          reset-strategy="soft"
          @error="handleAsyncDemoError"
          @maxRetriesReached="handleMaxRetriesDemo"
          @retry="handleAsyncRetry"
          @reset="handleAsyncReset"
        >
          <div class="border p-3 mb-3">
            <h4>Async komponent med fejl</h4>
            <p>Denne sektion er beskyttet af en AsyncErrorBoundary</p>
            <div v-if="asyncLoading" class="spinner" aria-label="Henter indhold" />
            <div v-else-if="asyncData" class="alert alert-success">
              <div class="alert-body">
                <p class="alert-text">Async operation successful: {{ asyncData }}</p>
              </div>
            </div>
            <button class="button button-secondary me-2" @click="triggerAsyncError" :disabled="asyncLoading">
              {{ asyncLoading ? 'Loading...' : 'Trigger Async Fejl' }}
            </button>
            <button class="button button-secondary" @click="triggerSuccessfulAsync" :disabled="asyncLoading">
              {{ asyncLoading ? 'Loading...' : 'Successful Async' }}
            </button>
          </div>
        </AsyncErrorBoundary>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12 col-md-6">
        <h3>Custom Error Display (Slot)</h3>
        <ErrorBoundary error-title="Custom fejl" error-message="Dette viser custom error display via slot" @error="handleCustomError">
          <template #error="{ error, reset, retrying, showReset }">
            <div class="custom-error-display">
              <div class="alert alert-warning" role="alert">
                <div class="alert-body">
                  <h4 class="alert-heading">🚨 Custom Error Handler</h4>
                  <p class="alert-text">Noget gik helt galt! Dette er en custom error display implementeret via slot.</p>
                  <div v-if="error" class="mt-2">
                    <strong>Fejl detaljer:</strong>
                    <code class="d-block mt-1 p-2 bg-light">{{ error.message }}</code>
                  </div>
                  <div class="d-flex gap-2 mt-3">
                    <button v-if="showReset" @click="reset" class="button button-primary" :disabled="retrying">
                      {{ retrying ? '🔧 Nulstiller...' : '🔧 Nulstil Alt' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="border p-3 mb-3">
            <h4>Komponent med custom error handling</h4>
            <p>Fejl her vises med custom styling via slot</p>
            <button class="button button-secondary" @click="triggerCustomError">Trigger Custom Error</button>
            <div v-if="showCustomBrokenComponent">
              {{ customBrokenData.will.definitely.fail }}
            </div>
          </div>
        </ErrorBoundary>
      </div>

      <div class="col-12 col-md-6">
        <h3>Advanced Async with Custom Slot</h3>
        <AsyncErrorBoundary
          :max-retries="3"
          :retry-delay="500"
          :backoff-multiplier="2"
          show-reset
          @error="handleAdvancedAsyncError"
          @maxRetriesReached="handleAdvancedMaxRetries"
        >
          <template #error="{ error, retry, reset, retrying, retryCount, maxRetries, maxRetriesReached }">
            <div class="advanced-error-display">
              <div class="alert" :class="maxRetriesReached ? 'alert-error' : 'alert-warning'" role="alert">
                <div class="alert-body">
                  <h4 class="alert-heading">
                    {{ maxRetriesReached ? '💥 Maximum Forsøg Nået' : '⚠️ Async Fejl' }}
                  </h4>
                  <p class="alert-text">
                    {{ maxRetriesReached ? 'Vi kunne ikke løse problemet efter flere forsøg.' : 'Der opstod en fejl under async operation.' }}
                  </p>
                  <div class="progress-bar mt-2 mb-3">
                    <div class="progress-bar-fill" :style="{ width: `${(retryCount / maxRetries) * 100}%` }"></div>
                  </div>
                  <p class="small">Forsøg: {{ retryCount }} / {{ maxRetries }}</p>
                  <div class="d-flex gap-2 mt-3">
                    <button v-if="!maxRetriesReached" @click="retry" class="button button-secondary" :disabled="retrying">
                      {{ retrying ? '⏳ Prøver igen...' : '🔄 Prøv Igen' }}
                    </button>
                    <button @click="reset" class="button button-tertiary">🔧 Nulstil</button>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="border p-3 mb-3">
            <h4>Advanced Async Component</h4>
            <p>Med exponential backoff og custom progress display</p>
            <div v-if="advancedAsyncLoading" class="spinner" aria-label="Henter indhold" />
            <div v-else-if="advancedAsyncData" class="alert alert-success">
              <div class="alert-body">
                <p class="alert-text">Success: {{ advancedAsyncData }}</p>
              </div>
            </div>
            <button class="button button-secondary" @click="triggerAdvancedAsyncError" :disabled="advancedAsyncLoading">
              {{ advancedAsyncLoading ? 'Loading...' : 'Trigger Advanced Async Error' }}
            </button>
          </div>
        </AsyncErrorBoundary>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <h3>Nested Error Boundaries</h3>
        <p>Demonstration af hvordan error boundaries kan være nested for granular fejlhåndtering</p>

        <ErrorBoundary
          error-title="Outer boundary fejl"
          error-message="Fejl fanget af den ydre error boundary"
          reset-strategy="soft"
          @reset="handleOuterReset"
        >
          <div class="border p-3">
            <h4>Outer Error Boundary</h4>
            <p>Denne sektion har en nested error boundary indeni</p>

            <button class="button button-tertiary mb-3" @click="triggerOuterError">Trigger Outer Error</button>

            <ErrorBoundary
              error-title="Inner boundary fejl"
              error-message="Fejl fanget af den indre error boundary - outer boundary påvirkes ikke"
              reset-strategy="soft"
              @reset="handleInnerReset"
            >
              <div class="border border-secondary p-2">
                <h5>Inner Error Boundary</h5>
                <p>Fejl her påvirker kun denne sektion</p>
                <button class="button button-tertiary" @click="triggerInnerError">Trigger Inner Error</button>
                <div v-if="showInnerBrokenComponent">
                  {{ innerBrokenData.this.will.fail }}
                </div>
              </div>
            </ErrorBoundary>

            <div v-if="showOuterBrokenComponent" class="mt-2">
              {{ outerBrokenData.this.will.also.fail }}
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <h3>Error Log</h3>
        <div class="border p-3" style="max-height: 200px; overflow-y: auto">
          <div v-if="errorLog.length === 0" class="text-muted">Ingen fejl endnu - prøv at klikke på knapperne ovenfor</div>
          <div v-for="(error, index) in errorLog" :key="index" class="mb-2">
            <small class="text-muted">{{ error.timestamp }}</small
            ><br />
            <strong>{{ error.type }}:</strong> {{ error.message }}
            <span v-if="error.retryCount !== undefined" class="badge badge-info ms-2">Retry: {{ error.retryCount }}</span>
          </div>
        </div>
        <button class="button button-tertiary mt-2" @click="clearErrorLog" :disabled="errorLog.length === 0">Ryd Log</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AsyncErrorBoundary from './AsyncErrorBoundary.vue';
import ErrorBoundary from './ErrorBoundary.vue';

// Demo state
const showBrokenComponent = ref(false);
const showCustomBrokenComponent = ref(false);
const showInnerBrokenComponent = ref(false);
const showOuterBrokenComponent = ref(false);
const asyncLoading = ref(false);
const asyncData = ref<string | null>(null);
const advancedAsyncLoading = ref(false);
const advancedAsyncData = ref<string | null>(null);

// Broken data objects to trigger errors
const brokenData = ref<any>(null);
const customBrokenData = ref<any>(null);
const innerBrokenData = ref<any>(null);
const outerBrokenData = ref<any>(null);

// Error logging for demo purposes
interface ErrorLogEntry {
  timestamp: string;
  type: string;
  message: string;
  retryCount?: number;
}

const errorLog = ref<ErrorLogEntry[]>([]);

const addToErrorLog = (type: string, message: string, retryCount?: number) => {
  errorLog.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    type,
    message,
    retryCount
  });

  // Keep only last 15 errors
  if (errorLog.value.length > 15) {
    errorLog.value = errorLog.value.slice(0, 15);
  }
};

// Error trigger functions
const triggerSyncError = () => {
  showBrokenComponent.value = true;
};

const triggerRenderError = () => {
  // This will cause a render error
  brokenData.value = null;
  showBrokenComponent.value = true;
};

const triggerCustomError = () => {
  customBrokenData.value = null;
  showCustomBrokenComponent.value = true;
};

const triggerAsyncError = async () => {
  asyncLoading.value = true;
  asyncData.value = null;

  try {
    // Simulate async operation that fails
    await new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Simulated async error')), 1000);
    });
  } catch (error) {
    // Re-throw to trigger error boundary
    throw error;
  } finally {
    asyncLoading.value = false;
  }
};

const triggerAdvancedAsyncError = async () => {
  advancedAsyncLoading.value = true;
  advancedAsyncData.value = null;

  try {
    // Simulate async operation that fails
    await new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Advanced async operation failed')), 800);
    });
  } catch (error) {
    throw error;
  } finally {
    advancedAsyncLoading.value = false;
  }
};

const triggerSuccessfulAsync = async () => {
  asyncLoading.value = true;
  asyncData.value = null;

  try {
    // Simulate successful async operation
    await new Promise(resolve => {
      setTimeout(() => resolve('Success!'), 1000);
    });
    asyncData.value = 'Async operation completed successfully';
  } finally {
    asyncLoading.value = false;
  }
};

const triggerInnerError = () => {
  innerBrokenData.value = null;
  showInnerBrokenComponent.value = true;
};

const triggerOuterError = () => {
  outerBrokenData.value = null;
  showOuterBrokenComponent.value = true;
};

// Error handlers
const handleDemoError = (error: Error) => {
  addToErrorLog('Basic Error Boundary', error.message);
  console.error('raadgiverportalen: Demo error caught by basic boundary', error);
};

const handleCustomError = (error: Error) => {
  addToErrorLog('Custom Error Boundary', error.message);
  console.error('raadgiverportalen: Custom error caught', error);
};

const handleAsyncDemoError = (error: Error, retryCount: number) => {
  addToErrorLog('Async Error Boundary', error.message, retryCount);
  console.error(`raadgiverportalen: Demo async error caught (retry ${retryCount})`, error);
};

const handleAdvancedAsyncError = (error: Error, retryCount: number) => {
  addToErrorLog('Advanced Async Error', error.message, retryCount);
  console.error(`raadgiverportalen: Advanced async error caught (retry ${retryCount})`, error);
};

const handleMaxRetriesDemo = (error: Error) => {
  addToErrorLog('Max Retries Reached', `${error.message} - giving up`);
  console.error('raadgiverportalen: Demo async error max retries reached', error);
};

const handleAdvancedMaxRetries = (error: Error) => {
  addToErrorLog('Advanced Max Retries', `${error.message} - giving up`);
  console.error('raadgiverportalen: Advanced async error max retries reached', error);
};

// Reset handlers
const handleReset = () => {
  showBrokenComponent.value = false;
  brokenData.value = { nonExistent: { property: 'value' } };
  addToErrorLog('Basic Reset', 'Error boundary reset completed');
};

const handleAsyncRetry = (retryCount: number) => {
  asyncData.value = null;
  addToErrorLog('Async Retry', `Async retry attempt ${retryCount}`);
};

const handleAsyncReset = () => {
  asyncLoading.value = false;
  asyncData.value = null;
  addToErrorLog('Async Reset', 'Async error boundary reset completed');
};

const handleInnerReset = () => {
  showInnerBrokenComponent.value = false;
  addToErrorLog('Inner Reset', 'Inner error boundary reset');
};

const handleOuterReset = () => {
  showOuterBrokenComponent.value = false;
  addToErrorLog('Outer Reset', 'Outer error boundary reset');
};

const clearErrorLog = () => {
  errorLog.value = [];
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.border-secondary {
  border-color: #6c757d !important;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 1rem;
}

.me-2 {
  margin-right: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.ms-2 {
  margin-left: 0.5rem;
}

.text-muted {
  color: #6c757d;
}

.d-flex {
  display: flex;
}

.d-block {
  display: block;
}

.gap-2 {
  gap: 0.5rem;
}

.small {
  font-size: 0.875rem;
}

.bg-light {
  background-color: #f8f9fa;
}

.custom-error-display,
.advanced-error-display {
  margin: 1rem 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #fd7e14;
  transition: width 0.3s ease;
}

.badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}

.badge-info {
  color: #fff;
  background-color: #0dcaf0;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.875em;
  color: #d63384;
}
</style>
