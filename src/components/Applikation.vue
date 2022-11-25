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
    <DataCollector @download="emitDownloadEvent" @cTAClick="emitCTAClickEvent" @fritekst="emitFritekstEvent" />
  </div>
</template>
<script lang="ts">
import * as DataEvent from '@erst-vg/piwik-event-wrapper';
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
import ParameterVariant from './ParameterVariant.vue';
import Responsive from './Responsive.vue';
import StateComponent from './StateComponent.vue';
import SvgIcons from './SvgIcons.vue';
import * as slugUtil from '../utils/slug.util';

export default defineComponent({
  name: 'Applikation',
  components: {
    SvgIcons,
    CustomMultiselect,
    StateComponent,
    LoginComponent,
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
    }
  },
  emits: ['requestToken', 'piwikPageView', 'piwikNaesteEvent', 'piwikForrigeEvent', 'piwikDownloadEvent', 'piwikCTAClickEvent', 'piwikFritekstEvent'],
  data() {
    return {
      step: 1,
      maxStep: 3
    };
  },
  created() {
    window.location.hash = '1';
    window.addEventListener('hashchange', this.updateStepFromHash);
  },
  unmounted() {
    window.removeEventListener('hashchange', this.updateStepFromHash);
  },
  methods: {
    decreaseStep() {
      if (window.location.hash !== '#1') {
        const { hash, pathname } = window.location;
        const previousHash = String(parseInt(this.removeHash(hash), 10) - 1);
        const previousUrl = pathname + '#' + previousHash;
        DataEvent.emitForrigeEvent(this, previousUrl);
        window.location.hash = slugUtil.slugify(previousHash);
      }
    },
    increaseStep() {
      if (window.location.hash !== '#' + this.maxStep) {
        const { hash, pathname } = window.location;
        const previousHash = String(parseInt(this.removeHash(hash), 10) + 1);
        const nextUrl = pathname + '#' + previousHash;
        DataEvent.emitNaesteEvent(this, nextUrl);
        window.location.hash = slugUtil.slugify(previousHash);
      }
    },
    updateStepFromHash() {
      const { hash } = window.location;
      this.step = hash ? parseInt(this.removeHash(hash), 10) : 1;
      DataEvent.emitPageViewEvent(this);
    },
    removeHash(hash: string) {
      return hash.replaceAll('#', '');
    },
    // Data opsamlingsmetoder
    emitDownloadEvent() {
      const [file, data] = arguments;
      DataEvent.emitDownloadEvent(this, file, data);
    },
    emitCTAClickEvent() {
      const [type, data] = arguments;
      DataEvent.emitCTAClickEvent(this, type, data);
    },
    emitFritekstEvent() {
      const data = {
        step: this.step,
        maxStep: this.maxStep
      };
      DataEvent.emitFritekstEvent(this, 'eventType', JSON.stringify(data));
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
