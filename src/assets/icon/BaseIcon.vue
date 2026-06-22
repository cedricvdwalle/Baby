<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { iconRegistry } from './iconRegistry'

const props = defineProps<{
  name: string
  size?: number | string
}>()

const attrs = useAttrs()

const svg = computed(() => iconRegistry[props.name] || '')

const sizeValue = computed(() => props.size ?? 24)
</script>

<template>
  <span
    v-html="svg"
    v-bind="attrs"
    class="base-icon"
    :style="{
      width: typeof sizeValue === 'number' ? sizeValue + 'px' : sizeValue,
      height: typeof sizeValue === 'number' ? sizeValue + 'px' : sizeValue,
    }"
  />
</template>

<style scoped>
.base-icon {
  width: 1em;
  height: 1em;
  display: inline-flex;
}

/* IMPORTANT: make SVG inherit color properly */
.base-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
  stroke: currentColor;
}
</style>
