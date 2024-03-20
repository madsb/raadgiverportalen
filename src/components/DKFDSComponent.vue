<template>
  <div>
    <h2 class="mt-5">Det Fælles Designsystem (DKFDS)</h2>
    <p>Applikationen skal bygges op vha. <a href="https://designsystem.dk/kode/implementering/" target="_blank">DKFDS</a></p>
    <h4>Layout:</h4>
    <div class="row">
      <div class="col-md-6 col-xs-12">Eksempel på grid: Venstre kolonne</div>
      <div class="col-md-6 col-xs-12">Eksempel på grid: Højre kolonne</div>
    </div>
    <h5>Accordion:</h5>
    <div class="my-3">
      <ul id="accordion-element" class="accordion accordion-bordered accordion-multiselectable">
        <li>
          <h2>
            <button class="accordion-button" aria-expanded="false" aria-controls="a1">
              Accordion
              <span class="accordion-icon">
                <span class="icon_text">Information</span>
                <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#info"></use></svg>
              </span>
            </button>
          </h2>
          <div id="a1" aria-hidden="true" class="accordion-content">
            <p>Indholdet af en accordion</p>
          </div>
        </li>
      </ul>
    </div>
    <h5>Card:</h5>
    <div class="card my-3">
      <div class="card-header">
        <h2 class="header-title">Eksempel på card-komponenten</h2>
      </div>
      <p class="card-text">
        Du kan bruge cards til at gruppere funktionalitet, der adskiller sig fra sidens øvrige indhold. Cards kan placeres i et grid således at de
        står side om side.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as DKFDS from 'dkfds';
import { onMounted } from 'vue';

onMounted(() => {
  new DKFDS.Accordion(document.querySelector('.applikation-container #accordion-element')).init();
});
</script>
