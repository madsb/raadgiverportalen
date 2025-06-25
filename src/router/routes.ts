// Route definitions and types
export interface RouteRecord {
  path: string
  component?: any
  children?: RouteRecord[]
  beforeEnter?: GuardFn
  meta?: Record<string, any>
}

export type GuardFn = (to: ResolvedRoute, from: ResolvedRoute | null) => boolean | Promise<boolean>

export interface ResolvedRoute {
  path: string
  params: Record<string, string>
  meta: Record<string, any>
}

// Import view components (static imports as per requirements)
import HomePage from '../views/HomePage.vue'
import KunderPage from '../views/KunderPage.vue'
import KundeDetailPage from '../views/KundeDetailPage.vue'
import ProjekterPage from '../views/ProjekterPage.vue'
import ProjektDetailPage from '../views/ProjektDetailPage.vue'
import TilbudPage from '../views/TilbudPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

// Demo view imports
import DemoHome from '../demo/views/DemoHome.vue'
import VgModeDemo from '../demo/views/VgModeDemo.vue'
import DesignDemo from '../demo/views/DesignDemo.vue'
import AuthDemo from '../demo/views/AuthDemo.vue'
import StorageDemo from '../demo/views/StorageDemo.vue'
import NavigationDemo from '../demo/views/NavigationDemo.vue'
import ComponentsDemo from '../demo/views/ComponentsDemo.vue'
import ApiDemo from '../demo/views/ApiDemo.vue'
import ErrorHandlingDemo from '../demo/views/ErrorHandlingDemo.vue'
import RouterDemoView from '../demo/views/RouterDemoView.vue'

// Mock auth check for guards (replace with real API call)
const checkAuth = async (): Promise<boolean> =>
  // TODO: Replace with actual auth check
  true
// Route guard functions
const requireAuth: GuardFn = async (_to, _from) => await checkAuth()

// Route definitions - using a flatter structure to avoid infinite loops
const routes: RouteRecord[] = [
  {
    path: '/',
    component: HomePage,
    meta: { title: 'Forside' }
  },
  {
    path: '/kunder',
    component: KunderPage,
    beforeEnter: requireAuth,
    meta: { title: 'Kunder', requiresAuth: true }
  },
  {
    path: '/kunder/:id',
    component: KundeDetailPage,
    beforeEnter: requireAuth,
    meta: { title: 'Kunde detaljer', requiresAuth: true }
  },
  {
    path: '/kunder/:id/projekter',
    component: ProjekterPage,
    beforeEnter: requireAuth,
    meta: { title: 'Projekter', requiresAuth: true }
  },
  {
    path: '/kunder/:id/projekter/:projektId',
    component: ProjektDetailPage,
    beforeEnter: requireAuth,
    meta: { title: 'Projekt detaljer', requiresAuth: true }
  },
  {
    path: '/kunder/:id/tilbud',
    component: TilbudPage,
    beforeEnter: requireAuth,
    meta: { title: 'Tilbud', requiresAuth: true }
  },
  // Demo routes
  {
    path: '/demo',
    component: DemoHome,
    meta: { title: 'Demo Oversigt' }
  },
  {
    path: '/demo/vg-mode',
    component: VgModeDemo,
    meta: { title: 'VG Mode Demo' }
  },
  {
    path: '/demo/design',
    component: DesignDemo,
    meta: { title: 'Design System Demo' }
  },
  {
    path: '/demo/auth',
    component: AuthDemo,
    meta: { title: 'Authentication Demo' }
  },
  {
    path: '/demo/storage',
    component: StorageDemo,
    meta: { title: 'Storage API Demo' }
  },
  {
    path: '/demo/navigation',
    component: NavigationDemo,
    meta: { title: 'Navigation Demo' }
  },
  {
    path: '/demo/components',
    component: ComponentsDemo,
    meta: { title: 'Komponenter Demo' }
  },
  {
    path: '/demo/api',
    component: ApiDemo,
    meta: { title: 'API & Data Demo' }
  },
  {
    path: '/demo/error-handling',
    component: ErrorHandlingDemo,
    meta: { title: 'Error Handling Demo' }
  },
  {
    path: '/demo/router',
    component: RouterDemoView,
    meta: { title: 'Router Demo' }
  },
  {
    path: '*',
    component: NotFoundPage,
    meta: { title: 'Side ikke fundet' }
  }
]

export default routes
