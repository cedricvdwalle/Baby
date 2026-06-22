<script setup lang="ts">
import BaseIcon from "@/assets/icon/BaseIcon.vue";

const selected = defineModel<"jongen" | "meisje" | null>();

const genders = [
  {
    value: "jongen",
    label: "Jongen",
    selectedClasses: "bg-jongen border-jongen",
    checkColor: "text-jongen",
    textColor: "text-jongen"
  },
  {
    value: "meisje",
    label: "Meisje",
    selectedClasses: "bg-meisje border-meisje",
    checkColor: "text-meisje",
    textColor: "text-meisje"
  },
] as const;
</script>

<template>
  <div class="grid md:grid-cols-2 gap-6">
    <div
        v-for="gender in genders"
        :key="gender.value"
        @click="selected = gender.value"
        class="relative cursor-pointer rounded-lg p-8 text-center transition-all shadow-sm border border-amber-200"
        :class="
        selected === gender.value
          ? gender.selectedClasses
          : 'hover:shadow-md hover:border-gray-300'
      "
    >
      <div class="flex justify-center items-center">
        <BaseIcon name="babyBodyLines"  :class="gender.textColor" size="200px"/>
      </div>

      <p class="mt-4 font-semibold text-xl" :class="gender.textColor" >
        {{ gender.label }}
      </p>

      <div
          v-if="selected === gender.value"
          class="absolute top-3 right-3"
          :class="gender.checkColor"
      >
        <i class="pi pi-check-circle" style="font-size: 1.5rem"></i>
      </div>
    </div>
  </div>
</template>
