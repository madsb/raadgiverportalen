<template>
  <div>
    <h2 class="mt-5">Responsive</h2>
    Man kan bruge hjælpe klasserne i <strong>src/styles/mixins/_mediaquery-helpers.scss</strong> til at håndtere responsive design. Filen
    <strong>src/styles/components/_applikation.scss</strong> viser et eksempel på dette.
    <div class="responsive-class mt-5">Baggrundsfarven på dette element ændrer farve når skærmstørrelsen skifter mellem small, medium og large</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Responsive'
});
</script>
<style lang="scss" scoped>
@import '../styles/components/_responsive.scss';
</style>
