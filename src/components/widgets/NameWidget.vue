<script setup lang="ts">
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref} from "vue";
import BarComponent from "@/components/widgets/components/BarComponent.vue";

const widgetData = ref<
  { percentage: number; name: string }[] | null
>(null)

onMounted(() => {
  getData()
})

async function getData(){
  const { data } = await supabase
    .schema('Baby')
    .from('Guesses_by_name')
    .select()
    .order('count', { ascending: false })
    .limit(5)

  widgetData.value = data
}

</script>

<template>
    <div class="rounded-xl p-6 bg-[#fefce8] shadow-md ring-1 ring-amber-100" v-if="widgetData">
      <span class="text-xl font-bold">Top 5 Namen</span>
      <div v-for='item in widgetData'>
        <BarComponent :name="item.name" :percent="item.percentage"/>
      </div>
    </div>
</template>
