<script setup lang="ts">
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref} from "vue";

const widgetData = ref<{
  jongen_percentage: number
  jongen: number,
  meisje : number
} | null>(null)

onMounted(() => {
  getData()
})

async function getData(){
  const { data } = await supabase
    .schema('Baby')
    .from('Gender_counts_V2')
    .select()
    .single();

  widgetData.value = data
}

</script>

<template>
    <div v-if="widgetData" class="w-full my-2">
    <!-- Labels INSIDE bar -->
    <div class="relative h-15 w-full rounded-xl overflow-hidden bg-meisje">

      <!-- filled part -->
      <div
        class="absolute top-0 left-0 h-full bg-jongen"
        :style="{ width: widgetData.jongen_percentage + '%' }"
      />

      <!-- overlay text -->
      <div class="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold">
        <span class="text-lg text-jongen">Jongen</span>

        <span class="px-2 rounded text-gray-800 text-xl">
          {{ widgetData.jongen }} / {{ widgetData.jongen+widgetData.meisje }}
        </span>

        <span class="text-meisje text-lg">Meisje</span>
      </div>
    </div>
  </div>
</template>
