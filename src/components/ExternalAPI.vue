<!-- Eksempel på komponent, som bruger axios til API kald og kan håndtere load state og fejl -->
<template>
  <div>
    <h2 class="mt-5">Eksternt API:</h2>
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
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ExternalAPI',
  data() {
    return {
      response: {},
      error: false,
      pending: false
    };
  },
  mounted() {
    this.callAPI();
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
    }
  }
});
</script>
