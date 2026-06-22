<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {supabase} from "@/utils/supabase.js";

const router = useRouter()

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error)
  }

  if (data.session) {
    router.push('/')
  } else {
    router.push('/')
  }
})
</script>

<template>
  <p>Logging you in...</p>
</template>
