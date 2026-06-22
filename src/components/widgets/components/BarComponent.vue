<script setup lang="ts">

const props = defineProps<{
  name: string;
  percent?: number;
}>();

</script>

<template>
  <div v-if="props" class="w-full my-2">
    <!-- Labels INSIDE bar -->
    <div class="relative h-15 w-full rounded-xl overflow-hidden bg-amber-100 border border-2 border-amber-100 hover:border-amber-300">

      <!-- filled part -->
      <div
        class="absolute top-0 left-0 h-full bg-amber-200/60 transition-all"
        :style="{ width: percent + '%' }"
      />

      <!-- overlay text -->
      <div class="absolute inset-0 flex items-center justify-between px-3 text-xs h">
        <span class="text-lg text-jongen">{{  name  }}</span>

        <span class="px-2 rounded text-gray-800 text-xl">
          {{ percent }}%
        </span>
      </div>
    </div>
  </div>
</template>
