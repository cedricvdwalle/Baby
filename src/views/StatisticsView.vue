<script setup lang="ts">
import GenderWidget from "@/components/widgets/GenderWidget.vue";
import ParametersWidget from "@/components/widgets/ParametersWidget.vue";
import NameWidget from "@/components/widgets/NameWidget.vue";

</script>

<template>
  <span class="fredoka-text font-bold text-3xl">Dit denkt de rest!</span>

  <div class="w-full">
    <GenderWidget />
  </div>

  <div class="w-full">
    <NameWidget />
  </div>

  <div class="flex flex-col md:flex-row w-full gap-4 my-2">
    <ParametersWidget view="Guess_widget_weight" class="w-full md:w-[25%] lg:w-[50%]" icon="scale" unit="g" label="gewicht"/>
    <ParametersWidget view="Guess_widget_size" class="w-full md:w-[25%] lg:w-[50%]" icon="ruler" unit="cm" label="grootte"/>

  </div>

  <div class="flex flex-col md:flex-row w-full gap-4 my-2">
    <ParametersWidget view="Guess_widget_date" class="w-full md:w-[25%] lg:w-[50%]" icon="calendar" label="datum"/>
    <ParametersWidget view="Guess_widget_time" class="w-full md:w-[25%] lg:w-[50%]" icon="clock" label="tijdstip"/>
  </div>


</template>
