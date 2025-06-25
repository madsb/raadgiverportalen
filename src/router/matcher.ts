import { RouteRecord, RouteMatch } from './types'

export class RouteMatcher {
  private routes: RouteRecord[]

  constructor(routes: RouteRecord[]) {
    this.routes = routes
  }

  match(path: string): RouteMatch[] {
    const normalizedPath = this.normalizePath(path)
    const segments = this.tokenize(normalizedPath)
    const matches: RouteMatch[] = []

    for (const route of this.routes) {
      const result = this.matchRoute(route, segments, normalizedPath)
      if (result.length > 0) {
        return result
      }
    }

    // If no routes matched, check for wildcard
    const wildcardRoute = this.routes.find(r => r.path === '*')
    if (wildcardRoute) {
      return [
        {
          route: wildcardRoute,
          params: {},
          path: normalizedPath
        }
      ]
    }

    return matches
  }

  private matchRoute(route: RouteRecord, segments: string[], fullPath: string, parentParams: Record<string, string> = {}): RouteMatch[] {
    const routeSegments = this.tokenize(route.path)
    const params = { ...parentParams }

    // Check if segments match
    if (!this.segmentsMatch(routeSegments, segments, params)) {
      return []
    }

    const matches: RouteMatch[] = [
      {
        route,
        params: { ...params },
        path: fullPath
      }
    ]

    // If exact match and no children, return
    if (routeSegments.length === segments.length && !route.children) {
      return matches
    }

    // Check children if segments continue
    if (route.children && segments.length > routeSegments.length) {
      const remainingSegments = segments.slice(routeSegments.length)

      for (const child of route.children) {
        const childMatches = this.matchRoute(child, remainingSegments, fullPath, params)

        if (childMatches.length > 0) {
          return [...matches, ...childMatches]
        }
      }
    }

    // Return match only if exact length match or has wildcard
    if (routeSegments.length === segments.length || route.path === '*') {
      return matches
    }

    return []
  }

  private segmentsMatch(routeSegments: string[], pathSegments: string[], params: Record<string, string>): boolean {
    if (routeSegments.length > pathSegments.length) {
      return false
    }

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i]
      const pathSegment = pathSegments[i]

      if (routeSegment.startsWith(':')) {
        // Dynamic segment
        const paramName = routeSegment.slice(1)
        params[paramName] = decodeURIComponent(pathSegment)
      } else if (routeSegment !== pathSegment) {
        // Static segment mismatch
        return false
      }
    }

    return true
  }

  private tokenize(path: string): string[] {
    return path.split('/').filter(segment => segment.length > 0)
  }

  private normalizePath(path: string): string {
    // Remove hash if present
    path = path.replace(/^#/, '')

    // Ensure path starts with /
    if (!path.startsWith('/')) {
      path = '/' + path
    }

    // Remove trailing slash except for root
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1)
    }

    return path
  }
}
