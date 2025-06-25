<template>
  <div class="mt-8">
    <h3>Accordion</h3>
    <p>DKFDS: <a href="https://designsystem.dk/komponenter/accordions/" target="_blank">Accordions</a></p>
    <p>Eksempel komponent: <strong>src/components/VgDesign/Accordion.vue</strong></p>
    <p>NPM komponent: <strong>node_modules/@erst-vg/vg-design-wrapper/src/components/VgAccordion.vue</strong></p>

    <h4>Simpel accordion</h4>
    <VgAccordion id="vg-accordion" :accordions="elementer" />
    <p>Eksempel viser en simpel accordion hvor kun titel og indhold angives</p>
    <h4>Advanceret accordion</h4>
    <VgAccordion id="vg-accordion-control" :accordions="elementer" :bulk="true" heading="h2" @toggle="onToggle">
      <template #before="{ index }">{{ elementer[index].overskrift }}</template>
      <template #titel="{ data }">
        {{ data.titel }}
      </template>
      <template #indhold="{ data }">
        {{ data.indhold }}
      </template>
    </VgAccordion>
    <p>
      Eksempel viser en accordion hvor udvikleren har mere kontrol over accordion. Her er det muligt at angive overskrift, titel og indhold via slots.
      Det er også muligt at tilføje (Åben/Luk alle) funktionalitet ved at angive prop <i>bulk</i> samt hvilken heading accordion skal omsluttes af.
      Komponent emitter en <i>toggle</i> event når en accordion foldes ind eller ud. Denne event angiver hvilken accordion og dennes tilstand.
    </p>
  </div>
</template>

<script setup lang="ts">
import { VgAccordion } from '@erst-vg/vg-design-wrapper'
import { computed } from 'vue'
import { AccordionElementModel } from '../../models/accordion.model'
import { LOG_PREFIX } from '../../utils/log-util'

const elementer = computed((): AccordionElementModel[] => [
  {
    overskrift: 'Læs her for indsendelse af årsrapport',
    titel: 'Indsend årsrapport til Erhvervsstyrelsen',
    indhold:
      'Dit årsregnskab er en del af den årsrapport, du skal indsende til Erhvervsstyrelsen en gang om året. Hvis ikke du indsender årsrapporten til tiden, bliver du pålagt en afgift, og hvis denne ikke betales, bliver selskabet tvangsopløst. '
  },
  {
    overskrift: 'Læs her for udfyldelse af oplysingsskema',
    titel: 'Udfyld selskabets oplysningsskema',
    indhold:
      'Når du ejer et selskab, skal du udfylde et oplysningsskema (tidligere selvangivelse) for selskaber for at kunne betale din skat korrekt. Men før du kan oplyse, skal du have lavet selskabets årsregnskab. Tallene fra regnskabet skal du bruge for at kunne udfylde oplysningsskemaet. I skemaet skal du bl.a. give oplysninger om dit selskabs resultat for året (overskud eller underskud), renteindtægter, renteudgifter og regnskab.   '
  }
])

const onToggle = (status: boolean, accordionId: string, index: number): void => {
  // eslint-disable-next-line no-console
  console.log(`${LOG_PREFIX}Toggle accordion for ID: ${accordionId} for position ${index} med status ${status}`)
}
</script>
