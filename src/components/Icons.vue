<template>
  <div>
    <h2 class="mt-5">Ikoner</h2>
    <div class="mb-5">
      Nedenstående ikoner kommer fra samlingen i
      <strong>src/components/SvgIcons.vue</strong>. Ikon samling skal udvides når der er brug for flere ikoner i applikationen, og det er
      leverandør-applikationens eget ansvar at tilføje dem. Hvis der er brug for at tilføje custom ikoner, så brug venligst prefix
      <strong>xla-</strong> som ID fx "xla-chat" for at undgår kollision med custom ikoner i Virksomhedsguiden.
    </div>
    <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#home"></use></svg>
    <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#attach-file"></use></svg>
    <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#xla-chat"></use></svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icons'
});
</script>
