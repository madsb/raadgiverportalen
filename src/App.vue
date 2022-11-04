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
          @piwikNaesteEvent="onPiwikNaesteEvent"
          @piwikForrigeEvent="onPiwikForrigeEvent"
          @piwikDownloadEvent="onPiwikDownloadEvent"
          @piwikCTAClickEvent="onPiwikCTAClickEvent"
          @piwikFritekstEvent="onPiwikFritekstEvent"
          @requestToken="onRequestToken"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// INFO: Bemærk ændringer til denne fil, vil ikke blive inkluderet i den endelige applikation
import * as DKFDS from 'dkfds';
import Applikation from './components/Applikation.vue';

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
      return !!this.token;
    },
    bruger() {
      return this.token
        ? {
            navn: 'Jens Hansen',
            organisation: 'Demo Nation',
            virksomhedsnavn: 'Business Demo',
            cvr: 12345678,
            entityId: 'eid-CVR:12345678-RID:e4f13c3b-3c5a-459d-90a9-847ab9596157'
          }
        : null;
    }
  },
  mounted() {
    DKFDS.init();
    /**
     * Flag der sørger for initialisering af DKFDS sker inden de resterende Vue komponenter loades.
     * Dette gøres for at undgå dobbelt initialisering af DKFDS komponenter fx. når Accordions loades
     */
    this.loaded = true;
  },
  created() {
    // Simulér bruger er kommet tilbage efter login, og har modtaget en token som prop
    const { hash } = window.location;
    if (hash?.replaceAll('#', '') === HASH_LOGIN_STRING) {
      this.token = DUMMY_TOKEN;
    }
  },
  methods: {
    // Dummy metoder til at teste dataopsamling events. Disse events vil blive håndteret af Virksomhedsguiden.
    onPiwikPageView() {
      // eslint-disable-next-line no-console
      console.log('EVENT: page view');
    },
    onPiwikNaesteEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: naeste', arguments);
    },
    onPiwikForrigeEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: forrige', arguments);
    },
    onPiwikDownloadEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: download', arguments);
    },
    onPiwikCTAClickEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: CTA', arguments);
    },
    onPiwikFritekstEvent() {
      // eslint-disable-next-line no-console
      console.log('EVENT: fritekst ', arguments);
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
