<script setup lang="ts">
defineProps<{
  label?: string
  value?: string | number
}>()
</script>

<template>
  <div class="md:p-1">
    <div class="uppercase text-gray-500"> {{ label }}</div>
    <div class="font-semibold text-gray-900">{{ value || '/' }}</div>
  </div>
</template>
