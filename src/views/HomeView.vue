<script setup lang="ts">
import SelectButton from "primevue/selectbutton"
import {Button, InputNumber, InputText, InputGroup, InputGroupAddon, DatePicker} from "primevue";

import {supabase} from '../utils/supabase'
import {ref, onMounted} from "vue";
import IconBody from "@/components/svg/IconBody.vue";
import IconRuler from "@/components/svg/IconRuler.vue";
import IconScale from "@/components/svg/IconScale.vue";
import IconClock from "@/components/svg/IconClock.vue";

const session = ref()

const guess = ref({
  user_id: null,
  gender: "",
  name: "",
  size: null,
  weight: null,
  time: null
})

async function loadSession(){
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error)
    return
  }

  session.value = data.session
  guess.value.user_id = data.session.user.id
}

async function loadExistingGuess(){
  const { data } = await supabase.schema('Baby')
    .from('Guesses')
    .select('*')
    .eq('user_id', session.value.user.id)
    .maybeSingle()

  if (data) {
    guess.value = data
  }
}

onMounted(async () => {
  await loadSession()
  await loadExistingGuess()
})

const options = ref([
  {label: 'Jongen', value: 'Jongen', color: "#dfebeb"},
  {label: 'Meisje', value: 'Meisje', color: "#f6ded8"}
])

async function save() {
  const {data} = await supabase.schema('Baby').from('Guesses').upsert([
    guess.value,
  ]).select().single() // optional: returns inserted row

  if (data) {
    guess.value = data
  }
}

</script>

<template>
  <div class="bg-light p-4 rounded-md">
    <span class="fredoka-text font-bold text-3xl">Raad onze baby!</span>

    <p class="fredoka-text"> Tijd om een gokje te wagen, wat denk jij dat het wordt? Een kleine Yanan
      of een kleine Cédric? </p>
    <SelectButton
      v-model="guess.gender"
      :options="options"
      optionLabel="label"
      optionValue="value"
      fluid
    >
      <!-- custom option rendering -->
      <template #option="{ option }">
        <div class="flex flex-col items-center gap-1 py-1">
          <IconBody :color="option.color" class="w-50 h-50 object-cover rounded"/>
          <span class="text-xl">{{ option.label }}</span>
        </div>
      </template>
    </SelectButton>


    <InputText name="name" type="text" placeholder="Naam" class="w-full my-1" v-model="guess.name"
               size="large"/>

    <div class="flex flex-col md:flex-row items-stretch gap-4 py-1">
      <InputGroup>
        <InputGroupAddon>
          <IconRuler color="#000000"/>
        </InputGroupAddon>
        <InputText v-model="guess.size" placeholder="Grootte"/>
        <InputGroupAddon>cm</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <IconScale color="#000000"/>
        </InputGroupAddon>
        <InputText v-model="guess.weight" placeholder="Gewicht"/>
        <InputGroupAddon>gram</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <IconClock color="#000000"/>
        </InputGroupAddon>
        <DatePicker v-model="guess.time" :inputProps="{ readonly: true }" placeholder="Datum en tijstip" showTime hourFormat="24"/>
      </InputGroup>
    </div>

    <Button class="w-full my-1" @click="save()">Verzend</Button>
  </div>

</template>

