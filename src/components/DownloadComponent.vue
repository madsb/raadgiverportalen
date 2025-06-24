<template>
  <div>
    <h2 class="mt-5">Download af PDF</h2>
    <p>Følgende er et eksempel på at downloade noget HTML som en PDF, og kan findes i <strong>src/components/DownloadComponent.vue</strong>.</p>
    <p>
      Erhvervsfremmeplatformen udstiller et API til generation af PDF-filer, som er hostet af Erhvervsstyrelsen. Servicen er baseret på Puppeteer, som
      er et Node.js API til at styre Chrome/Chromium, og som kan bruges til at indlæse et HTML-dokument i en browser, som derefter kan eksportere der
      renderede dokument som en PDF-fil.
    </p>
    <p>Puppeteer har nogle tekniske begrænsninger ift. billeder og andet. Se den tekniske vejledning for detaljer om dette.</p>
    <div v-if="!isVirksomhedsguiden" class="alert alert-warning">
      <div class="alert-body">
        <p class="alert-heading">Kørsel som selvstændig applikation</p>
        <p class="alert-text">
          Da kald til PDF-servicen fejler på grund af CORS, når man kører applikation selvstændigt, vil download-knappen altid resultere i en fejl.
          Transpilér applikation på Virksomhedsguiden for at bruge PDF-servicen.
        </p>
      </div>
    </div>
    <div class="mt-5">
      <div v-if="pending" class="spinner" aria-label="Henter indhold" />
      <div v-if="error" class="alert alert-error my-5" role="alert" aria-atomic="true">
        <div class="alert-body">
          <p class="alert-heading">Fejl</p>
          <p class="alert-text">Kald til backend-service fejlede.</p>
        </div>
      </div>
      <button class="button button-primary" @click="downloadPdf()">Download PDF</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import type { PDFRequest } from '../models/pdfRequest.model';

defineProps({
  isVirksomhedsguiden: {
    type: Boolean,
    required: true
  }
});

const error = ref(false);
const pending = ref(false);

const metaTitle = computed((): string => 'Demoapplikation download eksempel');

const contentHtml = computed(
  (): string => `
  <!DOCTYPE html>
  <html lang="da">
    <head>
      <meta charset="utf-8" />
      <title>${metaTitle.value}</title>
      <style>
        ${styles.value}
      </style>
    </head>
    <body>
      <div class="content">
        <div class="break-after">
          Indhold på forsiden
        </div>
        <div>
          Indhold på næste side
        </div>
      </div>
    </body>
  </html>
`
);

// Fælles styles som bliver brugt i PDF'ens indhold kan angives her. Slår ikke igennem i header og footer.
const styles = computed(
  (): string => `
  @page{
    size:A4;
    margin: 18mm;
    margin-bottom: 36mm;
  }

  .content {
    font-family: 'IBM Plex Sans', 'IBM Plex', sans-serif;
    font-size: 20px;
  }

  .break-after {
    break-after: page;
  }
`
);

const footerHtml = computed(
  (): string => `
  <div style="text-align: right; width: 297mm; margin-bottom: 1.5cm">
    <span style="margin-right: 2cm">
      <span class="pageNumber" style="font-family: 'IBM Plex Sans', 'IBM Plex', sans-serif; font-size: 16px;" />
    </span>
  </div>
`
);

const downloadPdf = (): void => {
  pending.value = true;
  error.value = false;
  const html = contentHtml.value;
  const headerTemplate = '<div />';
  const footerTemplate = footerHtml.value;
  const pdfRequestPayload = {
    html,
    headerTemplate,
    footerTemplate,
    title: metaTitle.value,
    language: 'da'
  };
  postPdfRequest(pdfRequestPayload)
    .then(blob => {
      // Omdanner blob-data til et link som klikkes på, så filen downloades automatisk
      const blobUrl = URL.createObjectURL(blob);
      const pdfLink = document.createElement('a');
      pdfLink.download = 'demoapplikation.pdf';
      pdfLink.href = blobUrl;
      pdfLink.target = '_blank';
      pdfLink.click();
    })
    .catch(() => {
      // Handle error locally - preserve component state
      error.value = true;
    })
    .finally(() => {
      // Spinner skjules
      pending.value = false;
    });
};

// Opsætter Axios request til PDF-servicen
const postPdfRequest = async (request: PDFRequest): Promise<Blob> => {
  return (
    await axios.post<Blob>('/api/bucket/pdf/generer/', request, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
      responseType: 'blob'
    })
  ).data;
};
</script>
