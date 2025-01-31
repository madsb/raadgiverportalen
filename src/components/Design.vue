<template>
  <div id="vgdesign">
    <h2>Design</h2>
    <p>
      Leverandør-applikationens design skal baseres på <a href="https://designsystem.dk/kode/implementering/" target="_blank">DKFDS</a>.
      Virksomhedsguiden er generelt også baseret på DKFDS, men nogle komponenter afviger. Disse design afvigelser skal også gælde
      leverandør-applikationen, så brugeren oplever leverandør-applikationen som en sømløs del af Virksomhedsguiden.
    </p>
    <p>Se den udleveret design-vejledningen for mere information.</p>
    <h3>Design wrapper</h3>
    <p>
      Erhvervsfremmeplatform har udgivet et NPM bibliotek
      <a href="https://www.npmjs.com/package/@erst-vg/vg-design-wrapper" target="_blank">vg-design-wrapper</a>, der har til formål at udstille
      Virksomhedsguidens design, så det nemt kan integreres i en leverandør-applikation.
    </p>
    <p>
      <strong>@erst-vg/vg-design-wrapper</strong> udstiller et <strong>VgDesignWrapper.vue</strong> komponent, som bør omslutte hele
      leverandør-applikation og defor være rod elementet. Se <strong>src/components/Applikation.vue</strong> som eksempel. Dette wrapper komponent
      sørger for at importere styling for Virksomhedsguiden, så leverandør-applikation ikke selv skal gøre det. Den tilføjer også en CSS klasse
      <strong>applikation-container</strong> på rod elementet.
    </p>
    <div class="alert alert-info">
      <div class="alert-body">
        <div class="alert-text">
          <p>
            Alle komponenter som <strong>@erst-vg/vg-design-wrapper</strong> udstiller kan findes i
            <strong>node_modules/@erst-vg/vg-design-wrapper/src/components</strong> mappen. Her er det muligt at se hvilke props de forskellige
            komponenter forventer.
          </p>
        </div>
      </div>
    </div>
    <Accordion />
    <Icons />
    <Buttons />
    <Cards />
    <Liste />
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import Accordion from './VgDesign/Accordion.vue';
import Buttons from './VgDesign/Buttons.vue';
import Cards from './VgDesign/Cards.vue';
import Icons from './VgDesign/Icons.vue';
import Liste from './VgDesign/Liste.vue';
import Pagination from './VgDesign/Pagination.vue';
</script>
