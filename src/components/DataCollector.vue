<template>
  <div>
    <h2 class="mt-5">Data-opsamling</h2>
    Virksomhedsguiden opsamler data vedr. brugerens adfærd. Det er leverandørens ansvar at der også opsamles relevant data i leverandør-applikationen.
    Følgende er en liste af events, som leverandør-applikationen skal kalde i forskellige scenarier.
    <h4>AppDownload</h4>
    <div class="my-5">Dette event bruges ved tryk på en download-knap eller tilsvarende.</div>
    <button class="button button-primary" @click="$emit('download', 'doc.pfd', 'download data')">Download event</button>
    <h4>AppCTAClick</h4>
    <div class="my-5">
      Dette event bruges ved tryk på andre knapper end ovenstående - fx "åben accordion". Det anbefales som udgangspunkt, at man begrænser brugen af
      denne event-type.
    </div>
    <button class="button button-primary" @click="$emit('cTAClick', 'eventType', 'CTA data')">Call to action event</button>
    <h4>AppFritekst</h4>
    <div class="my-5">
      Dette event kan bruges, hvis intet andet event slår til. Det anbefales dog stærkt, at man overvejer om et af ovenstående events kan bruges i
      stedet for.
    </div>
    <button class="button button-primary" @click="$emit('fritekst')">Fritekst event</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DataCollector'
};
</script>
