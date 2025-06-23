import { ref, Ref, shallowRef } from 'vue';

export interface AsyncState<T> {
  data: Ref<T | null>;
  error: Ref<string | null>;
  loading: Ref<boolean>;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

/**
 * Composable for handling async operations with loading states and error handling
 * Follows VG rules for proper error handling and loading UI
 */
export function useAsyncState<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: {
    immediate?: boolean;
    initialData?: T | null;
    errorPrefix?: string;
  } = {}
): AsyncState<T> {
  const { immediate = false, initialData = null, errorPrefix = 'raadgiverportalen' } = options;

  const data = shallowRef<T | null>(initialData);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const execute = async (...args: any[]) => {
    try {
      loading.value = true;
      error.value = null;

      const result = await asyncFunction(...args);
      data.value = result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      error.value = errorMessage;

      // Log error with app prefix as required by VG rules
      console.error(`${errorPrefix}: ${errorMessage}`);
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = initialData;
    error.value = null;
    loading.value = false;
  };

  if (immediate) {
    execute();
  }

  return {
    data,
    error,
    loading,
    execute,
    reset
  };
}
