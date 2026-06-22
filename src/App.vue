<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {supabase} from "@/utils/supabase.ts";
import {onMounted, ref} from "vue";
import LoginComponent from "@/components/loginComponent.vue";
import {Button} from "primevue";
import type {Session} from '@supabase/supabase-js'
import MenuComponent from "@/components/MenuComponent.vue";

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
  <Toast/>
  <div class="bg-wedding min-h-screen p-2">
    <div>
      <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
        <LoginComponent v-if="!session" @loggedIn="loadSession"/>
        <div v-else>
          <div class="bg-neutral-100/50 rounded-2xl shadow-lg">
            <MenuComponent @logout="logout"/>
            <div class="w-full bg-yellow-50 p-3 rounded-t-2xl rounded-b-2xl">
              <RouterView/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
