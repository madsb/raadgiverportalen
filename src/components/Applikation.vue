<!-- Indgangspunktet for leverandør-applikationen. Direkte og indirekte importering af komponenter og stylesheets i denne klasse vil blive inkluderet i den endelig applikation. -->
<template>
  <VgDesignWrapper>
    <div class="row">
      <div class="col-12 col-md-10">
        <h1>Demo leverandør-applikation</h1>
        <p class="my-5">
          Denne applikation kan bruges som skabelon til udvikling af leverandør-applikation, der kan integreres i
          <a href="https://www.virksomhedsguiden.dk" target="_blank">Virksomhedsguiden</a> som Vue 3 komponenter. Siden indeholder desuden teknisk
          information om forskellige aspekter af en leverandør-applikation. Se <strong>README.md</strong> for instruktioner. Der henvises desuden til
          den tekniske vejledning og design-vejledningen, som er blevet udleveret, for yderligere information.
        </p>
        <div>
          Applikation ID: <code>{{ applikationId }}</code>
        </div>
        <div>
          Ydelse ID: <code>{{ ydelsesId }}</code>
        </div>
      </div>
      <div class="col-12">
        <hr />
        <ErrorBoundary error-title="Error Boundary Demo fejl" error-message="Der opstod en fejl i error boundary demo komponenten.">
          <ErrorBoundaryDemo />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Fejl i VG Mode komponent" error-message="Der opstod en fejl i VG Mode komponenten. Prøv at genindlæse siden.">
          <VgMode :is-virksomhedsguiden="isVirksomhedsguiden" />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Fejl i Design komponent" error-message="Der opstod en fejl i Design komponenten.">
          <Design />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary
          error-title="Login fejl"
          error-message="Der opstod en fejl i login systemet. Prøv at genindlæse siden eller kontakt support."
          @error="handleLoginError"
        >
          <LoginDemo
            :token="token"
            :bruger="bruger"
            :is-logged-in="isLoggedIn"
            :hash-before-login="hashBeforeLogin"
            @requestToken="$emit('requestToken')"
          />
        </ErrorBoundary>
        <hr />
        <AsyncErrorBoundary
          error-title="Storage API fejl"
          error-message="Der opstod en fejl ved kommunikation med storage systemet. Dine data er muligvis ikke blevet gemt."
          :max-retries="2"
          :retry-delay="2000"
          show-reset
          @error="handleStorageError"
          @maxRetriesReached="handleStorageMaxRetries"
        >
          <StorageAPI
            :tekstnoegle-bundt-id="tekstnoegleBundtId"
            :tekstnoegle-cvr-nummre="tekstnoegleCvrNumre"
            :token="token"
            :bruger="bruger"
            @requestToken="$emit('requestToken')"
          />
        </AsyncErrorBoundary>
        <hr />
        <ErrorBoundary
          error-title="Navigation fejl"
          error-message="Der opstod en fejl i navigationen. Prøv at genindlæse siden."
          @error="handleNavigationError"
        >
          <Navigation :step="step" :max-step="maxStep" @decreaseStep="decreaseStep" @increaseStep="increaseStep" />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Login komponent fejl" error-message="Der opstod en fejl i login komponenten.">
          <LoginComponent />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Ekstern API fejl" error-message="Der opstod en fejl i ekstern API komponenten.">
          <ExternalAPI />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Parameter variant fejl" error-message="Der opstod en fejl ved håndtering af parameter varianter.">
          <ParameterVariant :variant="variant" />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Responsive komponent fejl" error-message="Der opstod en fejl i responsive komponenten.">
          <Responsive />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Styling fejl" error-message="Der opstod en fejl i styling komponenten.">
          <ScopedStyling />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="State komponent fejl" error-message="Der opstod en fejl i state management komponenten.">
          <StateComponent />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary
          error-title="Data indsamling fejl"
          error-message="Der opstod en fejl ved data indsamling. Dine data er muligvis ikke blevet gemt korrekt."
          @error="handleDataCollectorError"
        >
          <DataCollector />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Download fejl" error-message="Der opstod en fejl i download komponenten.">
          <DownloadComponent :is-virksomhedsguiden="isVirksomhedsguiden" />
        </ErrorBoundary>
        <hr />
        <ErrorBoundary error-title="Router demo fejl" error-message="Der opstod en fejl i router demo komponenten.">
          <RouterDemo />
        </ErrorBoundary>
      </div>
    </div>
  </VgDesignWrapper>
</template>

<script setup lang="ts">
import { DataEvents, piwikService } from '@erst-vg/piwik-event-wrapper';
import { DataEmits } from '@erst-vg/piwik-event-wrapper/lib/models/emits.model';
import { VgDesignWrapper } from '@erst-vg/vg-design-wrapper';
import { PropType, inject, onMounted, onUnmounted, provide, ref } from 'vue';
import { Bruger } from '../models/bruger.model';
import { Variant } from '../models/variant.model';
import * as slugUtil from '../utils/slug.util';
import AsyncErrorBoundary from './AsyncErrorBoundary.vue';
import DataCollector from './DataCollector.vue';
import Design from './Design.vue';
import DownloadComponent from './DownloadComponent.vue';
import ErrorBoundary from './ErrorBoundary.vue';
import ErrorBoundaryDemo from './ErrorBoundaryDemo.vue';
import ExternalAPI from './ExternalAPI.vue';
import LoginComponent from './LoginComponent.vue';
import LoginDemo from './LoginDemo.vue';
import Navigation from './Navigation.vue';
import ParameterVariant from './ParameterVariant.vue';
import Responsive from './Responsive.vue';
import ScopedStyling from './ScopedStyling.vue';
import StateComponent from './StateComponent.vue';
import StorageAPI from './StorageAPI.vue';
import VgMode from './VgMode.vue';
import RouterDemo from './RouterDemo.vue';

const props = defineProps({
  variant: {
    type: Object as PropType<Variant>,
    default: null,
    required: false
  },
  token: {
    type: String,
    default: '',
    required: false
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
    required: false
  },
  bruger: {
    type: Object as PropType<Bruger | null>,
    default: null,
    required: false
  },
  isVirksomhedsguiden: {
    type: Boolean,
    default: true
  },
  tekstnoegleBundtId: {
    type: String,
    default: ''
  },
  tekstnoegleCvrNumre: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  allowPassivToken: {
    type: Boolean,
    default: false
  },
  hashBeforeLogin: {
    type: String,
    default: ''
  },
  ydelsesId: {
    type: String,
    required: true
  },
  applikationId: {
    type: String,
    required: true
  }
});

provide('isVirksomhedsguiden', props.isVirksomhedsguiden);

const siteIkoner = 'siteIkoner';
// Gør ikoner tilgængelig for leverandør-applikationen
provide(siteIkoner, {
  // sørger for site ikoner fra Virksomhedsguiden stadig er tilgængelig
  ...(inject(siteIkoner) as { [key: string]: string }),
  // sørger for lokale ikoner kan bruges i VgIcon. Lokale ikoner skal have prefix, så de ikke konflikter med Virksomhedsguide ikoner
  'xla-share': `<symbol viewBox="0 0 24 24">
        <path
          d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7 0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92 0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
          fill="currentColor"
        />
      </symbol>`
});

const emit = defineEmits([
  DataEvents.PAGE_VIEW,
  DataEvents.DOWNLOAD_EVENT,
  DataEvents.CTA_CLICK_EVENT,
  DataEvents.START_EVENT,
  DataEvents.SLUT_EVENT,
  'requestToken'
]);

const step = ref(1);
const maxStep = ref(3);

/**
 * Initialiserer Piwik service med entry-point komponentens emits, så der kan emittes ud af leverandør-applikationen
 * uanset fra hvilket komponent niveau Piwik service kaldes
 */
piwikService.init(emit as DataEmits);

onMounted(() => {
  /*
    Hvis Virksomhedsguiden tillader at leverandør-applikationen kan bede om en token uden brugeren aktivt gør noget.
    Prop er først true når bruger har bekræftet leverandør-applikationen og heller ikke ønsker at se login modal
  */
  if (props.allowPassivToken) {
    emit('requestToken');
  }

  // Removed hash setup to avoid conflicts with router
  // Router now handles all hash-based navigation
});

onUnmounted(() => {
  // Removed hashchange listener - router handles this now
});

// Legacy hash navigation - commented out in favor of router
// const decreaseStep = () => {
//   if (window.location.hash !== '#1') {
//     const { hash } = window.location;
//     const previousHash = String(parseInt(removeHash(hash), 10) - 1);
//     window.location.hash = slugUtil.slugify(previousHash);
//   }
// };

// const increaseStep = () => {
//   if (window.location.hash !== '#' + maxStep.value) {
//     const { hash } = window.location;
//     const previousHash = String(parseInt(removeHash(hash), 10) + 1);
//     window.location.hash = slugUtil.slugify(previousHash);
//   }
// };

// const updateStepFromHash = () => {
//   const { hash } = window.location;
//   step.value = hash ? parseInt(removeHash(hash), 10) : 1;
//   piwikService.emitPageViewEvent();
// };

// const removeHash = (hash: string) => hash.replaceAll('#', '');

// Stub functions to prevent errors in components that use them
const decreaseStep = () => {
  console.warn('decreaseStep is deprecated - use router navigation instead');
};

const increaseStep = () => {
  console.warn('increaseStep is deprecated - use router navigation instead');
};

// Error handlers for critical components
const handleLoginError = (error: Error) => {
  console.error('raadgiverportalen: Critical login error occurred', error);
  // Could emit to parent or trigger additional error reporting here
};

const handleStorageError = (error: Error, retryCount: number) => {
  console.error(`raadgiverportalen: Critical storage API error occurred (retry ${retryCount})`, error);
  // Storage errors are critical as they affect data persistence
};

const handleStorageMaxRetries = (error: Error) => {
  console.error('raadgiverportalen: Storage API max retries reached - critical system failure', error);
  // Could trigger fallback storage mechanism or alert user to save work elsewhere
};

const handleNavigationError = (error: Error) => {
  console.error('raadgiverportalen: Navigation error occurred', error);
  // Reset navigation state if needed
  step.value = 1;
  window.location.hash = '1';
};

const handleDataCollectorError = (error: Error) => {
  console.error('raadgiverportalen: Data collector error occurred', error);
  // Data collection errors are critical for compliance
};
</script>

<style lang="scss" scoped>
@import '../styles/components/_applikation.scss';
</style>
