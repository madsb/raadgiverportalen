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
            crashe hele applikationen.
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
          @error="handleDemoError"
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
          show-reset
          @error="handleAsyncDemoError"
          @maxRetriesReached="handleMaxRetriesDemo"
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
      <div class="col-12">
        <h3>Nested Error Boundaries</h3>
        <p>Demonstration af hvordan error boundaries kan være nested for granular fejlhåndtering</p>

        <ErrorBoundary error-title="Outer boundary fejl" error-message="Fejl fanget af den ydre error boundary">
          <div class="border p-3">
            <h4>Outer Error Boundary</h4>
            <p>Denne sektion har en nested error boundary indeni</p>

            <button class="button button-tertiary mb-3" @click="triggerOuterError">Trigger Outer Error</button>

            <ErrorBoundary error-title="Inner boundary fejl" error-message="Fejl fanget af den indre error boundary - outer boundary påvirkes ikke">
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
const showInnerBrokenComponent = ref(false);
const showOuterBrokenComponent = ref(false);
const asyncLoading = ref(false);
const asyncData = ref<string | null>(null);

// Broken data objects to trigger errors
const brokenData = ref<any>(null);
const innerBrokenData = ref<any>(null);
const outerBrokenData = ref<any>(null);

// Error logging for demo purposes
interface ErrorLogEntry {
  timestamp: string;
  type: string;
  message: string;
}

const errorLog = ref<ErrorLogEntry[]>([]);

const addToErrorLog = (type: string, message: string) => {
  errorLog.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    type,
    message
  });

  // Keep only last 10 errors
  if (errorLog.value.length > 10) {
    errorLog.value = errorLog.value.slice(0, 10);
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

const handleAsyncDemoError = (error: Error, retryCount: number) => {
  addToErrorLog('Async Error Boundary', `${error.message} (retry ${retryCount})`);
  console.error(`raadgiverportalen: Demo async error caught (retry ${retryCount})`, error);
};

const handleMaxRetriesDemo = (error: Error) => {
  addToErrorLog('Max Retries Reached', `${error.message} - giving up`);
  console.error('raadgiverportalen: Demo async error max retries reached', error);
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

.text-muted {
  color: #6c757d;
}
</style>
