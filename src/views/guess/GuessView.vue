<script setup lang="ts">
import {InputText, InputGroup, InputGroupAddon, DatePicker, InputNumber, Dialog, Textarea} from "primevue";
import type {Guess} from '@/models/Guess.ts'

import {supabase} from '@/utils/supabase.ts'
import {ref, onMounted} from "vue";

import GenderSelect from "@/views/guess/form/GenderSelect.vue";
import BaseIcon from "@/assets/icon/BaseIcon.vue";
import Card from "@/components/Card.vue";
import TitleNumber from "@/components/TitleNumber.vue";
import PassportView from "@/views/guess/component/PassportView.vue";
import Button from "@/components/Button.vue";

import {useToast} from 'primevue/usetoast';
import GuessAnswer from "@/views/guess/component/GuessAnswer.vue";

const toast = useToast();

const session = ref()
const visible = ref(false);

const guess = ref<Guess>({
  user_id: null,
  gender: null,
  name: "",
  size: null,
  weight: null,
  time: null,
  username: null,
  advice : null
})

const guessObject = ref<Guess>()

async function loadSession() {
  const {data, error} = await supabase.auth.getSession()

  if (error) {
    console.error(error)
    return
  }

  session.value = data.session
  guess.value.user_id = data.session?.user.id || null
}

async function updateObject() {
  guessObject.value = {...guess.value}
}

async function loadExistingGuess() {
  const {data} = await supabase.schema('Baby')
    .from('Guesses')
    .select('*')
    .eq('user_id', session.value.user.id)
    .maybeSingle()

  if (data) {
    guess.value = data
    updateObject()
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
    visible.value = true
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
  <span class="font-bold text-3xl">Dit is mijn gokje!</span>
  <form @focusout="updateObject">
    <Card id="username">
      <TitleNumber number="1" title="Mijn gegevens"/>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"/>
        </InputGroupAddon>
        <InputText name="name" type="text" placeholder="Mijn naam" class="w-full my-1"
                   v-model="guess.username"
                   size="large"/>
      </InputGroup>
    </Card>


    <Card id="gender" v-if="guessObject?.username">
      <TitleNumber number="2" title="Geslacht"/>
      <p class="my-2">
        <!-- <i class="text-lg drop-shadow-lg">{{ guess.username || 'Onbekende' }}</i>,-->
        <GuessAnswer>{{ guess.username || 'Onbekende' }}</GuessAnswer>
        tijd om een gokje
        te
        wagen, wat denk jij dat het wordt? Een kleine
        <span class="text-meisje inline-block bg-meisje/70 rounded-full px-2 border-meisje border-1">Yanan</span>
        of een kleine <span class="text-jongen inline-block bg-jongen/70 rounded-full px-2 border-jongen border-1">Cédric</span>
      </p>

      <GenderSelect v-model="guess.gender" class="my-2" v-if="guessObject?.username"
                    @update:modelValue="updateObject"/>
    </Card>


    <card v-if="guessObject?.gender">
      <TitleNumber number="3" title="Naam"/>
      <p class="my-2"> Een <GuessAnswer>{{ guess.gender || 'Onbekende' }}</GuessAnswer>, wat wordt mijn naam dan?</p>

      <InputGroup>
        <InputGroupAddon>
          <BaseIcon name="babyBottle" size="35px"/>
        </InputGroupAddon>
        <InputText name="name" type="text" placeholder="Babynaam" class="w-full my-1"
                   v-model="guess.name"
                   size="large"/>
      </InputGroup>
    </card>

    <card v-if="guessObject?.name">
      <TitleNumber number="4" title="Datum, gewicht en lengte"/>
      <p>  <GuessAnswer>{{ guess.name || 'Onbekende' }}</GuessAnswer>, wie weet heb je wel gelijk, maar nu het
        moeilijkste! </p>
      <p>
        Op welke datum zal ik geboren worden en wat zal mijn lengte en gewicht zijn?
      </p>

      <div class="flex flex-col md:flex-row items-stretch gap-1 py-1">
        <InputGroup>
          <InputGroupAddon>
            <BaseIcon name="clock" size="35px"/>
          </InputGroupAddon>
          <DatePicker v-model="guess.time" :inputProps="{ readonly: true }"
                      placeholder="Datum en tijstip" showTime hourFormat="24" hideOnDateSelect
                      :manualInput="false" @blur="updateObject"/>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <BaseIcon name="ruler" size="35px"/>
          </InputGroupAddon>
          <InputNumber v-model="guess.size" placeholder="Grootte" :useGrouping="false"/>
          <InputGroupAddon>cm</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <BaseIcon name="scale" size="35px"/>
          </InputGroupAddon>
          <InputNumber v-model="guess.weight" placeholder="Gewicht" :useGrouping="false"/>
          <InputGroupAddon>gram</InputGroupAddon>
        </InputGroup>


      </div>
    </card>

    <card v-if="guessObject?.weight">
      <TitleNumber number="5" title="Advies"/>
      <p class="my-2"> Geef een advies voor mij of mijn ouders!</p>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-lightbulb"></i>
        </InputGroupAddon>

        <Textarea v-model="guess.advice" rows="5" fluid />
      </InputGroup>

    </card>

    <Button @click="save()">Verzend</Button>
  </form>

  <Dialog v-model:visible="visible"
          modal header="Verzonden!"
          class="w-[95vw] md:w-[50rem]"
          pt:root:class="!bg-amber-200/90 !border-0 !bg-yellow-50/90"
          pt:content:class="!p-1 md:!p-4 lg:!p-4"
          >
    <template #header>
      <div class="text-3xl font-bold">
        Verzonden!
      </div>
    </template>
    <div class="flex flex-col">
      <PassportView :person="guess"/>
    </div>
  </Dialog>

</template>

