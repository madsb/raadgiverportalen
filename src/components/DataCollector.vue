<template>
  <div>
    <h2 class="mt-5">Data-opsamling</h2>
    <p>
      Virksomhedsguiden opsamler data vedr. brugerens adfærd. Det er leverandørens ansvar at der også opsamles relevant data i
      leverandør-applikationen. Følgende er en liste af events, som leverandør-applikationen skal kalde i forskellige scenarier. Service
      <strong>piwikService</strong> fra <strong>@erst-vg/piwik-event-wrapper</strong> bruges til at kalde de tilgængelige data funktioner.
    </p>

    <div class="alert alert-info">
      <div class="alert-body">
        <p class="alert-text">
          Det er vigtigt piwikService først initialiseres i entry point komponenten <strong>src/components/Applikation.vue</strong>.
        </p>
      </div>
    </div>

    <h4>AppDownload</h4>
    <p class="my-5">Dette event bruges ved tryk på en download-knap eller tilsvarende.</p>
    <button class="button button-primary" @click="piwikService.emitDownloadEvent('download', 'doc.pfd')">Download event</button>
    <h4>AppCTAClick</h4>
    <p class="my-5">
      Dette event bruges ved tryk på andre knapper end ovenstående - fx "åben accordion". Det anbefales som udgangspunkt, at man begrænser brugen af
      denne event-type.
    </p>
    <button class="button button-primary" @click="piwikService.emitCTAClickEvent('cTAClick', 'eventType')">Call to action event</button>
    <h4>AppStart</h4>
    <p class="my-5">Denne event bruges til at angive man har startet et forløb i applikationen fx. startet en guide med trin.</p>
    <button class="button button-primary" @click="piwikService.emitStartEvent()">Start event</button>
    <h4>AppSlut</h4>
    <p class="my-5">
      Denne event bruges til at angive man har afsluttet et forløb i applikationen fx. afsluttet en guide med trin, og nu er kommet til resultatsiden.
    </p>
    <button class="button button-primary" @click="piwikService.emitSlutEvent()">Slut event</button>
  </div>
</template>

<script setup lang="ts">
import { piwikService } from '@erst-vg/piwik-event-wrapper';
</script>
