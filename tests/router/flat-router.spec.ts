// Test for flat router structure
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { router, navigate, resolve, initRouter } from '../../src/router/router-core'

// Mock window.location
const mockLocation = {
  hash: '',
  pathname: '/',
  search: ''
}

describe('Flat Router Structure', () => {
  beforeEach(() => {
    // Reset router state
    router.path = ''
    router.params = {}
    router.chain = []
    router.component = null

    // Reset hash
    mockLocation.hash = ''

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
      configurable: true
    })

    // Initialize router
    initRouter()
  })

  it('should match flat routes without infinite loops', async () => {
    const testRoutes = [
      { hash: '#/kunder', expectedParams: {} },
      { hash: '#/kunder/42', expectedParams: { id: '42' } },
      { hash: '#/kunder/42/projekter', expectedParams: { id: '42' } },
      { hash: '#/kunder/42/projekter/123', expectedParams: { id: '42', projektId: '123' } },
      { hash: '#/kunder/42/tilbud', expectedParams: { id: '42' } }
    ]

    for (const { hash, expectedParams } of testRoutes) {
      mockLocation.hash = hash
      await resolve()

      expect(router.chain).toHaveLength(1) // Flat structure = single component
      expect(router.params).toEqual(expectedParams)
      expect(router.path).toBe(hash.slice(1) || '/')
    }
  })

  it('should not create recursive component chains', async () => {
    mockLocation.hash = '#/kunder/42'
    await resolve()

    // Should have exactly one component in the chain
    expect(router.chain).toHaveLength(1)
    expect(router.chain[0].record.path).toBe('/kunder/:id')

    // Component should be marked as raw (non-reactive)
    const component = router.chain[0].record.component
    expect(component).toBeTruthy()
    // In Vue 3, markRaw adds a __v_skip property
    expect(component.__v_skip).toBe(true)
  })
})
