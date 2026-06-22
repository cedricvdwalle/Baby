<script setup lang="ts">
import {Button, InputText, InputGroup, InputGroupAddon, DatePicker} from "primevue";

import {supabase} from '../utils/supabase'
import {ref, onMounted} from "vue";

import {useToast} from 'primevue/usetoast';
import GenderSelect from "@/components/form/GenderSelect.vue";
import BaseIcon from "@/assets/icon/BaseIcon.vue";

const toast = useToast();
const session = ref()

type Gender = "jongen" | "meisje" | null

const guess = ref<{
  user_id: string | null
  gender: Gender
  name: string
  size: number | null
  weight: number | null
  time: Date | null
}>({
  user_id: null,
  gender: null,
  name: "",
  size: null,
  weight: null,
  time: null
})

async function loadSession() {
  const {data, error} = await supabase.auth.getSession()

  if (error) {
    console.error(error)
    return
  }

  session.value = data.session
  guess.value.user_id = data.session?.user.id || null
}

async function loadExistingGuess() {
  const {data} = await supabase.schema('Baby')
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

async function save() {
  const {data, error} = await supabase.schema('Baby').from('Guesses').upsert([
    guess.value,
  ]).select().single() // optional: returns inserted row

  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Verstuurd!',
      detail: 'Antwoord is doorgestuurd',
      life: 3000
    });
    guess.value = data
  } else {
    toast.add({
      severity: 'error',
      summary: 'Fout!',
      detail: error?.message || '',
      life: 3000
    });
  }
}

</script>

<template>
  <div>
    <span class="fredoka-text font-bold text-3xl">Dit is mijn gokje!</span>

    <p class="fredoka-text"> Tijd om een gokje te wagen, wat denk jij dat het wordt? Een kleine
      Yanan
      of een kleine Cédric? </p>


    <GenderSelect v-model="guess.gender" class="my-2"/>

    <InputGroup>
      <InputGroupAddon>
        <BaseIcon name="babyBottle" size="35px"/>
      </InputGroupAddon>
      <InputText name="name" type="text" placeholder="Naam" class="w-full my-1" v-model="guess.name"
                 size="large"/>
    </InputGroup>



    <div class="flex flex-col md:flex-row items-stretch gap-1 py-1">
      <InputGroup>
        <InputGroupAddon>
          <BaseIcon name="ruler" size="35px"/>
        </InputGroupAddon>
        <InputNumber v-model="guess.size" placeholder="Grootte"/>
        <InputGroupAddon>cm</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <BaseIcon name="scale" size="35px"/>
        </InputGroupAddon>
        <InputNumber v-model="guess.weight" placeholder="Gewicht"/>
        <InputGroupAddon>gram</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <BaseIcon name="clock" size="35px"/>
        </InputGroupAddon>
        <DatePicker v-model="guess.time" :inputProps="{ readonly: true }"
                    placeholder="Datum en tijstip" showTime hourFormat="24"/>
      </InputGroup>
    </div>
    <Button class="w-full my-1 bg-secondary" @click="save()">Verzend</Button>
  </div>
</template>

