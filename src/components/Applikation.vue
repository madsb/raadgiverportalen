<!-- Indgangspunktet for sandkasse-applikationen. Direkte og indirekte importering af komponenter og stylesheets i denne klasse vil blive inkluderet i den endelig applikation. -->
<template>
  <div class="applikation-container">
    <h1>Leverandør-applikation Sandkasse Miljø</h1>
    <div class="my-5">
      Denne applikation kan bruges som skabelon til udvikling af leverandør-applikation, der kan integreres i
      <a href="https://www.virksomhedsguiden.dk" target="_blank">Virksomhedsguiden</a> som Vue 3 komponenter. Siden indeholder desuden teknisk
      information om forskellige aspekter af en leverandør-applikation. Se <strong>README.md</strong> for instruktioner. Der henvises desuden til den
      tekniske vejledning og design-vejledningen, som er blevet udleveret, for yderligere information.
    </div>
    <VgMode :is-virksomhedsguiden="isVirksomhedsguiden" />
    <API />
    <SvgIcons />
    <hr />
    <LoginDemo :token="token" :bruger="bruger" :is-logged-in="isLoggedIn" @requestToken="$emit('requestToken')" />
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
    <Icons />
    <hr />
    <DKFDSComponent />
    <hr />
    <CustomMultiselect />
    <hr />
    <StateComponent />
    <hr />
    <DataCollector />
  </div>
</template>

<!-- Script setup blok for Composition API -->
<script setup lang="ts">
const emit = defineEmits([
  DataEvents.PAGE_VIEW,
  DataEvents.DOWNLOAD_EVENT,
  DataEvents.CTA_CLICK_EVENT,
  DataEvents.START_EVENT,
  DataEvents.SLUT_EVENT
]);
/**
 * Initialiserer Piwik service med entry-point komponentens emits, så der kan emittes ud af leverandør-applikationen
 * uanset fra hvilket komponent niveau Piwik service kaldes fra. Bemærk dette her skal kun gøres for Composition API
 *
 * Se created lifecycle hook for hvordan det håndteres for Options API
 */
piwikService.init(emit);
</script>

<script lang="ts">
import { createPinia } from 'pinia';
import { defineComponent } from 'vue';
import { Bruger } from '../models/bruger.model';
import { Variant } from '../models/variant.model';
import API from './API.vue';
import CustomMultiselect from './CustomMultiselect.vue';
import DataCollector from './DataCollector.vue';
import DKFDSComponent from './DKFDSComponent.vue';
import ExternalAPI from './ExternalAPI.vue';
import Icons from './Icons.vue';
import LoginComponent from './LoginComponent.vue';
import LoginDemo from './LoginDemo.vue';
import Navigation from './Navigation.vue';
import VgMode from './VgMode.vue';
import ParameterVariant from './ParameterVariant.vue';
import Responsive from './Responsive.vue';
import StateComponent from './StateComponent.vue';
import SvgIcons from './SvgIcons.vue';
import * as slugUtil from '../utils/slug.util';
import { DataEvents, piwikService } from '@erst-vg/piwik-event-wrapper';

export default defineComponent({
  name: 'Applikation',
  components: {
    SvgIcons,
    CustomMultiselect,
    StateComponent,
    LoginComponent,
    VgMode,
    LoginDemo,
    Navigation,
    ParameterVariant,
    Responsive,
    Icons,
    DKFDSComponent,
    DataCollector,
    ExternalAPI,
    API
  },
  provide() {
    const pinia = createPinia();
    return {
      pinia
    };
  },
  props: {
    variant: {
      type: Object as () => Variant,
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
      type: Object as () => Bruger,
      default: null,
      required: false
    },
    isVirksomhedsguiden: {
      type: Boolean,
      default: true
    }
  },
  emits: [DataEvents.PAGE_VIEW, DataEvents.DOWNLOAD_EVENT, DataEvents.CTA_CLICK_EVENT, DataEvents.START_EVENT, DataEvents.SLUT_EVENT],
  data() {
    return {
      step: 1,
      maxStep: 3
    };
  },
  created() {
    /**
     * Initialiserer Piwik service med entry-point komponentens emits, så der kan emittes ud af leverandør-applikationen
     * uanset fra hvilket komponent niveau Piwik service kaldes fra. Bemærk dette her skal kun gøres for Options API
     *
     * Se script setup blokken for hvordan det håndteres for Composition API
     */
    piwikService.init(this.$emit);
    window.location.hash = '1';
    window.addEventListener('hashchange', this.updateStepFromHash);
  },
  unmounted() {
    window.removeEventListener('hashchange', this.updateStepFromHash);
  },
  methods: {
    decreaseStep() {
      if (window.location.hash !== '#1') {
        const { hash } = window.location;
        const previousHash = String(parseInt(this.removeHash(hash), 10) - 1);
        window.location.hash = slugUtil.slugify(previousHash);
      }
    },
    increaseStep() {
      if (window.location.hash !== '#' + this.maxStep) {
        const { hash } = window.location;
        const previousHash = String(parseInt(this.removeHash(hash), 10) + 1);
        window.location.hash = slugUtil.slugify(previousHash);
      }
    },
    updateStepFromHash() {
      const { hash } = window.location;
      this.step = hash ? parseInt(this.removeHash(hash), 10) : 1;
      piwikService.emitPageViewEvent();
    },
    removeHash(hash: string) {
      return hash.replaceAll('#', '');
    },
    emitRequestToken() {
      this.$emit('requestToken');
    }
  }
});
</script>
<style lang="scss" scoped>
@import '../styles/components/_applikation.scss';
</style>
