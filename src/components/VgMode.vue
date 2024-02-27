<template>
  <div>
    <h2 class="mt-5">Mode:</h2>
    <div class="my-5">
      Entry point komponent <strong>src/components/Applikation.vue</strong> modtager en prop
      <pre class="d-inline-block">is-virksomhedsguiden</pre>
      som kan bruges til at finde ud af om applikationen kører selvstænding (false) eller om den er indlejret i Virksomhedsguiden (true)
    </div>
    <div class="alert alert-info">
      <div class="alert-body">
        <p class="alert-heading">Mode</p>
        <div class="alert-text">
          <div v-if="isVirksomhedsguiden">Applikationen kører inden i Virksomhedsguiden</div>
          <div v-else>Applikationen kører udenfor Virksomhedsguiden</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TokenStatus } from '../enums/tokenStatus.enum';
import { defineComponent } from 'vue';
import { Bruger } from '../models/bruger.model';

export default defineComponent({
  name: 'VgMode',
  props: {
    isVirksomhedsguiden: {
      type: Boolean,
      required: true
    }
  }
});
</script>
