// Main router exports
export { createRouter, getRouter } from './router-core'
export { routes } from './routes'
export { useRouter, useRoute } from './composables'

// Component exports
export { default as RouterView } from './RouterView.vue'
export { default as RouterLink } from './RouterLink.vue'

// Type exports
export type { RouteRecord, RouteLocation, NavigationGuard, Router, RouterState, ScrollBehavior, ScrollPosition } from './types'

// Helper function to initialize router with default routes
import { createRouter as createRouterCore } from './router-core'
import { routes as defaultRoutes } from './routes'

export function initializeRouter() {
  return createRouterCore(defaultRoutes)
}
