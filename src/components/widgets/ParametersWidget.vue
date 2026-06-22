<script setup lang="ts">
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref, computed} from "vue";
import BaseIcon from "@/assets/icon/BaseIcon.vue";
import dayjs from "dayjs";

const widgetData = ref<{
    avg: number,
    min: number,
    max: number
  } | null
>(null)


onMounted(() => {
  getData()
})

const props = defineProps<{
  view: string;
  icon?: string;
  unit?: string;
  label: string;
  format?: string;
}>();

async function getData(){
  const { data } = await supabase
    .schema('Baby')
    .from(props.view)
    .select()
    .single();

  widgetData.value = data
}

const formattedWidget = computed(() => {
  const data = widgetData.value;
  if (!data) return {
    avg: '',
    min: 0,
    max: 0,
  };
  if(props?.format == 'date'){
    return {
      avg: dayjs(data.avg).format('DD-MM-YYYY'),
      min: dayjs(data.min).format('DD-MM-YYYY'),
      max: dayjs(data.max).format('DD-MM-YYYY'),
    };
  } else{
    return data
  }
});

</script>

<template>
  <div class="rounded-xl p-6 bg-[#fefce8] shadow-md ring-1 ring-amber-100" v-if="formattedWidget">
    <!-- Icon -->
    <div class="flex justify-center mb-4">
      <div class="w-24 h-24 rounded-full bg-amber-100/60 flex items-center justify-center shadow-inner">
        <BaseIcon :name="icon || ''" class="text-amber-500" size="50px"/>
      </div>
    </div>

    <!-- Value -->
    <div class="text-center">
      <div class="text-4xl font-bold text-stone-800">
        {{ formattedWidget.avg }} <span class="text-lg text-stone-500">{{ unit }}</span>
      </div>
      <div class="text-sm text-stone-500 mt-1">
        Gemiddeld {{  label  }}
      </div>
    </div>

    <!-- Min / Max -->
    <div class="mt-5 grid grid-cols-2 gap-3">
      <div class="rounded-xl bg-white/60 p-3 text-center shadow-sm">
        <div class="text-xs text-stone-500">Min</div>
        <div class="font-semibold text-stone-800">{{ formattedWidget.min }}</div>
      </div>

      <div class="rounded-xl bg-white/60 p-3 text-center shadow-sm">
        <div class="text-xs text-stone-500">Max</div>
        <div class="font-semibold text-stone-800">{{ formattedWidget.max }}</div>
      </div>
    </div>

  </div>
</template>
