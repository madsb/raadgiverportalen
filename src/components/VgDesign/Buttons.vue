<template>
  <div class="mt-8">
    <h3>Knapper</h3>
    <p>DKFDS: <a href="https://designsystem.dk/komponenter/knapper/" target="_blank">Knapper</a></p>
    <p>Eksempel komponent: <strong>src/components/VgDesign/Buttons.vue</strong></p>
    <p>NPM komponent: <strong>node_modules/@erst-vg/vg-design-wrapper/src/components/VgButton.vue</strong></p>
    <div>
      <h4>Primærknap</h4>
      <div class="d-md-flex">
        <button type="button" class="button button-primary">knap</button>
        <button type="button" class="button button-primary disabled">knap</button>
      </div>
      <h4>Sekundærknapper</h4>
      <div class="d-md-flex">
        <button type="button" class="button button-secondary">knap</button>
        <button type="button" class="button button-secondary disabled">knap</button>
      </div>
      <h4>Tertiærknapper</h4>
      <div>Anvendes ikke</div>
      <h4>Link knap</h4>

      <VgButton icon="arrowLeft" class="button-link">Tilbage</VgButton>

      <h4>Knap med ikon</h4>
      <VgButton icon="arrowLeft" class="button-primary">Knap med ikon</VgButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VgButton } from '@erst-vg/vg-design-wrapper'
</script>
