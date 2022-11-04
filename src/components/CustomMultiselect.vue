<!-- Eksempel på komponent, som bruger vue-multiselect med scoped styling -->
<template>
  <div>
    <h2 class="mt-5">Scoped styling:</h2>
    <div>
      Det er vigtigt alt styling i leverandør-applikationen ikke påvirker Virksomhedsguiden eller andre leverandør-applikationer. Derfor skal alle
      &lt;style&gt; tags bruge <strong>scoped</strong> attributten. Dette gælder naturligvis også stylesheets der importeres fra NPM moduler.
    </div>
    <div class="custom-multiselect">
      <multiselect v-model="value" :options="options" class="mt-5" placeholder="Vælg et land"></multiselect>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import multiselect from 'vue-multiselect';

export default defineComponent({
  name: 'CustomMultiselect',
  components: { multiselect },
  data() {
    return {
      value: null,
      options: ['Danmark', 'Sverige', 'Norge']
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'vue-multiselect/dist/vue-multiselect.css';
</style>
