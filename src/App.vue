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
          @piwikPageView="onPiwikPageView"
          @piwikDownloadEvent="onPiwikDownloadEvent"
          @piwikCTAClickEvent="onPiwikCTAClickEvent"
          @piwikStartEvent="handlePiwikStartEvent"
          @piwikSlutEvent="handlePiwikSlutEvent"
          @requestToken="onRequestToken"
        />
      </div>
      <div
        class="fds-modal"
        id="modal-rumlerille"
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
            <button class="button button-primary" id="button-modal-accept" @click="accept">Fortsæt</button
            ><button class="button button-secondary" id="button-modal-cancel" @click="cancelTokenRequest">Fortryd</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// INFO: Bemærk ændringer til denne fil, vil ikke blive inkluderet i den endelige applikation
import * as DKFDS from 'dkfds';
import Applikation from './components/Applikation.vue';
import { TokenStatus } from './enums/tokenStatus.enum';
// Hash værdi som VG sætter når login flow initieres, og når leverandør-applikationen vises igen efter successfuldt login
const HASH_LOGIN_STRING = 'login_for_app';
// Gyldig, men udløbet access token som kun bør bruges til demo formål
const DUMMY_TOKEN =
  'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBQUlBQi1WUUg0Zko3MHVsb2YyVzNDZEhqVGsiLCJleHAiOjE2NTY1OTQ0NTQsImlhdCI6MTY1NjU5MDg1Nn0.faTsRzum7csejJF6KLh8Zh23h3voQj9t6_LiT8K_VlstGk4lh6UnapH1qgxpNJHo9hO4laeFk9GUIHMYEKNjElmHm81XMrliuZgSgZ947AY3sY3WLBbbZfp6Hhk1U8uwq3-r3MzxebgoaLD8UYDtXXiH0k6G52HrgYO1yXqqXxzxI8ChpwUf2XIbl-9hlIX8WYtllS2SveljXHjxb5B_2co41mbZiwq-_1fpoTyhaj7S6jRlxDLQ4brMPuLVVmibJ9eqcwIuKW8-pUs1Uym84fR5wE9KwOJjzzWNbY-_1JkEl-Ubn0JUeTXQY7gmqMy7YracrLla7GayMcfpJogQlg';

export default {
  name: 'App',
  components: {
    Applikation
  },
  data() {
    return {
      loaded: false,
      token: '',
      modal: null,
      variant: {
        navn: 'blå',
        aktiv: true,
        parametre: [
          {
            parameternavn: 'farve',
            parametervaerdi: 'skyBlue'
          }
        ]
      }
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.token && !this.isTokenRequestCancelled;
    },
    isTokenRequestCancelled() {
      return this.token === TokenStatus.CANCELLED;
    },
    bruger() {
      return this.isLoggedIn
        ? {
            navn: 'Jens Hansen',
            organisation: 'Demo Nation',
            virksomhedsnavn: 'Business Demo',
            cvr: 12345678,
            entityId: 'eid-CVR:12345678-RID:e4f13c3b-3c5a-459d-90a9-847ab9596157',
            roller: ['ERF_LEVERANDOER']
          }
        : null;
    }
  },
  mounted() {
    DKFDS.init();
    this.modal = new DKFDS.Modal(document.getElementById('modal-rumlerille'));
    /**
     * Flag der sørger for initialisering af DKFDS sker inden de resterende Vue komponenter loades.
     * Dette gøres for at undgå dobbelt initialisering af DKFDS komponenter fx. når Accordions loades
     */
    this.loaded = true;

    // Simulér bruger er kommet tilbage efter login, og derfor skal vise rumlerille modal
    const { hash } = window.location;
    if (hash?.replaceAll('#', '') === HASH_LOGIN_STRING) {
      this.modal.show();
    }
  },
  created() {},
  methods: {
    // Brugeren har accepteret rumlerille modal og leverandør-applikation modtager en JWT token
    accept() {
      this.token = DUMMY_TOKEN;
      this.modal.hide();
    },
    // Brugeren har ikke accepteret rumlerille modal, så leverandør-applikation modtager en annulleret token
    cancelTokenRequest() {
      this.token = TokenStatus.CANCELLED;
      this.modal.hide();
    },
    // Dummy metoder til at teste dataopsamling events. Disse events vil blive håndteret af Virksomhedsguiden.
    onPiwikPageView() {
      // eslint-disable-next-line no-console
      console.log('EVENT: page view');
    },
    onPiwikDownloadEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: download', arguments);
    },
    onPiwikCTAClickEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: CTA', arguments);
    },
    handlePiwikStartEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: Start', arguments);
    },
    handlePiwikSlutEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: Slut', arguments);
    },
    onRequestToken() {
      // eslint-disable-next-line no-console
      console.log('Request token er blevet kaldt');
      // Simulér login flow hvis bruger ikke er logget ind når der anmodes efter token
      if (!this.isLoggedIn) {
        const { location } = window;
        location.hash = HASH_LOGIN_STRING;
        location.reload();
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import 'styles/_app.scss';
</style>
