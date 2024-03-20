<template>
  <div>
    <div id="app" class="app-body" tabindex="-1">
      <div class="flexgrow container pt-8 pb-8">
        <Applikation
          v-if="loaded"
          :variant="variant"
          :is-logged-in="isLoggedIn"
          :token="token"
          :bruger="bruger"
          :is-virksomhedsguiden="false"
          :tekstnoegle-bundt-id="TEKSTNOEGLE_BUNDT_ID"
          :tekstnoegle-cvr-nummer="TEKSTNOEGLE_CVR_NUMMER"
          @piwikPageView="onPiwikPageView"
          @piwikDownloadEvent="onPiwikDownloadEvent"
          @piwikCTAClickEvent="onPiwikCTAClickEvent"
          @piwikStartEvent="handlePiwikStartEvent"
          @piwikSlutEvent="handlePiwikSlutEvent"
          @requestToken="onRequestToken"
        />
      </div>
      <div
        id="modal-rumlerille"
        class="fds-modal"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-rumlerille"
        data-modal-forced-action
      >
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Du er nu ved at logge automatisk ind</h2>
          </div>
          <div class="modal-body">
            <p>
              Denne modal vises første gang en bruger forsøger at starte en leverandør-applikation, som kræver login. Dens formål er at gøre brugeren
              opmærksom på, at leverandør-applikationen kan opsamle data om brugeren, og derfor først kan startes når brugeren accepterer dette.
            </p>
            <p>
              Bemærk, leverandør-applikationen skal ikke selv implementere denne modal, da visning og dens logik styres af Virksomhedsguiden udenfor
              leverandør-applikationen.
            </p>
          </div>
          <div class="modal-footer">
            <button id="button-modal-accept" class="button button-primary" @click="accept">Fortsæt</button>
            <button id="button-modal-cancel" class="button button-secondary" @click="cancelTokenRequest">Fortryd</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// INFO: Bemærk ændringer til denne fil, vil ikke blive inkluderet i den endelige applikation
import * as DKFDS from 'dkfds';
import { Ref, computed, onMounted, ref } from 'vue';
import Applikation from './components/Applikation.vue';
import { Role } from './enums/role.enum';
import { TokenStatus } from './enums/tokenStatus.enum';
import { TEKSTNOEGLE_BUNDT_ID, TEKSTNOEGLE_CVR_NUMMER } from './main';
import { DEMO_ACCESS_TOKEN } from './utils/jwt-util';

// Hash værdi som VG sætter når login flow initieres, og når leverandør-applikationen vises igen efter successfuldt login
const HASH_LOGIN_STRING = 'login_for_app';

const loaded = ref(false);
const token = ref('');
const modal: Ref<DKFDSModal | undefined> = ref();
const variant = ref({
  navn: 'blå',
  aktiv: true,
  parametre: [
    {
      parameternavn: 'farve',
      parametervaerdi: 'skyBlue'
    }
  ]
});

const isLoggedIn = computed(() => !!token.value && !isTokenRequestCancelled.value);

const isTokenRequestCancelled = computed(() => token.value === TokenStatus.CANCELLED);

const bruger = computed(() =>
  !isLoggedIn.value
    ? null
    : {
        navn: 'Jens Hansen',
        organisation: 'Demo Nation',
        virksomhedsnavn: 'Business Demo',
        cvr: TEKSTNOEGLE_CVR_NUMMER,
        entityId: 'eid-CVR:12345678-RID:e4f13c3b-3c5a-459d-90a9-847ab9596157',
        roller: [Role.ERF_LEVERANDOER]
      }
);

onMounted(() => {
  DKFDS.init();
  modal.value = new DKFDS.Modal(document.querySelector('#app #modal-rumlerille'));
  /**
   * Flag der sørger for initialisering af DKFDS sker inden de resterende Vue komponenter loades.
   * Dette gøres for at undgå dobbelt initialisering af DKFDS komponenter fx. når Accordions loades
   */
  loaded.value = true;

  // Simulér bruger er kommet tilbage efter login, og derfor skal vise rumlerille modal
  const { hash } = window.location;
  if (hash?.replaceAll('#', '') === HASH_LOGIN_STRING) {
    modal.value!.show();
  }
});

// Brugeren har accepteret rumlerille modal og leverandør-applikation modtager en JWT token
const accept = () => {
  token.value = DEMO_ACCESS_TOKEN;
  modal.value!.hide();
};

// Brugeren har ikke accepteret rumlerille modal, så leverandør-applikation modtager en annulleret token
const cancelTokenRequest = () => {
  token.value = TokenStatus.CANCELLED;
  modal.value!.hide();
};

// Dummy metoder til at teste dataopsamling events. Disse events vil blive håndteret af Virksomhedsguiden.
const onPiwikPageView = () => {
  // eslint-disable-next-line no-console
  console.log('EVENT: page view');
};

function onPiwikDownloadEvent() {
  // eslint-disable-next-line no-console
  console.log('EVENT: download', arguments);
}

function onPiwikCTAClickEvent() {
  // eslint-disable-next-line no-console
  console.log('EVENT: CTA', arguments);
}

function handlePiwikStartEvent() {
  // eslint-disable-next-line no-console
  console.log('EVENT: Start', arguments);
}

function handlePiwikSlutEvent() {
  // eslint-disable-next-line no-console
  console.log('EVENT: Slut', arguments);
}

const onRequestToken = () => {
  // eslint-disable-next-line no-console
  console.log('Request token er blevet kaldt');
  // Simulér login flow hvis bruger ikke er logget ind når der anmodes efter token
  if (!isLoggedIn.value) {
    const { location } = window;
    location.hash = HASH_LOGIN_STRING;
    location.reload();
  }
};
</script>

<style scoped lang="scss">
@import 'styles/_app.scss';
</style>
