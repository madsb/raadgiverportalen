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
        <VgMode :is-virksomhedsguiden="isVirksomhedsguiden" />
        <hr />
        <Design />
        <hr />
        <LoginDemo
          :token="token"
          :bruger="bruger"
          :is-logged-in="isLoggedIn"
          :hash-before-login="hashBeforeLogin"
          @requestToken="$emit('requestToken')"
        />
        <hr />
        <StorageAPI
          :tekstnoegle-bundt-id="tekstnoegleBundtId"
          :tekstnoegle-cvr-nummre="tekstnoegleCvrNumre"
          :token="token"
          :bruger="bruger"
          @requestToken="$emit('requestToken')"
        />
        <hr />
        <Navigation :step="step" :max-step="maxStep" @decreaseStep="decreaseStep" @increaseStep="increaseStep" />
        <hr />
        <LoginComponent />
        <hr />
        <ExternalAPI />
        <hr />
        <ParameterVariant :variant="variant" />
        <hr />
        <Responsive />
        <hr />
        <ScopedStyling />
        <hr />
        <StateComponent />
        <hr />
        <DataCollector />
        <hr />
        <DownloadComponent :is-virksomhedsguiden="isVirksomhedsguiden" />
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
import DataCollector from './DataCollector.vue';
import Design from './Design.vue';
import DownloadComponent from './DownloadComponent.vue';
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
});

onUnmounted(() => {
  window.removeEventListener('hashchange', updateStepFromHash);
});

const decreaseStep = () => {
  if (window.location.hash !== '#1') {
    const { hash } = window.location;
    const previousHash = String(parseInt(removeHash(hash), 10) - 1);
    window.location.hash = slugUtil.slugify(previousHash);
  }
};

const increaseStep = () => {
  if (window.location.hash !== '#' + maxStep.value) {
    const { hash } = window.location;
    const previousHash = String(parseInt(removeHash(hash), 10) + 1);
    window.location.hash = slugUtil.slugify(previousHash);
  }
};

const updateStepFromHash = () => {
  const { hash } = window.location;
  step.value = hash ? parseInt(removeHash(hash), 10) : 1;
  piwikService.emitPageViewEvent();
};

const removeHash = (hash: string) => hash.replaceAll('#', '');

window.location.hash = '1';
window.addEventListener('hashchange', updateStepFromHash);
</script>

<style lang="scss" scoped>
@import '../styles/components/_applikation.scss';
</style>
