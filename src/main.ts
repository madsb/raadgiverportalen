// INFO: Bemærk ændringer til denne fil, vil ikke blive inkluderet i den endelige applikation
// Virksomhedsguiden importerer samme stylesheet fra design systemet
import 'dkfds/dist/css/dkfds.min.css';
import { createApp } from 'vue';
import App from './App.vue';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import makeServer from './server';

// Mock server for standalone mode
const useMockServer = true;
if (useMockServer) {
  makeServer();
}

const app = createApp(App);

/**
 * Sørg for specifik Pinia fejl ikke vises ved hvert tekstnøgle opslag.
 * Bemærk konsollen vil dog stadig vise denne fejl når den transpileret version af applikationen afvikles, men kun i build mode *
 */
app.config.warnHandler = (msg, _, trace) => {
  if (!['injection "Symbol(pinia)" not found.'].some(warning => msg.includes(warning))) {
    // eslint-disable-next-line no-console
    console.warn('[Vue warn]: '.concat(msg).concat(trace));
  }
};

app.mount('#app');
