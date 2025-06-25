import { Component } from 'vue'

export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  [key: string]: any
}

export interface RouteLocation {
  path: string
  params: Record<string, string>
  meta: RouteMeta
}

export type NavigationGuard = (to: RouteLocation, from: RouteLocation | null) => boolean | Promise<boolean>

export interface RouteRecord {
  path: string
  component: Component
  children?: RouteRecord[]
  beforeEnter?: NavigationGuard
  meta?: RouteMeta
}

export interface RouteMatch {
  route: RouteRecord
  params: Record<string, string>
  path: string
}

export interface RouterState {
  path: string
  params: Record<string, string>
  matches: RouteMatch[]
  meta: RouteMeta
}

export interface ScrollPosition {
  top: number
  left: number
}

export type ScrollBehavior = (
  to: RouteLocation,
  from: RouteLocation | null,
  savedPosition: ScrollPosition | null
) => ScrollPosition | false | null | Promise<ScrollPosition | false | null>

export interface Router {
  state: RouterState
  push: (path: string) => Promise<void>
  replace: (path: string) => Promise<void>
  back: () => void
  forward: () => void
  isActive: (path: string) => boolean
  setScrollBehavior: (behavior: ScrollBehavior) => void
}
