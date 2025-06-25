import { ref, onMounted, onUnmounted } from 'vue'
import { piwikService } from '@erst-vg/piwik-event-wrapper'
import * as slugUtil from '../utils/slug.util'

export interface NavigationState {
  currentStep: number
  maxStep: number
  hash: string
}

/**
 * Composable for handling hash-based step navigation (e.g., wizards, multi-step forms)
 * Follows VG rules for navigation and tracking
 *
 * ⚠️ COMPATIBILITY WARNING:
 * This composable is INCOMPATIBLE with the main router system. Do not use both together
 * as they will conflict over hash change events and hash format expectations.
 *
 * Use this composable when:
 * - Building step-based workflows within a single component/page
 * - Creating wizards or multi-step forms
 * - Not using the main application router
 *
 * Use the router system when:
 * - Building full application navigation
 * - Need route parameters, guards, and complex routing
 * - Managing multiple pages/views
 */
export function useNavigation(initialStep = 1, maxSteps = 3) {
  const currentStep = ref(initialStep)
  const maxStep = ref(maxSteps)

  const updateStepFromHash = () => {
    const { hash } = window.location
    const stepFromHash = hash ? parseInt(hash.replace('#', ''), 10) : initialStep

    if (stepFromHash >= 1 && stepFromHash <= maxStep.value) {
      currentStep.value = stepFromHash
      // Emit page view event as required by VG rules
      piwikService.emitPageViewEvent()
    }
  }

  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= maxStep.value) {
      const slugifiedStep = slugUtil.slugify(step.toString())
      window.location.hash = slugifiedStep
    }
  }

  const nextStep = () => {
    if (currentStep.value < maxStep.value) {
      navigateToStep(currentStep.value + 1)
    }
  }

  const previousStep = () => {
    if (currentStep.value > 1) {
      navigateToStep(currentStep.value - 1)
    }
  }

  const canGoNext = () => currentStep.value < maxStep.value
  const canGoPrevious = () => currentStep.value > 1

  onMounted(() => {
    // Set initial hash if none exists
    if (!window.location.hash) {
      window.location.hash = slugUtil.slugify(initialStep.toString())
    }

    // Add event listener for hash changes
    window.addEventListener('hashchange', updateStepFromHash)

    // Update step from current hash
    updateStepFromHash()
  })

  onUnmounted(() => {
    window.removeEventListener('hashchange', updateStepFromHash)
  })

  return {
    currentStep,
    maxStep,
    navigateToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
    updateStepFromHash
  }
}
