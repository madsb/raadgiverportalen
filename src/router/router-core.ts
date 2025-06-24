// Core router functionality
import { reactive, markRaw } from 'vue'
import type { RouteRecord, ResolvedRoute, GuardFn } from './routes'
import routes from './routes'

// Types for internal use
interface MatchedRoute {
  record: RouteRecord
  params: Record<string, string>
}

interface MatchedChain {
  chain: MatchedRoute[]
  params: Record<string, string>
}

// Types for scroll behavior
export interface ScrollPosition {
  left: number
  top: number
}

export interface ScrollPositionResult {
  el?: string
  top?: number
  left?: number
  behavior?: ScrollBehavior
}

export type ScrollBehaviorHandler = (
  to: ResolvedRoute,
  from: ResolvedRoute | null,
  savedPosition: ScrollPosition | null
) => ScrollPositionResult | false | Promise<ScrollPositionResult | false>

// Router state
export const router = reactive({
  path: '',
  params: {} as Record<string, string>,
  chain: [] as MatchedRoute[],
  component: null as any
})

// Navigation guards
export const globalBeforeEach: GuardFn[] = []

// Previous route for guard context
let previousRoute: ResolvedRoute | null = null

// Scroll positions keyed by path
const scrollPositions = new Map<string, ScrollPosition>()

// Default scroll behavior (Vue Router style)
let scrollBehavior: ScrollBehaviorHandler = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { top: 0, left: 0 }
  }
}

// Tokenize path into segments
function tokenize(path: string): string[] {
  return path.split('/').filter(Boolean)
}

// Check if a segment is dynamic (starts with :)
function isDynamicSegment(segment: string): boolean {
  return segment.startsWith(':')
}

// Extract param name from dynamic segment
function getParamName(segment: string): string {
  return segment.slice(1) // Remove the :
}


// Match route - simplified for flat structure
function matchRoute(
  path: string,
  route: RouteRecord
): { matches: boolean; params: Record<string, string> } {
  const pathTokens = tokenize(path)
  const routeTokens = tokenize(route.path)
  
  // Wildcard route
  if (route.path === '*') {
    return { matches: true, params: {} }
  }
  
  // Check token count
  if (pathTokens.length !== routeTokens.length) {
    return { matches: false, params: {} }
  }
  
  // Match tokens
  const params: Record<string, string> = {}
  
  for (let i = 0; i < routeTokens.length; i++) {
    const routeToken = routeTokens[i]
    const pathToken = pathTokens[i]
    
    if (isDynamicSegment(routeToken)) {
      params[getParamName(routeToken)] = pathToken
    } else if (routeToken !== pathToken) {
      return { matches: false, params: {} }
    }
  }
  
  return { matches: true, params }
}

// Find best matching route (flat structure)
function findMatchingRoute(
  path: string,
  records: RouteRecord[]
): MatchedChain | null {
  let bestMatch: MatchedRoute | null = null
  let wildcardMatch: MatchedRoute | null = null
  
  for (const record of records) {
    const { matches, params } = matchRoute(path, record)
    
    if (matches) {
      const rawRecord = {
        ...record,
        component: record.component ? markRaw(record.component) : undefined
      }
      
      if (record.path === '*') {
        wildcardMatch = { record: rawRecord, params }
      } else {
        bestMatch = { record: rawRecord, params }
        break // First non-wildcard match wins
      }
    }
  }
  
  const match = bestMatch || wildcardMatch
  
  if (match) {
    return {
      chain: [match],
      params: match.params
    }
  }
  
  return null
}

// Execute guard pipeline
async function executeGuards(
  chain: MatchedRoute[],
  to: ResolvedRoute,
  from: ResolvedRoute | null
): Promise<boolean> {
  // Global guards first
  for (const guard of globalBeforeEach) {
    const result = await guard(to, from)
    if (!result) return false
  }
  
  // Route-specific guards
  for (const matched of chain) {
    if (matched.record.beforeEnter) {
      const result = await matched.record.beforeEnter(to, from)
      if (!result) return false
    }
  }
  
  return true
}

// Save scroll position for current route
function saveScrollPosition(): void {
  if (previousRoute) {
    const position: ScrollPosition = {
      left: window.pageXOffset || document.documentElement.scrollLeft,
      top: window.pageYOffset || document.documentElement.scrollTop
    }
    scrollPositions.set(previousRoute.path, position)
  }
}

// Apply scroll behavior
async function applyScrollBehavior(to: ResolvedRoute, from: ResolvedRoute | null): Promise<void> {
  // Only look for saved position if we're going to a previously visited route
  const savedPosition = scrollPositions.get(to.path) || null
  
  // Call the scroll behavior handler
  const position = await Promise.resolve(
    scrollBehavior(to, from, savedPosition)
  )
  
  // If false, don't change scroll position
  if (position === false) {
    return
  }
  
  // Use requestAnimationFrame to ensure DOM is updated
  requestAnimationFrame(() => {
    if ('el' in position && position.el) {
      // Scroll to element
      const el = document.querySelector(position.el)
      if (el) {
        el.scrollIntoView({ behavior: position.behavior || 'auto' })
      }
    } else {
      // Scroll to coordinates
      const scrollOptions: ScrollToOptions = {
        left: position.left || 0,
        top: position.top || 0,
        behavior: position.behavior || 'auto'
      }
      window.scrollTo(scrollOptions)
    }
  })
}

// Resolve current route from hash
export async function resolve(): Promise<void> {
  const hash = window.location.hash.slice(1) || '/'
  const tokens = tokenize(hash)
  
  // Save scroll position before navigating away
  saveScrollPosition()
  
  // Find matching route (simplified for flat structure)
  const matched = findMatchingRoute(hash, routes)
  
  if (!matched) {
    // This shouldn't happen if we have a wildcard route
    console.error('No route matched for:', hash)
    return
  }
  
  
  // Create resolved route
  const to: ResolvedRoute = {
    path: hash,
    params: matched.params,
    meta: matched.chain[matched.chain.length - 1]?.record.meta || {}
  }
  
  // Execute guards
  const canNavigate = await executeGuards(matched.chain, to, previousRoute)
  
  if (!canNavigate) {
    // Navigation cancelled by guard
    if (previousRoute) {
      // Restore previous hash without triggering hashchange
      window.history.replaceState(null, '', '#' + previousRoute.path)
    }
    return
  }
  
  // Update router state
  router.path = hash
  router.params = matched.params
  router.chain = matched.chain
  router.component = matched.chain[0]?.record.component || null
  
  // Update previous route (but save reference to from for scroll behavior)
  const from = previousRoute
  previousRoute = to
  
  // Apply scroll behavior
  await applyScrollBehavior(to, from)
  
  // Emit custom event
  window.dispatchEvent(new CustomEvent('rgp:route-changed', {
    detail: { path: hash, params: matched.params }
  }))
}

// Navigate to a new route
export function navigate(to: string): void {
  const cleanPath = to.startsWith('#') ? to.slice(1) : to
  window.location.hash = cleanPath
}

// Navigate back
export function back(): void {
  window.history.back()
}

// Navigate forward
export function forward(): void {
  window.history.forward()
}

// Replace current route without adding to history
export function replace(to: string): void {
  const cleanPath = to.startsWith('#') ? to.slice(1) : to
  window.history.replaceState(null, '', '#' + cleanPath)
  resolve()
}

// Check if a route matches current path
export function isActive(path: string): boolean {
  return router.path === path
}

// Get route meta data
export function getMeta(): Record<string, any> {
  if (router.chain.length === 0) return {}
  return router.chain[router.chain.length - 1]?.record.meta || {}
}

// Set custom scroll behavior
export function setScrollBehavior(handler: ScrollBehaviorHandler): void {
  scrollBehavior = handler
}

// Clear scroll positions (useful for testing)
export function clearScrollPositions(): void {
  scrollPositions.clear()
}

// Initialize router
export function initRouter(): void {
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    resolve()
  })
  
  // Initial resolve
  resolve()
}

// Auto-initialize on import (skip in test environment)
if (typeof window !== 'undefined' && !import.meta.env.TEST) {
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter)
  } else {
    initRouter()
  }
}