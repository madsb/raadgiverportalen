<!-- Eksempel på komponent, som bruger vue-multiselect med scoped styling -->
<template>
  <div>
    <h3>Scoped styling:</h3>
    <div>
      Det er vigtigt alt styling i leverandør-applikationen ikke påvirker Virksomhedsguiden eller andre leverandør-applikationer. Derfor skal alle
      &lt;style&gt; tags bruge <strong>scoped</strong> attributten. Der findes NPM moduler, der ikke fungerer korrekt med scoped som fx.
      <i>vue-multiselect</i>. Ved at anvende Vues deep selector
      <strong><a href="https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors" target="_blank">>>></a></strong> kan det alligevel lade sig
      gøre at bruge scoped attributten. Se koden i <strong>src/components/CustomMultiselect.vue</strong> for detaljer.
    </div>
    <div class="custom-multiselect">
      <multiselect v-model="value" :options="options" class="mt-5" placeholder="Vælg et land"></multiselect>
    </div>
  </div>
</template>

<script lang="ts">
import Multiselect from 'vue-multiselect';

export default {
  name: 'CustomMultiselect',
  components: { Multiselect },
  data() {
    return {
      value: null,
      options: ['Danmark', 'Sverige', 'Norge']
    };
  }
};
</script>

<style lang="scss" scoped>
>>> .custom-multiselect {
  // importering af vue-multiselect med scoped styling
  @import 'vue-multiselect/dist/vue-multiselect.min';
}
</style>
