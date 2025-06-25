import { markRaw } from 'vue'
import { RouteRecord } from './types'

// Import all route components statically as required by VG
import HomePage from '../components/HomePage.vue'
import DemoPage from '../components/DemoPage.vue'
import NotFoundPage from '../components/NotFoundPage.vue'

// Define routes with markRaw to prevent reactivity warnings
export const routes: RouteRecord[] = [
  {
    path: '/',
    component: markRaw(HomePage),
    meta: { title: 'Forside' }
  },
  {
    path: '/demo',
    component: markRaw(DemoPage),
    meta: { title: 'Demo Komponenter' }
  },
  {
    path: '*',
    component: markRaw(NotFoundPage),
    meta: { title: 'Side ikke fundet' }
  }
]
