<template>
  <div>
    <h2 class="mt-5">Parameter-variant:</h2>
    <p>
      Eksempel på brug af variant parameter, der specificeres som Vue property fra Virksomhedsguiden. For denne applikation angives varianten bare i
      <strong>src/App.vue</strong> for at have en effekt.
    </p>
    <pre>{{ variant }}</pre>
    <div class="py-5 align-text-center" :style="{ 'background-color': variantColor }">
      Baggrundsfarven bestemmes af parameter varianten ({{ variantName }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Variant } from '../models/variant.model';

const props = defineProps({
  variant: {
    type: Object as () => Variant,
    default: null,
    required: false
  }
});

const variantColor = computed(() => props.variant?.parametre[0].parametervaerdi ?? '#C0C0C0');

const variantName = computed(() => props.variant?.navn ?? 'default');
</script>
