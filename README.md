# Demo leverandør-applikation

Denne applikation kan bruges som skabelon til udvikling af leverandør-applikation, der kan integreres i Virksomhedsguiden som Vue 3 komponenter.

## Initial

Installér NPM afhængigheder

```
npm install
```

## Udvikling

Byg og serve til udvikling

```
npm run serve
```

Start udvikling/test af applikation i _src/components/Applikation.vue_

## Kode oprydning

```
npm run lint
```

```
npm run prettierfix
```

## Transpile applikation

```
npm run transpile-test
```

## Nuværende NPM moduler

Nuværende NPM moduler og versioner, som kan bruges af leverandør-applikationer der ikke er angivet i _package.json_ filen. Ved behov for andre NPM moduler, refereres der til den tekniske vejledning afsnit 3.2.3

- "contentful-rich-text-vue-renderer": "1.1.5"
- "tiny-emitter": "2.1.0"
- "@sanity/block-content-to-html": "2.0.0"
- "@sanity/client": "2.23.2"
- "sanity-blocks-vue-component": "1.0.1"
- "vue3-apexcharts": "1.4.1"
- "apexcharts": "3.33.2"
- "@erst-vg/vg-design-wrapper": "^1.0.6"
- "@erst-vg/vue3-html2pdf": "1.1.3"
- "@contentful/rich-text-html-renderer": "15.13.1"
- "@contentful/rich-text-types": "15.13.2"
- "humps": "2.0.1"
- "ol": "6.13.0"
- "tippy.js": "6.3.7"
- "zod": "3.22.4"
- "i18next": "23.5.1"
- "@tsconfig/node18": "18.2.0"
- "@vue/tsconfig": "0.4.0"
