// Router public API
export {
  router,
  navigate,
  back,
  forward,
  replace,
  isActive,
  getMeta,
  globalBeforeEach,
  setScrollBehavior,
  initRouter,
  clearScrollPositions
} from './router-core'
export { default as RouterView } from './RouterView.vue'
export { default as RouterLink } from './RouterLink.vue'
export type { RouteRecord, GuardFn, ResolvedRoute } from './routes'
export type { ScrollPosition, ScrollPositionResult, ScrollBehaviorHandler } from './router-core'
export { default as routes } from './routes'
