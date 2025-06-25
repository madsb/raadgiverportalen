import { markRaw } from 'vue'
import { RouteRecord } from './types'

// Import all route components statically as required by VG
import HomePage from '../components/HomePage.vue'
import NotFoundPage from '../components/NotFoundPage.vue'

// Demo layout and pages
import DemoLayout from '../components/DemoLayout.vue'
import DemoOverview from '../components/DemoOverview.vue'
import StateDemo from '../components/demos/StateDemo.vue'
import StateDetails from '../components/demos/StateDetails.vue'
import DesignSystemDemo from '../components/demos/DesignSystemDemo.vue'
import AuthDemo from '../components/demos/AuthDemo.vue'
import StorageDemo from '../components/demos/StorageDemo.vue'
import ErrorHandlingDemo from '../components/demos/ErrorHandlingDemo.vue'
import VgModeDemo from '../components/demos/VgModeDemo.vue'
import ComponentsDemo from '../components/demos/ComponentsDemo.vue'
import ApiDemo from '../components/demos/ApiDemo.vue'

// Additional demo imports
import NavigationDemo from '../demo/components/Navigation.vue'
import ExternalAPIDemo from '../demo/components/ExternalAPI.vue'
import ResponsiveDemo from '../demo/components/Responsive.vue'
import DataCollectionDemo from '../demo/components/DataCollector.vue'

// Define routes with markRaw to prevent reactivity warnings
export const routes: RouteRecord[] = [
  {
    path: '/',
    component: markRaw(HomePage),
    meta: { title: 'Forside' }
  },
  {
    path: '/demo',
    component: markRaw(DemoLayout),
    meta: { title: 'Demo' },
    children: [
      {
        path: '',
        component: markRaw(DemoOverview),
        meta: { title: 'Demo Oversigt' }
      },
      {
        path: 'vg-mode',
        component: markRaw(VgModeDemo),
        meta: { title: 'VG Mode' }
      },
      {
        path: 'state',
        component: markRaw(StateDemo),
        meta: { title: 'State Management' },
        children: [
          {
            path: 'details',
            component: markRaw(StateDetails),
            meta: { title: 'State Detaljer' }
          }
        ]
      },
      {
        path: 'design',
        component: markRaw(DesignSystemDemo),
        meta: { title: 'Design System' }
      },
      {
        path: 'auth',
        component: markRaw(AuthDemo),
        meta: { title: 'Autentificering' }
      },
      {
        path: 'storage',
        component: markRaw(StorageDemo),
        meta: { title: 'Storage API' }
      },
      {
        path: 'error-handling',
        component: markRaw(ErrorHandlingDemo),
        meta: { title: 'Fejlhåndtering' }
      },
      {
        path: 'navigation',
        component: markRaw(NavigationDemo),
        meta: { title: 'Navigation' }
      },
      {
        path: 'components',
        component: markRaw(ComponentsDemo),
        meta: { title: 'Komponenter' }
      },
      {
        path: 'api',
        component: markRaw(ApiDemo),
        meta: { title: 'API & Data' }
      },
      {
        path: 'external-api',
        component: markRaw(ExternalAPIDemo),
        meta: { title: "Eksterne API'er" }
      },
      {
        path: 'responsive',
        component: markRaw(ResponsiveDemo),
        meta: { title: 'Responsivt Design' }
      },
      {
        path: 'data-collection',
        component: markRaw(DataCollectionDemo),
        meta: { title: 'Dataopsamling' }
      }
    ]
  },
  {
    path: '*',
    component: markRaw(NotFoundPage),
    meta: { title: 'Side ikke fundet' }
  }
]
