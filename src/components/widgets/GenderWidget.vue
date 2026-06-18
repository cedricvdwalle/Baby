<script setup lang="ts">
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref} from "vue";
import Chart from 'primevue/chart';

const widgetData = ref<any[] | null>(null)
const chartData = ref()
const chartOptions = ref()

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
    .from('Gender_counts')
    .select()

  widgetData.value = data

  const labels = data?.map((item) => item.gender) ?? []
  const values = data?.map((item) => item.total) ?? []

  const backgroundColor = labels.map(
    (g) => colorMap[g] ?? colorMap.default
  )

  chartData.value = {
    labels,
    datasets: [
      {
        label: "Geslacht",
        data: values,
        backgroundColor
      }
    ]
  }

  chartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
}

</script>

<template>
  <Chart type="pie" :data="chartData" :options="chartOptions" />
</template>

<style scoped>

</style>
