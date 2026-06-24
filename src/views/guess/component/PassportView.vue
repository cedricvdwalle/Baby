<template>
  <div class="bg-white shadow-lg font-sans max-w-[1000px] w-full rounded-lg" v-if="person">
    <!-- Top government header -->
    <div class="bg-gradient-to-r from-emerald-300 to-blue-300 text-white px-4 py-2 flex items-center rounded-t-lg overflow-hidden">
      <div class="text-lg tracking-widest uppercase flex gap-1 items-center w-full">
        <div class="flex gap-4">
          <div>
            <div class="font-bold">belgie</div>
            <div class="text-[10px]">Identiteitskaart</div>
          </div>

          <span class="hidden sm:block">
            <div>
            <div class="font-bold">belgique</div>
            <div class="text-[10px]">carte d'identité</div>
          </div>

          <div>
            <div class="font-bold">belgien</div>
            <div class="text-[10px]">personalausweis</div>
          </div>

          <div>
            <div class="font-bold">belgium</div>
            <div class="text-[10px]">identity card</div>
          </div>
          </span>
        </div>
      </div>
      <div class="ml-auto w-10 flex-shrink-0 shadow-lg">
        <img src="@/assets/img/identity-be.jpg" />
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:p-4 p-1 flex gap-1 items-stretch bg-gradient-to-r from-emerald-200 to-emerald-50 rounded-b-lg">

      <!-- Photo -->
      <div class="lg:w-50 w-28 bg-yellow-50 flex items-center justify-center rounded-lg shadow-md" :class="person.gender == 'jongen' ? 'bg-jongen' : 'bg-meisje'">
        <BaseIcon name="baby" size="120px" :class="person.gender == 'jongen' ? 'text-jongen' : 'text-meisje'" />
      </div>

      <!-- Identity grid -->
      <div class="flex-1 text-sm">

        <div class="grid md:grid-cols-2 gap-x-1 gap-y-1 lg:text-lg/5">

          <IdentityLabel label="Naam" value="van de Walle"/>
          <IdentityLabel label="Voornaam" :value="person.name"/>
          <IdentityLabel label="Geboortedatum" :value="new Date(person.time).toLocaleDateString('nl-BE') "/>
          <IdentityLabel label="Geslacht" :value="person.gender"/>
          <IdentityLabel label="Grootte" :value="person.size"/>
          <IdentityLabel label="Gewicht" :value="person.weight"/>
          <IdentityLabel label="Nationaliteit" value="Belg"/>
          <IdentityLabel label="Rijksregisternummer" :value="formatRegistry(person.time)"/>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import BaseIcon from "@/assets/icon/BaseIcon.vue";
import IdentityLabel from "@/views/guess/component/subcomponent/IdentityLabel.vue";
import dayjs from "dayjs";


defineProps({
  person: Object
})

function formatRegistry(date : Date){
  if(date){
    const registry = dayjs(date).format("YY.MM.DD")+"-"+Math.floor(100 + Math.random() * 900)+"."+Math.floor(10 + Math.random() * 90)
    //return date.day;
    return registry;
  }
  else return "";
}

</script>
