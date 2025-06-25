// Router unit tests
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { router, navigate, resolve, globalBeforeEach, initRouter } from '../../src/router/router-core'
import type { GuardFn, ResolvedRoute } from '../../src/router/routes'

// Mock window.location
const mockLocation = {
  hash: '',
  pathname: '/',
  search: ''
}

describe('Router', () => {
  beforeEach(() => {
    // Reset router state
    router.path = ''
    router.params = {}
    router.chain = []
    router.component = null

    // Clear guards
    globalBeforeEach.length = 0

    // Reset hash
    mockLocation.hash = ''

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
      configurable: true
    })

    // Mock history.replaceState
    window.history.replaceState = vi.fn()

    // Initialize router for tests
    initRouter()
  })

  afterEach(() => {
    // Clean up event listeners
    window.removeEventListener('hashchange', resolve)
  })

  describe('Tokenization', () => {
    it('should handle various path formats', async () => {
      const testCases = [
        { hash: '#/', expectedPath: '/' },
        { hash: '#/kunder', expectedPath: '/kunder' },
        { hash: '#/kunder/123', expectedPath: '/kunder/123' },
        { hash: '#/kunder/123/projekter', expectedPath: '/kunder/123/projekter' },
        { hash: '', expectedPath: '/' } // No hash defaults to root
      ]

      for (const { hash, expectedPath } of testCases) {
        mockLocation.hash = hash
        await resolve()
        expect(router.path).toBe(expectedPath)
      }
    })
  })

  describe('Matcher', () => {
    it('should match root path', async () => {
      mockLocation.hash = '#/'
      await resolve()

      expect(router.path).toBe('/')
      expect(router.chain).toHaveLength(1)
      expect(router.chain[0].record.path).toBe('/')
      expect(router.params).toEqual({})
    })

    it('should match dynamic segments', async () => {
      mockLocation.hash = '#/kunder/42'
      await resolve()

      expect(router.path).toBe('/kunder/42')
      expect(router.params.id).toBe('42')
      expect(router.chain).toHaveLength(1) // Flat structure - only KundeDetailPage
    })

    it('should match deeply nested routes', async () => {
      mockLocation.hash = '#/kunder/12/projekter/9'
      await resolve()

      expect(router.path).toBe('/kunder/12/projekter/9')
      expect(router.params.id).toBe('12')
      expect(router.params.projektId).toBe('9')
      expect(router.chain).toHaveLength(1) // Flat structure - only ProjektDetailPage
    })

    it('should match wildcard route for unknown paths', async () => {
      mockLocation.hash = '#/unknown/path'
      await resolve()

      expect(router.path).toBe('/unknown/path')
      expect(router.chain).toHaveLength(1)
      expect(router.chain[0].record.path).toBe('*')
    })

    it('should preserve params through nested routes', async () => {
      mockLocation.hash = '#/kunder/123/tilbud'
      await resolve()

      expect(router.params.id).toBe('123')
      expect(router.chain).toHaveLength(1) // Flat structure - only TilbudPage
    })
  })

  describe('Guards', () => {
    it('should allow navigation when guard returns true', async () => {
      const guard: GuardFn = vi.fn().mockResolvedValue(true)
      globalBeforeEach.push(guard)

      mockLocation.hash = '#/kunder'
      await resolve()

      expect(guard).toHaveBeenCalled()
      expect(router.path).toBe('/kunder')
    })

    it('should prevent navigation when guard returns false', async () => {
      const guard: GuardFn = vi.fn().mockResolvedValue(false)
      globalBeforeEach.push(guard)

      // First navigate to home
      mockLocation.hash = '#/'
      await resolve()

      // Then try to navigate to protected route
      mockLocation.hash = '#/kunder'
      await resolve()

      expect(guard).toHaveBeenCalled()
      expect(router.path).toBe('/') // Should stay on previous route
      expect(window.history.replaceState).toHaveBeenCalledWith(null, '', '#/')
    })

    it('should execute route-specific guards', async () => {
      // The /kunder route has a beforeEnter guard
      mockLocation.hash = '#/kunder'
      await resolve()

      // Should have navigated successfully (our mock auth returns true)
      expect(router.path).toBe('/kunder')
    })

    it('should pass correct to/from parameters to guards', async () => {
      let capturedTo: ResolvedRoute | null = null
      let capturedFrom: ResolvedRoute | null = null

      const guard: GuardFn = vi.fn().mockImplementation((to, from) => {
        capturedTo = to
        capturedFrom = from
        return true
      })

      globalBeforeEach.push(guard)

      // First navigation
      mockLocation.hash = '#/'
      await resolve()

      // Second navigation
      mockLocation.hash = '#/kunder/123'
      await resolve()

      expect(capturedTo).toEqual({
        path: '/kunder/123',
        params: { id: '123' },
        meta: { title: 'Kunde detaljer', requiresAuth: true }
      })

      expect(capturedFrom).toEqual({
        path: '/',
        params: {},
        meta: { title: 'Forside' }
      })
    })
  })

  describe('Navigation', () => {
    it('should update hash when navigate is called', () => {
      navigate('/kunder/123')
      expect(mockLocation.hash).toBe('/kunder/123')

      navigate('#/kunder/456') // Should handle # prefix
      expect(mockLocation.hash).toBe('/kunder/456')
    })

    it('should emit custom event on route change', async () => {
      const eventHandler = vi.fn()
      window.addEventListener('rgp:route-changed', eventHandler)

      mockLocation.hash = '#/kunder/123'
      await resolve()

      expect(eventHandler).toHaveBeenCalled()
      const event = eventHandler.mock.calls[0][0]
      expect(event.detail).toEqual({
        path: '/kunder/123',
        params: { id: '123' }
      })

      window.removeEventListener('rgp:route-changed', eventHandler)
    })

    it('should handle hashchange events', async () => {
      // Simulate initial load
      mockLocation.hash = '#/'
      await resolve()
      expect(router.path).toBe('/')

      // Simulate user changing hash directly
      mockLocation.hash = '#/kunder'
      window.dispatchEvent(new HashChangeEvent('hashchange'))

      // Wait for async resolve
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(router.path).toBe('/kunder')
    })
  })

  describe('Component resolution', () => {
    it('should set correct component for flat routes', async () => {
      mockLocation.hash = '#/kunder/123/projekter'
      await resolve()

      // Check that we have exactly one component for flat structure
      expect(router.chain).toHaveLength(1)
      expect(router.chain[0].record.path).toBe('/kunder/:id/projekter')
    })
  })
})
