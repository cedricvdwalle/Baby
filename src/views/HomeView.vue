<script setup lang="ts">
import {Button, InputText, InputGroup, InputGroupAddon, DatePicker, InputNumber} from "primevue";

import {supabase} from '../utils/supabase'
import {ref, onMounted} from "vue";

import GenderSelect from "@/components/form/GenderSelect.vue";
import BaseIcon from "@/assets/icon/BaseIcon.vue";

import {useToast} from 'primevue/usetoast';
const toast = useToast();

const session = ref()

type Gender = "jongen" | "meisje" | null

const guess = ref<{
  user_id: string | null
  gender: Gender
  name: string
  size: number | null
  weight: number | null
  time: Date | null,
  username: string | null
}>({
  user_id: null,
  gender: null,
  name: "",
  size: null,
  weight: null,
  time: null,
  username : null
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

    <InputGroup class="my-2">
      <InputGroupAddon>
        <i class="pi pi-user"/>
      </InputGroupAddon>
      <InputText name="name" type="text" placeholder="Mijn naam" class="w-full my-1" v-model="guess.username"
                 size="large"/>
    </InputGroup>

    <p class="fredoka-text my-2"> <i>{{ guess.username || 'Onbekende' }}</i>, tijd om een gokje te wagen, wat denk jij dat het wordt? Een kleine
      <span class="text-meisje inline-block">Yanan</span>
      of een kleine <span class="text-jongen inline-block">Cédric</span>?
      </p>

    <GenderSelect v-model="guess.gender" class="my-2" v-if="guess.username"/>

    <span v-if="guess.gender">
      <p class="fredoka-text my-2" > Een {{ guess.gender }}, wat wordt mijn naam dan?</p>

      <InputGroup>
        <InputGroupAddon>
          <BaseIcon name="babyBottle" size="35px"/>
        </InputGroupAddon>
        <InputText name="name" type="text" placeholder="Babynaam" class="w-full my-1" v-model="guess.name"
                   size="large"/>
      </InputGroup>
    </span>

    <span v-if="guess.name">
    <p class="fredoka-text my-2" > {{ guess.name }}, wie weet heb je wel gelijk, maar nu het moeilijkste, wat zal mijn gewicht en grootte zijn?</p>

    <div class="flex flex-col md:flex-row items-stretch gap-1 py-1">
      <InputGroup>
        <InputGroupAddon>
          <BaseIcon name="ruler" size="35px"/>
        </InputGroupAddon>
        <InputNumber v-model="guess.size" placeholder="Grootte" :useGrouping="false" />
        <InputGroupAddon>cm</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <BaseIcon name="scale" size="35px"/>
        </InputGroupAddon>
        <InputNumber v-model="guess.weight" placeholder="Gewicht" :useGrouping="false" />
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
    </span>
    <div class="w-full my-1 bg-amber-200/60! text-gray-600! border border-1 border-amber-200/60! text-center p-2 rounded hover:border-amber-300! cursor-pointer " @click="save()">Verzend</div>
  </div>
</template>

