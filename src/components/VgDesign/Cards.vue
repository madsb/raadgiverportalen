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
          :billede="card.billede"
          :show-billeder="card.showBilleder"
          :label="card.label"
          :overskrift="card.overskrift"
          :link-text="card.linkText"
          :link="card.link"
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

const elementer = computed((): CardElementModel[] => [
  {
    billede: {
      url: 'https://virksomhedsguiden.dk/api/media//userfiles/10150817/billeder/Alle fotos/_NJ07197.webp',
      label: 'Billede som hører til card #1'
    },
    showBilleder: true,
    label: 'Card #1',
    overskrift: 'Card #1',
    linkText: 'Læse mere',
    link: {
      href: "https://www.dr.dk",
      title: 'DR',
      external: true
    },
    manchet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
  {
    label: 'Card #2',
    overskrift: 'Card #2',
    linkText: 'Læse mere',
    link: {
      href: "https://www.dr.dk",
      title: 'DR',
      external: true
    },
    manchet: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    billede: {
      url: 'https://virksomhedsguiden.dk/api/media/userfiles/10150817/billeder/Diverse/NF.jpg',
      label: 'Billede som hører til card #3'
    },
    overskrift: 'Card #3',
    linkText: 'Læs mere på ekstern side',
    link: {
      href: "https://www.dr.dk",
      title: 'DR',
      external: true
    },
    manchet: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    showBilleder: false,
    label: 'Card #1',
    overskrift: 'Card #1',
    linkText: 'Læse mere',
    link: {
      href: "https://www.dr.dk",
      title: 'DR',
      external: true
    },
    manchet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
  {
    showBilleder: false,
    label: 'Card #2',
    overskrift: 'Card #2',
    linkText: 'Læse mere',
    link: {
      href: "https://www.dr.dk",
      title: 'DR',
      external: true
    },
    manchet: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    showBilleder: false,
    overskrift: 'Card #3',
    linkText: 'Læs mere på ekstern side',
    link: {
      href: "https://www.dr.dk",
      title: 'DR',
      external: true
    },
    manchet: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }
]);
</script>
