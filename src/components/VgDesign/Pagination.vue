<template>
  <div class="mt-8">
    <h3>Pagination</h3>
    <p>DKFDS: <a href="https://designsystem.dk/komponenter/paginering/" target="_blank">Paginering</a></p>
    <p>Eksempel komponent: <strong>src/components/VgDesign/Pagination.vue</strong></p>
    <p>NPM komponent: <strong>node_modules/@erst-vg/vg-design-wrapper/src/components/VgListe.vue</strong></p>
    <div class="mt-8">
      <VgPagination :current-page="3" :page-count="15" @to-page="onPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VgPagination } from '@erst-vg/vg-design-wrapper';
import { LOG_PREFIX } from '../../utils/log-util';

const onPage = (page: number): void => {
  // eslint-disable-next-line no-console
  console.log(`${LOG_PREFIX}Gå til: ${page}`);
};
</script>
