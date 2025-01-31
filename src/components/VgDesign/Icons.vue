<template>
  <div class="mt-8">
    <h3>Ikoner</h3>
    <p>DKFDS: <a href="https://designsystem.dk/styleguide/ikoner/" target="_blank">Ikoner</a></p>
    <p>Eksempel komponent: <strong>src/components/VgDesign/Icons.vue</strong></p>
    <p>NPM komponent: <strong>node_modules/@erst-vg/vg-design-wrapper/src/components/VgIcon.vue</strong></p>

    <h4>Virksomhedsguide ikoner</h4>
    <p>
      <strong>@erst-vg/vg-design-wrapper</strong> udstiller alle de ikoner, som bruges på Virksomhedsguiden. For at bruge et eller flere af disse
      ikoner, angives navn på ikon som <i>icon</i> prop. Listen af tilgængelige ikoner findes i
      <strong>node_modules/@erst-vg/vg-design-wrapper/src/assets/icons</strong>
    </p>
    <VgIcon icon="bell" class="mr-3" />
    <p>Eksempel viser et ikon fra Virksomhedsguiden</p>

    <h4>Egne ikoner</h4>
    <p>
      Hvis der er behov for at anvende SVG ikoner, som ikke er tilgængelige i Virksomhedsguiden, så er det muligt anvende egne ikoner. Se
      <strong>src/components/Applikation.vue</strong> hvordan ikonet <i>xla-share</i> bliver tilføjet som ikon.
    </p>
    <VgIcon icon="xla-share" class="mr-3" />
    <p>Eksempel viser et custom ikon</p>
  </div>
</template>

<script setup lang="ts">
import { VgIcon } from '@erst-vg/vg-design-wrapper';
</script>
