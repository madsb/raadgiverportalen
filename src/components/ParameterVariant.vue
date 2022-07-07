<template>
  <div>
    <h2 class="mt-5">Parameter-variant:</h2>
    <div>
      Eksempel på brug af variant parameter, som udenfor sandkassen specificeres som Vue property fra Virksomhedsguiden. I denne sandkasse angives
      varianten i
      <strong>src/App.vue</strong> for at have en effekt.
    </div>
    <pre>{{ variant }}</pre>
    <div class="py-5 align-text-center" :style="{ 'background-color': variantColor }">
      Baggrundsfarven bestemmes af parameter varianten ({{ variantName }})
    </div>
  </div>
</template>

<script lang="ts">
import { Variant } from 'src/models/variant.model';
export default {
  name: 'ParameterVariant',
  props: {
    variant: {
      type: Object as () => Variant,
      default: null,
      required: false
    }
  },
  computed: {
    variantColor: function () {
      return this.variant?.parametre[0].parametervaerdi ?? '#C0C0C0';
    },
    variantName: function () {
      return this.variant?.navn ?? 'default';
    }
  },
  methods: {}
};
</script>
