<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref} from "vue";
import LoginComponent from "@/components/loginComponent.vue";
import {Button} from "primevue";

const session = ref({})

async function loadSession(){
  const { data, error } = await supabase.auth.getSession()

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
  <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
    <LoginComponent v-if="!session" @loggedIn="loadSession"/>
    <div v-else>
      <header>
        <div class="wrapper text-center">
          <nav>
            <RouterLink to="/" class="text-lg mx-2">Home</RouterLink>
            <RouterLink to="/statistieken" class="text-lg mx-2">Statistieken</RouterLink>
            <Button @click="logout">Uitloggen</Button>
          </nav>
        </div>
      </header>
      <RouterView />
    </div>
  </div>
</template>
