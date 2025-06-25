// Tests for scroll behavior
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { router, navigate, resolve, setScrollBehavior, initRouter, clearScrollPositions } from '../../src/router/router-core'
import type { ScrollBehaviorHandler } from '../../src/router/router-core'

// Mock window properties
const mockScrollTo = vi.fn()
const mockLocation = {
  hash: '',
  pathname: '/',
  search: ''
}

describe('Scroll Behavior', () => {
  beforeEach(() => {
    // Reset router state
    router.path = ''
    router.params = {}
    router.chain = []
    router.component = null

    // Reset hash
    mockLocation.hash = ''

    // Mock window methods
    window.scrollTo = mockScrollTo
    mockScrollTo.mockClear()

    // Mock requestAnimationFrame to run immediately
    vi.stubGlobal('requestAnimationFrame', (cb: Function) => {
      cb()
      return 0
    })

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
      configurable: true
    })

    Object.defineProperty(window, 'pageYOffset', {
      value: 100,
      writable: true,
      configurable: true
    })

    Object.defineProperty(window, 'pageXOffset', {
      value: 0,
      writable: true,
      configurable: true
    })

    // Initialize router
    initRouter()

    // Clear scroll positions
    clearScrollPositions()

    // Reset to default scroll behavior
    setScrollBehavior((to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }
      return { top: 0, left: 0 }
    })
  })

  it('should scroll to top by default for new routes', async () => {
    mockLocation.hash = '#/kunder'
    await resolve()

    // Wait for requestAnimationFrame
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockScrollTo).toHaveBeenCalledWith({
      left: 0,
      top: 0,
      behavior: 'auto'
    })
  })

  it('should keep position when scroll behavior returns false', async () => {
    // First navigate somewhere
    mockLocation.hash = '#/'
    await resolve()
    mockScrollTo.mockClear()

    // Now set the behavior that returns false
    setScrollBehavior(() => false)

    mockLocation.hash = '#/kunder'
    await resolve()

    expect(mockScrollTo).not.toHaveBeenCalled()
  })

  it('should restore saved position on back navigation', async () => {
    // Navigate to first route
    mockLocation.hash = '#/'
    await resolve()
    mockScrollTo.mockClear()

    // Set the scroll position that will be saved
    Object.defineProperty(window, 'pageYOffset', {
      value: 200,
      writable: true,
      configurable: true
    })

    // Navigate to second route (should save position of 200)
    mockLocation.hash = '#/kunder'
    await resolve()
    mockScrollTo.mockClear()

    // Navigate to third route
    mockLocation.hash = '#/kunder/42'
    await resolve()
    mockScrollTo.mockClear()

    // Navigate back to second route (should restore position)
    mockLocation.hash = '#/kunder'
    await resolve()

    // Should restore saved position
    expect(mockScrollTo).toHaveBeenCalledWith({
      left: 0,
      top: 200, // The saved position
      behavior: 'auto'
    })
  })

  it('should support conditional scroll behavior', async () => {
    // Start fresh
    mockLocation.hash = '#/'
    await resolve()
    mockScrollTo.mockClear()

    // Reset scroll position
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true,
      configurable: true
    })

    const conditionalBehavior: ScrollBehaviorHandler = (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      // Don't scroll between similar routes
      const toBase = to.path.split('/')[1]
      const fromBase = from?.path.split('/')[1]

      if (toBase === fromBase) {
        return false
      }

      return { top: 0 }
    }

    setScrollBehavior(conditionalBehavior)

    // Navigate to /kunder
    mockLocation.hash = '#/kunder'
    await resolve()
    mockScrollTo.mockClear()

    // Navigate to /kunder/42 (same base route)
    mockLocation.hash = '#/kunder/42'
    await resolve()

    // Should not scroll
    expect(mockScrollTo).not.toHaveBeenCalled()

    // Navigate to different base route
    mockLocation.hash = '#/'
    await resolve()

    // Should scroll to top
    expect(mockScrollTo).toHaveBeenLastCalledWith({
      left: 0,
      top: 0,
      behavior: 'auto'
    })
  })

  it('should support smooth scrolling', async () => {
    setScrollBehavior(() => ({ top: 0, behavior: 'smooth' }))

    mockLocation.hash = '#/kunder'
    await resolve()

    // Wait for requestAnimationFrame
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockScrollTo).toHaveBeenCalledWith({
      left: 0,
      top: 0,
      behavior: 'smooth'
    })
  })
})
