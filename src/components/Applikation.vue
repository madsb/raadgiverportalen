<!-- Indgangspunktet for leverandør-applikationen. Direkte og indirekte importering af komponenter og stylesheets i denne klasse vil blive inkluderet i den endelig applikation. -->
<template>
  <VgDesignWrapper>
    <div class="row">
      <div class="col-12">
        <h1>Rådgiverportalen</h1>

        <!-- Main content will be managed via hash-based navigation -->
        <div id="app-content">
          <!-- Content will be rendered here based on hash -->
        </div>

        <div class="demo-link-container">
          <a href="#demo" class="demo-link"> Se demo komponenter </a>
        </div>
      </div>
    </div>
  </VgDesignWrapper>
</template>

<script setup lang="ts">
import { DataEvents, piwikService } from '@erst-vg/piwik-event-wrapper'
import { DataEmits } from '@erst-vg/piwik-event-wrapper/lib/models/emits.model'
import { VgDesignWrapper } from '@erst-vg/vg-design-wrapper'
import { PropType, inject, onMounted, provide } from 'vue'
import { Bruger } from '../models/bruger.model'
import { Variant } from '../models/variant.model'

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
})

// Provide all props for demo components to access
provide('isVirksomhedsguiden', props.isVirksomhedsguiden)
provide('token', props.token)
provide('bruger', props.bruger)
provide('isLoggedIn', props.isLoggedIn)
provide('variant', props.variant)
provide('tekstnoegleBundtId', props.tekstnoegleBundtId)
provide('tekstnoegleCvrNumre', props.tekstnoegleCvrNumre)
provide('hashBeforeLogin', props.hashBeforeLogin)
provide('ydelsesId', props.ydelsesId)
provide('applikationId', props.applikationId)

// Provide requestToken function for demo components
provide('requestToken', () => {
  emit('requestToken')
})

const siteIkoner = 'siteIkoner'
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
})

const emit = defineEmits([
  DataEvents.PAGE_VIEW,
  DataEvents.DOWNLOAD_EVENT,
  DataEvents.CTA_CLICK_EVENT,
  DataEvents.START_EVENT,
  DataEvents.SLUT_EVENT,
  'requestToken'
])

/**
 * Initialiserer Piwik service med entry-point komponentens emits, så der kan emittes ud af leverandør-applikationen
 * uanset fra hvilket komponent niveau Piwik service kaldes
 */
piwikService.init(emit as DataEmits)

onMounted(() => {
  /*
    Hvis Virksomhedsguiden tillader at leverandør-applikationen kan bede om en token uden brugeren aktivt gør noget.
    Prop er først true når bruger har bekræftet leverandør-applikationen og heller ikke ønsker at se login modal
  */
  if (props.allowPassivToken) {
    emit('requestToken')
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/components/_applikation.scss';

.demo-link-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
}

.demo-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
    border-color: #bbb;
  }
}
</style>
