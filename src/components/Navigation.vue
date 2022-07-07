<template>
  <div>
    <h2 class="mt-5">Navigation</h2>
    <div>
      Eksempel på simpel navigation inde i leverandør-applikationen, hvor visning af trin styres med Vue v-show direktiv. Det er applikationen selv,
      som skal lytte på <strong>hashchange</strong> event, og efterfølgende implementere logikken når # ændres. Der bruges # i URL'en så tilbage
      knappen i browseren navigerer korrekt.
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
  </div>
</template>

<script lang="ts">
export default {
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
  }
};
</script>
