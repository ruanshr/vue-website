<template>
  <div class="svgicon">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgIcon"
});
</script>
