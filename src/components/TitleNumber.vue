<script setup lang="ts">
import {Badge} from "primevue";

defineProps<{
  title?: string
  number?: string | number
}>()
</script>

<template>
  <div class="my-2">
      <Badge :value="number" size="xlarge" /> <span class="text-xl font-bold m-2">{{ title }}</span>
  </div>
</template>
