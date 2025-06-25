<template>
  <div>
    <h2 class="mt-5">Mode:</h2>
    <div class="alert alert-info">
      <div class="alert-body">
        <div class="alert-text">
          <p v-if="isVirksomhedsguiden">Applikationen kører inden i Virksomhedsguiden</p>
          <p v-else>Applikationen kører udenfor Virksomhedsguiden</p>
        </div>
      </div>
    </div>
    <p>
      Entry point komponent <strong>src/components/Applikation.vue</strong> modtager en prop <em>is-virksomhedsguiden</em> som kan bruges til at finde
      ud af om applikationen kører selvstændig (false) eller om den er indlejret i Virksomhedsguiden (true)
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isVirksomhedsguiden: {
    type: Boolean,
    required: true
  }
})
</script>
