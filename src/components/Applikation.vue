<!-- Indgangspunktet for sandkasse-applikationen. Direkte og indirekte importering af komponenter og stylesheets i denne klasse vil blive inkluderet i den endelig applikation. -->
<template>
  <div class="applikation-container">
    <SvgIcons />
    <h3>Navigation</h3>
    <div>
      Eksempel på simpel navigation inde i leverandør-applikationen, hvor visning af trin styres med Vue v-show direktiv. Det er applikationen selv,
      som skal lytte på <strong>hashchange</strong> event, og efterfølgende implementere logikken når # ændres.
    </div>
    <h4>Du er på trin {{ step }}/{{ maxStep }}</h4>
    <form class="my-5">
      <div v-show="step === 1" class="form-group">
        <label class="form-label" for="navn"> Navn </label>
        <input id="navn" class="form-input" required value="Jens" name="navn" type="text" />
      </div>
      <div v-show="step === 2" class="form-group">
        <label class="form-label" for="efternavn"> Efternavn </label>
        <input id="efternavn" class="form-input" required value="Hansen" name="efternavn" type="text" />
      </div>
    </form>
    <div v-show="step === maxStep">
      <div class="alert alert-info my-5">
        <div class="alert-body">
          <p class="alert-heading">Sidste trin</p>
          <p class="alert-text">Du har nået sidste trin i guiden ...</p>
        </div>
      </div>
    </div>
    <div>
      <button class="button button-primary" @click="decreaseStep()">Forrige</button>
      <button class="button button-primary" @click="increaseStep()">Næste</button>
    </div>
    <h3>Parameter variant:</h3>
    <div>
      Eksempel på brug af variant parameter, som udenfor sandkassen specificeres som Vue property fra Virksomhedsguiden. I denne sandkasse angives
      varianten i
      <strong>src/App.vue</strong> for at have en effekt.
    </div>
    <pre>{{ variant }}</pre>
    <div class="py-5 align-text-center" :style="{ 'background-color': variantColor }">
      Baggrundsfarven bestemmes af parameter varianten ({{ variantName }})
    </div>
    <h3>API:</h3>
    <div>
      Eksempel på brug af <a href="https://www.npmjs.com/package/axios">Axios</a> biblioteket til at kalde eksternt API og vise spinner ved asynkrone
      operationer
    </div>
    <div>
      <div v-if="pending" class="spinner" aria-label="Henter indhold" />
      <div v-if="error" class="alert alert-error my-5" role="alert" aria-atomic="true">
        <div class="alert-body">
          <p class="alert-heading">Fejl</p>
          <p class="alert-text">API request failed</p>
        </div>
      </div>
      <pre v-else class="my-5">{{ response }}</pre>
      <button class="button button-primary" @click="callAPI()">API kald</button>
      <button class="button button-primary" @click="callAPI(true)">API kald med fejl</button>
    </div>

    <h3>Responsive</h3>
    Man kan bruge hjælpe klasserne i <strong>src/styles/mixins/_mediaquery-helpers.scss</strong> til at håndtere responsive design. Filen
    <strong>src/styles/components/_applikation.scss</strong> viser et eksempel på dette.
    <div class="responsive-class mt-5">Baggrundsfarven på dette element ændrer farve når skærmstørrelsen skifter mellem small, medium og large</div>

    <h3>Ikoner</h3>
    <div class="mb-5">
      Nedenstående ikoner kommer fra samlingen i
      <strong>src/components/SvgIcons.vue</strong>. Ikon samling skal udvides når der er brug for flere ikoner i applikationen, og det er
      applikationens eget ansvar at tilføje dem. Hvis der brug for at tilføje custom ikoner, så brug venligst prefix <strong>xla-</strong> som ID fx
      "xla-chat" for at undgår kollision med custom ikoner i Virksomhedsguiden.
    </div>
    <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#home"></use></svg>
    <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#attach-file"></use></svg>
    <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#xla-chat"></use></svg>

    <h3>Det Fælles Designsystem (DKFDS)</h3>
    <div>Applikationen skal bygges op vha. <a href="https://designsystem.dk/kode/implementering/" target="_blank">DKFDS</a></div>
    <h4>Layout:</h4>
    <div class="row">
      <div class="col-md-6 col-xs-12">Eksempel på grid: Venstre kolonne</div>
      <div class="col-md-6 col-xs-12">Eksempel på grid: Højre kolonne</div>
    </div>

    <h4>Komponenter</h4>
    <ul id="accordion-element" class="accordion accordion-bordered accordion-multiselectable">
      <li>
        <h2>
          <button class="accordion-button" aria-expanded="false" aria-controls="a1">
            Accordion
            <span class="accordion-icon">
              <span class="icon_text">Information</span>
              <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#info"></use></svg>
            </span>
          </button>
        </h2>
        <div id="a1" aria-hidden="true" class="accordion-content">
          <p>Indholdet af en accordion</p>
        </div>
      </li>
    </ul>

    <h4>Card:</h4>
    <div class="card">
      <div class="card-header">
        <h3 class="header-title">Eksempel på card-komponenten</h3>
      </div>
      <div class="card-text">
        Du kan bruge cards til at gruppere funktionalitet, der adskiller sig fra sidens øvrige indhold. Cards kan placeres i et grid således at de
        står side om side.
      </div>
    </div>
    <CustomMultiselect />
    <StateComponent />
    <h3>Data opsamling</h3>
    Virksomhedsguiden opsamler data vedr. brugerens adfærd. Det er leverandørens ansvar at der også opsamles relevant data i leverandør-applikationen.
    Følgende er en liste af events, som leverandør-applikationen skal kalde i forskellige scenarier.
    <h4>AppDownload</h4>
    <div class="my-5">Dette event bruges ved tryk på en download-knap eller tilsvarende.</div>
    <button class="button button-primary" @click="emitDownloadEvent">Download event</button>
    <h4>AppCTAClick</h4>
    <div class="my-5">
      Dette event bruges ved tryk på andre knapper end ovenstående - fx "åben accordion". Det anbefales som udgangspunkt, at man begrænser brugen af
      denne event-type.
    </div>
    <button class="button button-primary" @click="emitCTAClickEvent">Call to action event</button>
    <h4>AppFritekst</h4>
    <div class="my-5">
      Dette event kan bruges, hvis intet andet event slår til. Det anbefales dog stærkt, at man overvejer om et af ovenstående events kan bruges i
      stedet for.
    </div>
    <button class="button button-primary" @click="emitFritekstEvent">Fritekst event</button>
    <h3>Token</h3>
    <div class="my-5">
      Brugere kan være logget ind på Virksomhedsguiden. Hvis de er det, så kan leverandører anmode om deres token, så leverandørerne kan gemme data om
      brugeren i deres eget system med reference til brugerens entitets ID.
    </div>
    <h4>Logget ind</h4>
    <div class="my-5">Brugeren er {{ isLoggedIn ? '' : 'ikke ' }}logget ind.</div>
    <h4>Anmod om token</h4>
    <div class="my-5">
      Når man anmoder om en token, så åbnes en rumlerille, hvor brugeren skal godkende at applikationen kan få brugerens token, hvis brugeren ikke
      tidligere har givet denne tilladelse.
    </div>
    <button class="button button-primary" @click="emitRequestToken">Anmod</button>
    <h4>Token</h4>
    <div class="my-5">
      Brugeren har følgende token (hvis tom streng, så har applikationen endnu ikke anmodet om token og blevet givet tilladelse): {{ token }}
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import SvgIcons from './SvgIcons.vue';
import CustomMultiselect from './CustomMultiselect.vue';
import StateComponent from './StateComponent.vue';
import * as DKFDS from 'dkfds';
import * as DataEvent from '@erst-vg/piwik-event-wrapper';
import { store } from '../store/';

export interface Variant {
  navn: string;
  aktiv: boolean;
  parametre: {
    parameternavn: string;
    parametervaerdi: string;
  }[];
}

export default {
  name: 'Applikation',
  components: {
    SvgIcons,
    CustomMultiselect,
    StateComponent
  },
  provide() {
    // Gør 'reactiveKey' tilgængelig for underkomponenter (uanset dybde), som kan bruges til at sørge for Vuex getters er reaktive.
    const reactiveKey = {};
    Object.defineProperty(reactiveKey, 'value', {
      enumerable: true,
      get: () => this.reactiveKey
    });
    return {
      reactiveKey
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
    }
  },

  data() {
    return {
      response: {},
      error: false,
      pending: false,
      step: 1,
      maxStep: 3,
      reactiveKey: 1
    };
  },

  computed: {
    variantColor: function () {
      return this.variant?.parametre[0].parametervaerdi ?? '#C0C0C0';
    },
    variantName: function () {
      return this.variant?.navn ?? 'default';
    }
  },
  mounted() {
    this.callAPI();
    new DKFDS.Accordion(document.getElementById('accordion-element'));
  },
  created() {
    /**
     * Lyt på Vuex store ændringer, og opdater reactiveKey hver gang der committes en Vuex mutation. Man kan evt. bruge mutation type
     * til at styre om og hvornår den skal opdateres eller lytte på noget mere specifikt.
     */
    this.$store.subscribe(() => {
      this.reactiveKey++;
    });
    window.location.hash = '1';
    window.addEventListener('hashchange', this.updateStepFromHash);
  },
  destroyed() {
    window.addEventListener('hashchange', this.updateStepFromHash);
  },
  methods: {
    callAPI(fail = false) {
      this.pending = true;
      this.error = false;
      const id = fail ? 'NaN' : 1;
      axios
        .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(({ data }) => {
          // Vil sørge for response data vises i DOM
          this.response = data;
        })
        .catch(() => {
          // vil sørge for fejlbeskeder vises i DOM
          this.error = true;
        })
        .finally(() => {
          // vil sørge for loading spinner skjules
          this.pending = false;
        });
    },
    decreaseStep() {
      if (window.location.hash !== '#1') {
        const { hash, pathname } = window.location;
        const previousHash = String(parseInt(this.removeHash(hash), 10) - 1);
        const previousUrl = pathname + '#' + previousHash;
        DataEvent.emitForrigeEvent(this, previousUrl);
        window.location.hash = previousHash;
      }
    },
    increaseStep() {
      if (window.location.hash !== '#' + this.maxStep) {
        const { hash, pathname } = window.location;
        const previousHash = String(parseInt(this.removeHash(hash), 10) + 1);
        const nextUrl = pathname + '#' + previousHash;
        DataEvent.emitNaesteEvent(this, nextUrl);
        window.location.hash = previousHash;
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
      DataEvent.emitDownloadEvent(this, 'doc.pfd', 'download data');
    },
    emitCTAClickEvent() {
      DataEvent.emitCTAClickEvent(this, 'eventType', 'CTA data');
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
  },
  // Tilføj Vuex store til applikationen
  store
};
</script>
<style lang="scss" scoped>
@import '../styles/components/_applikation.scss';
</style>
