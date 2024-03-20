<template>
  <div>
    <h2 class="mt-5">Login Demo:</h2>
    <div class="my-5">
      <span><strong>Bruger:</strong></span>
      <span class="ml-2">
        <div v-if="bruger" class="mt-5">
          <pre>{{ bruger }}</pre>
        </div>
        <p v-else class="mt-5">Brugeren er ikke logget ind</p>
      </span>
    </div>
    <div class="my-5">
      <span><strong>isLoggedIn:</strong></span>
      <span class="ml-2">{{ isLoggedIn }}</span>
    </div>
    <div class="my-5">
      <span><strong>token:</strong></span>
      <span v-if="token" class="ml-2 my-5">
        {{ token }}
      </span>
      <span v-else class="ml-2">Leverandør-applikationen har endnu ikke anmodet om token </span>
    </div>
    <div v-if="isTokenRequestCancelled" class="alert alert-warning">
      <div class="alert-body">
        <p class="alert-heading">Mangler accept</p>
        <p class="alert-text">
          Leverandør-applikation kan ikke starte fordi brugeren ikke har accepteret modal vedr. dataopsamling. Denne besked eller lignende reaktion
          implementeres selv af leverandør-applikationen
        </p>
      </div>
    </div>
    <div class="alert alert-info">
      <div class="alert-body">
        <p class="alert-heading">Bruger accept</p>
        <p class="alert-text">
          Hvis brugeren forsøger at starte leverandør-applikationen, men vælger ikke at acceptere opsamling af data om brugeren, så får token værdien:
          <i>cancelled</i>. Leverandør-applikationen kan reagerer på denne specielle værdi, og evt. visuelt vise brugeren hvorfor
          leverandør-applikationen ikke blev startet, eller starte et flow, der ikke kræver login.
        </p>
      </div>
    </div>
    <div v-if="!token || isTokenRequestCancelled" class="my-5">
      <button class="button button-primary" @click="$emit('requestToken')">Anmod om token</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { TokenStatus } from '../enums/tokenStatus.enum';
import { Bruger } from '../models/bruger.model';

const emit = defineEmits(['requestToken']);

const props = defineProps({
  token: {
    type: String,
    default: ''
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  bruger: {
    type: Object as PropType<Bruger | null>,
    default: null
  }
});

const isTokenRequestCancelled = computed(() => props.token === TokenStatus.CANCELLED);
</script>
