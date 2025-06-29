<template>
  <div>
    <h2 class="mt-5">Step Navigation Component</h2>
    <div class="alert alert-info mb-4">
      <div class="alert-body">
        <p class="alert-heading">To Navigation Tilgange</p>
        <p class="alert-text">Dette viser trin-baseret navigation til wizards. Til fuld app navigation, se Router Demo i stedet.</p>
      </div>
    </div>
    <p>
      Eksempel på simpel navigation inde i leverandør-applikationen, hvor visning af trin styres med Vue v-show direktiv. Det er
      leverandør-applikationen selv, som skal lytte på <strong>hashchange</strong> event, og efterfølgende implementere logikken når # ændres. Der
      bruges # i URL'en så tilbage knappen i browseren navigerer korrekt.
    </p>
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
    <div class="alert alert-warning mt-5">
      <div class="alert-body">
        <p class="alert-heading">⚠️ Navigation System Kompatibilitet</p>
        <p class="alert-text">
          <strong>Brug IKKE denne trin navigation sammen med hovedrouteren!</strong><br />
          Begge systemer lytter til hash ændringer og vil konflikte. Vælg én tilgang:
        </p>
        <ul class="alert-text">
          <li><strong>Trin Navigation (useNavigation):</strong> Til wizards, multi-step formularer inden for enkelte komponenter</li>
          <li><strong>Router System:</strong> Til fuld applikation navigation med flere sider/views</li>
        </ul>
      </div>
    </div>
    <p class="mt-5">
      Bemærk hvis hash (#) indholder flere ord eller specielle karakterer, og sendes til dataopsamling via
      <strong>@erst-vg/piwik-event-wrapper</strong>, så må den ikke URL encodes. I stedet for bør man bruge
      <strong>src/utils/slug.util.ts</strong> eller lignende alternativ, som sørger for hash er nemmere at læse.
    </p>
    <div class="mt-5">
      Eksempel hash: #<strong>{{ langHash }}</strong> bliver til #<strong>{{ slugify(langHash) }}</strong> vha. slugify util.
    </div>
  </div>
</template>

<script setup lang="ts">
import * as slugUtil from '../../utils/slug.util'

const props = defineProps({
  step: {
    type: Number,
    required: true
  },
  maxStep: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['decreaseStep', 'increaseStep'])
const langHash = 'flere ord med specielle karakterer kødpålæg!'

const slugify = (hash: string) => slugUtil.slugify(hash)
</script>
