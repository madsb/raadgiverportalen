<template>
  <div class="mt-8">
    <h3>Cards</h3>
    <p>DKFDS: <a href="https://designsystem.dk/komponenter/cards/" target="_blank">Cards</a></p>
    <p>Eksempel komponent: <strong>src/components/VgDesign/Cards.vue</strong></p>
    <p>
      NPM komponenter:
      <ul>
        <li>
          <strong>node_modules/@erst-vg/vg-design-wrapper/src/components/VgCardGroup.vue</strong>
        </li>
        <li>
          <strong>node_modules/@erst-vg/vg-design-wrapper/src/components/VgCard.vue</strong>
        </li>
      </ul>
    </p>
    <VgCardGroup>
      <div v-for="(card, index) in elementer" :key="index" class="mb-4 mb-sm-6 col-md-4 col-6">
        <VgCard
          :titel="card.titel"
          :header="card.header"
          :billede="card.billede"
          :label="card.label"
          :link-text="card.linkText"
          :external="card.external"
          @click="onCardClick(index)"
        >
          <template #text>{{ card.manchet }}</template>
        </VgCard>
      </div>
    </VgCardGroup>
  </div>
</template>

<script setup lang="ts">
import { VgCard, VgCardGroup } from '@erst-vg/vg-design-wrapper';
import { computed } from 'vue';
import { CardElementModel } from '../../models/card.model';
import { LOG_PREFIX } from '../../utils/log-util';

const elementer = computed((): CardElementModel[] => [
  {
    titel: 'Card #1',
    header: 'Test: Fra idé til succesfuld virksomhed',
    billede: {
      url: 'https://virksomhedsguiden.dk/api/media//userfiles/10150817/billeder/Alle fotos/_NJ07197.webp',
      label: 'Billede som hører til card #1'
    },
    manchet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    label: 'Card #1',
    linkText: 'Læse mere'
  },
  {
    titel: 'Card #2',
    header: 'Følg din plan',
    billede: {
      url: 'https://virksomhedsguiden.dk/api/media/userfiles/10150817/billeder/Diverse/NF.jpg',
      label: 'Billede som hører til card #2'
    },
    manchet: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    label: 'Card #2',
    linkText: 'Læs mere på ekstern side',
    external: true
  },
  {
    titel: 'Card #3',
    header: 'Din forretningsidé',
    billede: undefined,
    label: 'Card #3',
    manchet: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    linkText: 'Læse mere'
  }
]);

const onCardClick = (index: number): void => {
  // eslint-disable-next-line no-console
  console.log(`${LOG_PREFIX}Card klik #${index}`);
};
</script>
