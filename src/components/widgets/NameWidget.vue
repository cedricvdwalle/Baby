<script setup lang="ts">
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref} from "vue";
import {DataTable,Column} from "primevue";

const widgetData = ref<any[] | null>(null)

const colorMap: Record<string, string> = {
  Jongen: "#dfebeb", // blue
  Meisje: "#f6ded8", // green
  default: "#FFA726" // orange
}

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
  <DataTable :value="widgetData">
    <Column field="name" header="Naam"></Column>
    <Column field="count" header="Aantal"></Column>
  </DataTable>
</template>
