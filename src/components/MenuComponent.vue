<script setup lang="ts">

import {ref} from "vue";

const emit = defineEmits<{
  (e: 'logout'): void
}>()

import {Button} from "primevue";
import {RouterLink} from "vue-router";

import {useRoute} from "vue-router"

const route = useRoute()

const menuItems = ref([
  {to: "/", icon: 'pi-lightbulb', label: 'Mijn gokje'},
  {to: "/statistieken", icon: 'pi-users', label: 'Wat denkt de rest?'},
])

</script>

<template>
  <div class="flex items-center justify-between gap-3 px-1">
    <div class="flex items-center gap-3 ml-5">
      <span class="flex items-center" v-for="item in menuItems">
        <span :class="route.path === item.to ? 'bg-yellow-50 rounded-t-md' : ''" class="p-2">
          <RouterLink :to="item.to" class="text-lg"><i class="pi m-1" :class="item.icon"></i>
            <span class="hidden md:inline-block"> {{ item.label }}</span>
          </RouterLink>
        </span>
      </span>
    </div>

    <span class="flex items-center">
      <Button @click="emit('logout')" link><i class="pi pi-power-off m-1"></i></Button>
    </span>
  </div>
</template>

<style scoped>

</style>
