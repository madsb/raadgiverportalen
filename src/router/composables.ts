import { computed, ComputedRef } from 'vue'
import { getRouter } from './router-core'
import { RouterState, RouteLocation } from './types'

export function useRouter() {
  const router = getRouter()

  if (!router) {
    throw new Error('Router not initialized. Make sure to create router before using composables.')
  }

  return {
    push: router.push.bind(router),
    replace: router.replace.bind(router),
    back: router.back.bind(router),
    forward: router.forward.bind(router),
    isActive: router.isActive.bind(router),
    setScrollBehavior: router.setScrollBehavior.bind(router),
    addGuard: router.addGuard.bind(router)
  }
}

export function useRoute(): ComputedRef<RouteLocation> {
  const router = getRouter()

  if (!router) {
    throw new Error('Router not initialized. Make sure to create router before using composables.')
  }

  return computed(() => ({
    path: router.state.path,
    params: router.state.params,
    meta: router.state.meta
  }))
}
