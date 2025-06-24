// Route definitions and types
export interface RouteRecord {
  path: string;
  component?: any;
  children?: RouteRecord[];
  beforeEnter?: GuardFn;
  meta?: Record<string, any>;
}

export type GuardFn = (to: ResolvedRoute, from: ResolvedRoute | null) => boolean | Promise<boolean>;

export interface ResolvedRoute {
  path: string;
  params: Record<string, string>;
  meta: Record<string, any>;
}

// Import view components (static imports as per requirements)
import HomePage from '../views/HomePage.vue';
import KunderPage from '../views/KunderPage.vue';
import KundeDetailPage from '../views/KundeDetailPage.vue';
import ProjekterPage from '../views/ProjekterPage.vue';
import ProjektDetailPage from '../views/ProjektDetailPage.vue';
import TilbudPage from '../views/TilbudPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

// Mock auth check for guards (replace with real API call)
const checkAuth = async (): Promise<boolean> => {
  // TODO: Replace with actual auth check
  return true;
};

// Route guard functions
const requireAuth: GuardFn = async (_to, _from) => {
  return await checkAuth();
};

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
  {
    path: '*',
    component: NotFoundPage,
    meta: { title: 'Side ikke fundet' }
  }
];

export default routes;
