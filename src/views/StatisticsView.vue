<script setup lang="ts">
import GenderWidget from "@/components/widgets/GenderWidget.vue";
import NameWidget from "@/components/widgets/NameWidget.vue";
</script>

<template>
  <span class="fredoka-text font-bold text-3xl">Dit denkt de rest!</span>

  <div class="flex w-full">
    <div class="w-1/2">
      <GenderWidget />
    </div>

    <div class="w-1/2">
      <NameWidget />
    </div>
  </div>
</template>
