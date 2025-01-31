<template>
  <div>
    <h3>Liste</h3>
    <p>DKFDS: ikke tilgængeligt</p>
    <p>Eksempel komponent: <strong>src/components/VgDesign/Liste.vue</strong></p>
    <p>NPM komponent: <strong>node_modules/@erst-vg/vg-design-wrapper/src/components/VgPagination.vue</strong></p>
    <div class="mt-8">
      <VgListe :antal="total" :data-slice="cards" :use-spinner="true" @load-slice="onLoadSlice">
        <div v-for="(card, index) in cards" :key="index" class="col-12">
          <VgListeCard label="Artikel" :titel="card.titel" @click="onListeCard(index)">{{ card.manchet }}</VgListeCard>
        </div>
      </VgListe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VgListe, VgListeCard } from '@erst-vg/vg-design-wrapper';
import { ref } from 'vue';
import { LOG_PREFIX } from '../../utils/log-util';

const total = 3;
const pagination = 2;

const cards = ref(
  [...Array(pagination).keys()].map(index => ({
    titel: `card ${index + 1}`,
    manchet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }))
);

const onListeCard = (index: number): void => {
  // eslint-disable-next-line no-console
  console.log(`${LOG_PREFIX}Liste card klik for position ${index}`);
};

const onLoadSlice = (): void => {
  const offset = cards.value.length;
  const remaining = total - offset;
  const sliceSize = remaining < pagination ? remaining : pagination;
  // Simulér async operation som tager tid
  setTimeout(() => {
    cards.value = cards.value.concat(
      [...Array(sliceSize).keys()].map(index => ({
        titel: `card ${index + offset + 1}`,
        manchet: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }))
    );
  }, 200);
};
</script>
