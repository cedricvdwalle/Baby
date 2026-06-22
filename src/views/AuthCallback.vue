<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {supabase} from "@/utils/supabase.js";

import {useToast} from 'primevue/usetoast';
import {Message} from "primevue";
const toast = useToast();

const router = useRouter()

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error)
  } else{
    router.push('/')
  }
})
</script>

<template>
  <p>Logging you in...</p>

  <Message v-if="error" severity="error" icon="pi pi-times-circle" class="mb-2">{{ message }}</Message>

</template>
