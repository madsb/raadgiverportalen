<template>
  <div>
    <h2 class="mt-5">Navigation</h2>
    <div>
      Eksempel på simpel navigation inde i leverandør-applikationen, hvor visning af trin styres med Vue v-show direktiv. Det er
      leverandør-applikationen selv, som skal lytte på <strong>hashchange</strong> event, og efterfølgende implementere logikken når # ændres. Der
      bruges # i URL'en så tilbage knappen i browseren navigerer korrekt.
    </div>
    <h4>Du er på trin {{ step }}/{{ maxStep }}</h4>
    <form class="my-5">
      <div v-show="step === 1" class="form-group">
        <label class="form-label" for="navn"> Navn </label>
        <input id="navn" class="form-input" required value="Jens" name="navn" type="text" />
      </div>
      <div v-show="step === 2" class="form-group">
        <label class="form-label" for="efternavn"> Efternavn </label>
        <input id="efternavn" class="form-input" required value="Hansen" name="efternavn" type="text" />
      </div>
    </form>
    <div v-show="step === maxStep">
      <div class="alert alert-info my-5">
        <div class="alert-body">
          <p class="alert-heading">Sidste trin</p>
          <p class="alert-text">Du har nået sidste trin i guiden ...</p>
        </div>
      </div>
    </div>
    <div>
      <button class="button button-primary" @click="$emit('decreaseStep')">Forrige</button>
      <button class="button button-primary" @click="$emit('increaseStep')">Næste</button>
    </div>
    <div class="mt-5">
      Bemærk hvis hash (#) indholder flere ord eller specielle karakterer, og sendes til dataopsamling via
      <strong>@erst-vg/piwik-event-wrapper</strong>, så må den ikke URL encodes. I stedet for bør man bruge
      <strong>src/utils/slug.util.ts</strong> eller lignende alternativ, som sørger for hash er nemmere at læse. Se evt.
      <strong>src/components/Navigation.vue</strong> for hvordan util funktionen bruges.
      <div class="mt-5">
        Eksempel hash: #<strong>{{ langHash }}</strong> bliver til #<strong>{{ slugify(langHash) }}</strong> vha. slugify util.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as slugUtil from '../utils/slug.util';

export default defineComponent({
  name: 'Navigation',
  props: {
    step: {
      type: Number,
      required: true
    },
    maxStep: {
      type: Number,
      required: true
    }
  },
  emits: ['decreaseStep', 'increaseStep'],
  data() {
    return {
      langHash: 'flere ord med specielle karakterer kødpålæg!'
    };
  },
  methods: {
    slugify() {
      return slugUtil.slugify(this.langHash);
    }
  }
});
</script>
