# Hash-Based Router for Virksomhedsguiden Integration

## Overview

This is a custom hash-based router implementation designed specifically for integration with Virksomhedsguiden (VG). The router provides Vue Router-like functionality while adhering to VG's strict constraints:

- **No `history.pushState`** - Uses only hash-based navigation
- **No external router libraries** - Self-contained implementation
- **Single bundle build** - All components statically imported
- **Deep linking support** - Full URL preservation and browser navigation
- **Nested layouts** - Recursive RouterView components
- **Route guards** - Global and per-route navigation guards
- **Dynamic segments** - Parameter extraction from URLs
- **Scroll restoration** - Preserves scroll position between navigations

## Architecture

### Core Components

1. **`router-core.ts`** - Main router logic
   - Route matching algorithm
   - Guard execution pipeline
   - State management
   - Navigation APIs

2. **`routes.ts`** - Route definitions
   - Static component imports
   - Route configuration
   - Guard definitions

3. **`RouterView.vue`** - Recursive view renderer
   - Depth-based component resolution
   - Nested layout support

4. **`RouterLink.vue`** - Navigation component
   - Hash-based links
   - Prevents default browser behavior

### Route Matching Algorithm

The router uses a depth-first tokenization approach:

```typescript
// Path: /kunder/123/projekter
// Tokens: ['kunder', '123', 'projekter']
// Matches: 
//   1. /kunder -> KunderPage
//   2. /kunder/:id -> KundeDetailPage (params.id = '123')
//   3. /kunder/:id/projekter -> ProjekterPage
```

## Usage

### Basic Setup

```typescript
// Import router components
import { RouterView, RouterLink } from '@/router'

// In your component template
<template>
  <div>
    <RouterLink to="/kunder">Go to Customers</RouterLink>
    <RouterView />
  </div>
</template>
```

### Route Definition

```typescript
// src/router/routes.ts
const routes: RouteRecord[] = [
  {
    path: '/',
    component: HomePage,
    meta: { title: 'Home' }
  },
  {
    path: '/kunder',
    component: KunderPage,
    beforeEnter: requireAuth,
    children: [
      {
        path: '/kunder/:id',
        component: KundeDetailPage,
        children: [
          {
            path: '/kunder/:id/projekter',
            component: ProjekterPage
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: NotFoundPage
  }
]
```

### Navigation

```typescript
import { navigate, router } from '@/router'

// Navigate programmatically
navigate('/kunder/123')

// Access current route state
console.log(router.path)      // '/kunder/123'
console.log(router.params)     // { id: '123' }

// Navigation utilities
import { back, forward, replace, isActive } from '@/router'

back()                         // Browser back
forward()                      // Browser forward
replace('/new-path')           // Replace without history
isActive('/kunder')            // Check if path is active
```

### Scroll Behavior

Configure scroll behavior using the Vue Router pattern:

```typescript
import { setScrollBehavior } from '@/router'

// Default behavior - scroll to top for new routes, restore for back/forward
setScrollBehavior((to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  return { top: 0, left: 0 }
})

// Keep current scroll position
setScrollBehavior(() => false)

// Conditional scrolling
setScrollBehavior((to, from, savedPosition) => {
  // Don't scroll between similar routes
  if (to.path.split('/')[1] === from?.path.split('/')[1]) {
    return false
  }
  return { top: 0 }
})

// Scroll to anchor
setScrollBehavior((to, from, savedPosition) => {
  if (to.path.includes('#')) {
    return { el: to.path.split('#')[1] }
  }
  return { top: 0 }
})

// Smooth scrolling
setScrollBehavior((to, from, savedPosition) => {
  return { 
    top: 0, 
    behavior: 'smooth' 
  }
})

// Async scroll behavior
setScrollBehavior(async (to, from, savedPosition) => {
  // Wait for content to load
  await new Promise(resolve => setTimeout(resolve, 100))
  return { top: 0 }
})
```

### Route Guards

```typescript
// Global guard
import { globalBeforeEach } from '@/router'

globalBeforeEach.push(async (to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return false // Cancel navigation
  }
  return true
})

// Per-route guard
const route: RouteRecord = {
  path: '/admin',
  component: AdminPage,
  beforeEnter: async (to, from) => {
    const hasPermission = await checkAdminPermission()
    return hasPermission
  }
}
```

### Nested Layouts

```vue
<!-- ParentComponent.vue -->
<template>
  <div class="layout">
    <nav>Parent Navigation</nav>
    <RouterView /> <!-- Child components render here -->
  </div>
</template>

<!-- ChildComponent.vue -->
<template>
  <div class="child">
    <h2>Child Content</h2>
    <RouterView /> <!-- Grandchild components render here -->
  </div>
</template>
```

## VG Integration Requirements

### Constraints

1. **No `window` modifications** except:
   - `location.hash`
   - Scroll APIs
   - Event listeners (must be cleaned up)

2. **Hash-only navigation**
   - All routes use hash fragments
   - Browser back/forward must work within app

3. **Static imports only**
   - No dynamic imports
   - Single bundle output

### Event Emission

The router emits custom events for VG integration:

```typescript
// Listen for route changes
window.addEventListener('rgp:route-changed', (event) => {
  console.log('Route changed:', event.detail)
  // { path: '/kunder/123', params: { id: '123' } }
})
```

## Testing

Run the test suite:

```bash
npm test tests/router/router.spec.ts
```

Tests cover:
- Route matching and tokenization
- Dynamic parameter extraction
- Nested route resolution
- Guard execution and cancellation
- Browser navigation simulation
- Component resolution

## Performance Considerations

1. **Route matching** - O(n) where n is number of routes
2. **Scroll restoration** - Uses Map for O(1) lookups
3. **Component resolution** - Direct references, no dynamic imports
4. **Memory usage** - Minimal, only stores current route state

## Migration from Vue Router

Key differences:
- No named routes
- No route meta inheritance (use last matched route's meta)
- Guards must return boolean (not redirect objects)
- No beforeRouteEnter/Leave/Update hooks
- No transition support built-in

## Troubleshooting

### Route not matching
- Check route order (specific before generic)
- Verify path starts with `/`
- Ensure wildcard route is last

### Guard not executing
- Guards must be async functions
- Return explicit boolean values
- Check guard registration order

### Scroll position issues
- Ensure unique paths for scroll saving
- Check for conflicting scroll manipulations
- Use `requestAnimationFrame` for timing