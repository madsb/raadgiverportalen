<template>
  <div>
    <div id="app" class="app-body" tabindex="-1">
      <div class="flexgrow container pt-8 pb-8">
        <Applikation
          :variant="variant"
          @piwikPageView="onPiwikPageView"
          @piwikNaesteEvent="onPiwikNaesteEvent"
          @piwikForrigeEvent="onPiwikForrigeEvent"
          @piwikDownloadEvent="onPiwikDownloadEvent"
          @piwikCTAClickEvent="onPiwikCTAClickEvent"
          @piwikFritekstEvent="onPiwikFritekstEvent"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// INFO: Bemærk ændringer til denne fil, vil ikke blive inkluderet i den endelige applikation
import Applikation from './components/Applikation.vue';
import * as DKFDS from 'dkfds';

export default {
  name: 'App',
  components: {
    Applikation
  },
  data() {
    return {
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
  mounted() {
    DKFDS.init();
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
    }
  }
};
</script>
<style scoped lang="scss">
@import 'styles/_app.scss';
</style>
