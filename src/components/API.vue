<template>
  <div>
    <h2 class="mt-5">API:</h2>
    <div class="my-5">
      Komponenter skal implementeres i Vue 3. Sandkasse miljøet er implementeret med Options API af historiske årsager, men som man kan se i
      <strong>src/components/CompositionAPI.vue</strong> kan man også bruge Composition API.
    </div>
    <CompositionAPI />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CompositionAPI from './CompositionAPI.vue';

export default defineComponent({
  name: 'API',
  components: { CompositionAPI }
});
</script>
