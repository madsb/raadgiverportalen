import { reactive } from 'vue'
import { RouteMatcher } from './matcher'
import type { RouteMatch } from './types'
import { RouteRecord, RouterState, NavigationGuard, RouteLocation, ScrollBehavior, ScrollPosition, Router } from './types'
import { piwikService } from '@erst-vg/piwik-event-wrapper'

class RouterCore implements Router {
  private matcher: RouteMatcher
  private guardList: NavigationGuard[] = []
  private scrollPositions = new Map<string, ScrollPosition>()
  private scrollBehavior: ScrollBehavior | null = null
  private isNavigating = false
  private navigationCounter = 0

  state: RouterState = reactive({
    path: '/',
    params: {},
    matches: [],
    meta: {}
  })

  constructor(routes: RouteRecord[]) {
    this.matcher = new RouteMatcher(routes)
    this.setupHashListener()
    this.resolveCurrentRoute()
  }

  private setupHashListener(): void {
    window.addEventListener('hashchange', this.handleHashChange)
    window.addEventListener('popstate', this.handlePopState)
  }

  private handleHashChange = (): void => {
    if (!this.isNavigating) {
      this.resolveCurrentRoute()
    }
  }

  private handlePopState = (): void => {
    if (!this.isNavigating) {
      this.resolveCurrentRoute()
    }
  }

  private async resolveCurrentRoute(): Promise<void> {
    const hash = window.location.hash || '#/'
    const path = hash.slice(1) || '/'

    const matches = this.matcher.match(path)

    if (matches.length === 0) {
      return
    }

    const to: RouteLocation = {
      path,
      params: matches[matches.length - 1].params,
      meta: matches[matches.length - 1].route.meta || {}
    }

    const from: RouteLocation | null =
      this.state.path !== '/'
        ? {
            path: this.state.path,
            params: this.state.params,
            meta: this.state.meta
          }
        : null

    // Execute guards
    const canNavigate = await this.executeGuards(to, from, matches)

    if (!canNavigate) {
      // Restore previous hash if navigation was cancelled
      if (from) {
        window.location.hash = '#' + from.path
      }
      return
    }

    // Save scroll position of current route
    if (from) {
      this.scrollPositions.set(from.path, {
        top: window.scrollY,
        left: window.scrollX
      })
    }

    // Update state
    this.state.path = path
    this.state.params = to.params
    this.state.matches = matches
    this.state.meta = to.meta

    // Handle scroll behavior
    await this.handleScrollBehavior(to, from)

    // Emit route change event
    window.dispatchEvent(
      new CustomEvent('rgp:route-changed', {
        detail: { path, params: to.params }
      })
    )

    // Emit Piwik PageView event (not on initial load)
    if (from && piwikService.emitPageViewEvent) {
      const slugifiedPath = this.slugifyPath(path)
      piwikService.emitPageViewEvent()
    }
  }

  private async executeGuards(to: RouteLocation, from: RouteLocation | null, matches: RouteMatch[]): Promise<boolean> {
    // Execute global guards
    for (const guard of this.guardList) {
      const result = await guard(to, from)
      if (!result) {
        return false
      }
    }

    // Execute route-specific guards
    for (const match of matches) {
      if (match.route.beforeEnter) {
        const result = await match.route.beforeEnter(to, from)
        if (!result) {
          return false
        }
      }
    }

    return true
  }

  private async handleScrollBehavior(to: RouteLocation, from: RouteLocation | null): Promise<void> {
    if (!this.scrollBehavior) {
      // Default behavior
      const savedPosition = this.scrollPositions.get(to.path)
      if (savedPosition) {
        window.scrollTo(savedPosition)
      } else {
        window.scrollTo(0, 0)
      }
      return
    }

    const savedPosition = this.scrollPositions.get(to.path) || null
    const position = await this.scrollBehavior(to, from, savedPosition)

    if (position === false) {
      // Don't scroll
      return
    }

    if (position) {
      if ('el' in position && typeof position.el === 'string') {
        // Scroll to element
        const element = document.getElementById(position.el)
        if (element) {
          element.scrollIntoView(position as ScrollIntoViewOptions)
        }
      } else {
        // Scroll to position
        window.scrollTo(position as ScrollToOptions)
      }
    }
  }

  async push(path: string): Promise<void> {
    const navigationId = ++this.navigationCounter
    this.isNavigating = true

    try {
      window.location.hash = '#' + path
      // Wait for next tick to ensure hash change is processed
      await new Promise(resolve => setTimeout(resolve, 0))

      // Only proceed if this is still the latest navigation
      if (navigationId === this.navigationCounter) {
        await this.resolveCurrentRoute()
      }
    } finally {
      if (navigationId === this.navigationCounter) {
        this.isNavigating = false
      }
    }
  }

  async replace(path: string): Promise<void> {
    const navigationId = ++this.navigationCounter
    this.isNavigating = true

    try {
      const currentPath = window.location.pathname + window.location.search
      window.history.replaceState(null, '', currentPath + '#' + path)

      if (navigationId === this.navigationCounter) {
        await this.resolveCurrentRoute()
      }
    } finally {
      if (navigationId === this.navigationCounter) {
        this.isNavigating = false
      }
    }
  }

  back(): void {
    window.history.back()
  }

  forward(): void {
    window.history.forward()
  }

  isActive(path: string): boolean {
    return this.state.path === path || this.state.path.startsWith(path + '/')
  }

  setScrollBehavior(behavior: ScrollBehavior): void {
    this.scrollBehavior = behavior
  }

  addGuard(guard: NavigationGuard): void {
    this.guardList.push(guard)
  }

  private slugifyPath(path: string): string {
    return path
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  destroy(): void {
    window.removeEventListener('hashchange', this.handleHashChange)
    window.removeEventListener('popstate', this.handlePopState)
  }
}

// Singleton instance
let routerInstance: RouterCore | null = null

export function createRouter(routes: RouteRecord[]): RouterCore {
  if (routerInstance) {
    routerInstance.destroy()
  }
  routerInstance = new RouterCore(routes)
  return routerInstance
}

export function getRouter(): RouterCore | null {
  return routerInstance
}

// Export type
export type { RouterCore }
