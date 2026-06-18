<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref} from "vue";
import LoginComponent from "@/components/loginComponent.vue";
import {Button} from "primevue";
import type { Session } from '@supabase/supabase-js'

const session = ref<Session | null>(null)

async function loadSession() {
  const {data, error} = await supabase.auth.getSession()

  if (error) {
    console.error(error)
    return
  }

  session.value = data.session
}

async function logout() {
  await supabase.auth.signOut()
  await loadSession()
}

onMounted(async () => {
  await loadSession()
})
</script>

<template>
  <div class="bg-wedding min-h-screen">
    <header v-if="session">
      <div class="wrapper text-center p-2 mb-2 ">
        <nav>
          <RouterLink to="/" class="text-lg mx-2">Home</RouterLink>
          <RouterLink to="/statistieken" class="text-lg mx-2">Statistieken</RouterLink>
          <Button @click="logout">Uitloggen</Button>
        </nav>
      </div>
    </header>
    <div>
      <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
        <LoginComponent v-if="!session" @loggedIn="loadSession"/>
        <div v-else>
          <RouterView/>
        </div>
      </div>
    </div>
  </div>
</template>
