<script setup lang="ts">

import {supabase} from "@/utils/supabase.ts";
import {Button, InputText, InputGroup, InputGroupAddon,Message} from "primevue";
import {ref} from "vue";

const email = ref('')
const code = ref('')
const step = ref('request') // request | verify
const feedback = ref({})

const emit = defineEmits<{
  loggedIn: []
}>()

const send = async () => {
  const { data, error } = await supabase.auth.signInWithOtp({ email: email.value })
  if(error) {
    feedback.value = error
  }
  else{
    feedback.value = null
    step.value = 'verify'
  }
}

async function resend(){
  step.value = 'request'
}

const verify = async () => {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.value,
    token: code.value,
    type: 'email'
  })

  if(error) {
    feedback.value = null
    feedback.value = error
  }
  else{
    emit('loggedIn')
  }
}

</script>

<template>
  <div class="container">
    <div class="min-h-screen flex items-center justify-center" >
      <div class="w-full max-w-2xl space-y-4">

        <div class="text-4xl text-center">Raad met ons mee!</div>

        <div v-if="step === 'request'">
          <p class="text-center">
            Vul je e-mail adres in, hierop ontvang je een éénmalige code.
          </p>
          <div class="flex w-full gap-1">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-at"></i>
              </InputGroupAddon>
              <InputText v-model="email" placeholder="email" class="flex-1" size="large" />
            </InputGroup>

            <Button @click="send">Verzend</Button>
          </div>
        </div>

        <div v-else>
          <p class="text-center">
            Vul je e-mail code in die je per mail hebt ontvangen.
            Opgelet hij durft wel eens in <span class="font-bold">spam</span> te belanden!
          </p>
          <div class="flex gap-2">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-key"></i>
              </InputGroupAddon>
              <InputText v-model="code" placeholder="code" class="flex-1" size="large"/>
            </InputGroup>

            <Button @click="verify">Inloggen</Button>
            <Button @click="resend">Opnieuw</Button>
          </div>
        </div>

        <Message v-if="feedback?.message" severity="error" icon="pi pi-times-circle" class="mb-2">{{ feedback.message }}</Message>

      </div>
    </div>
  </div>
</template>
