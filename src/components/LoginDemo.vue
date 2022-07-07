<template>
  <div>
    <h2 class="mt-5">Login Demo:</h2>
    <div class="my-5">
      <span><strong>Bruger:</strong></span>
      <span class="ml-2">
        <div v-if="bruger" class="mt-5">
          <pre>{{ bruger }}</pre>
        </div>
        <div v-else class="mt-5">Brugeren er ikke logget ind</div>
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
    <div v-if="!token" class="my-5">
      <button class="button button-primary" @click="$emit('requestToken')">Anmod om token</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Bruger } from '../models/bruger.model';

export default {
  name: 'LoginDemo',
  props: {
    token: {
      type: String,
      default: '',
      required: false
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
      required: false
    },
    bruger: {
      type: Object as () => Bruger,
      default: null,
      required: false
    }
  }
};
</script>
