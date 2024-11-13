<!-- Eksempel på komponent, som bruger axios til API kald og kan håndtere load state og fejl -->
<template>
  <div>
    <h2 class="mt-5">Eksternt API:</h2>
    <p class="mb-5">Eksempel på at kalde eksternt API og vise spinner ved asynkrone operationer</p>

    <div v-if="!isVirksomhedsguiden" class="alert alert-warning">
      <div class="alert-body">
        <p class="alert-heading">Mock API server</p>
        <div class="alert-text">
          <p>
            Eftersom der bruges API mock bibliotek (https://miragejs.com/) når leverandør-applikation afvikles udenfor Virksomhedsguiden, så mockes
            alle eksterne requests også. Derfor skal eksterne domæner eksplicit angives i mock serveren hvis de <u>ikke</u> skal mockes. Domæner
            tilføjes i <strong>src/server.js</strong> Alternativ kan man helt deaktivere API mock serveren i <strong>src/main.ts</strong> hvis man
            ikke har brug for Storage API.
          </p>
        </div>
      </div>
    </div>

    <div>
      <div v-if="pending" class="spinner" aria-label="Henter indhold" />
      <pre v-else class="my-5">{{ data }}</pre>
      <div v-if="error" class="alert alert-error my-5" role="alert" aria-atomic="true">
        <div class="alert-body">
          <p class="alert-heading">Fejl</p>
          <p class="alert-text">API request failed</p>
        </div>
      </div>
      <button class="button button-primary" @click="callAPI()">API kald</button>
      <button class="button button-primary" @click="callAPI(true)">API kald med fejl</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';

const isVirksomhedsguiden = inject('isVirksomhedsguiden');
const data = ref(null);
const error = ref(false);
const pending = ref(false);

onMounted(() => {
  callAPI();
});

async function callAPI(fail = false) {
  data.value = null;
  pending.value = true;
  error.value = false;
  const id = fail ? 'NaN' : 1;

  try {
    // Der anvendes native fetch fremfor axios her, da mock serveren (miragejs) ikke virker med passthrough + axios (https://github.com/miragejs/miragejs/issues/1006)
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      data.value = await response.json();
    }
  } catch (e) {
    // vil sørge for fejlbeskeder vises i DOM
    error.value = true;
  } finally {
    // vil sørge for loading spinner skjules
    pending.value = false;
  }
}
</script>
