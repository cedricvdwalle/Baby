import './assets/style/main.css'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService);
app.component('Toast', Toast);


const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      0:   '#ffffff',
      50:  '#fefce8', // base background (your light cream)
      100: '#fdf6d0',
      200: '#fbecad',
      300: '#feeb9f', // primary accent (soft yellow)
      400: '#f8df84',
      500: '#f4cf5d',
      600: '#e6c86f',
      700: '#caa84f',
      800: '#9b7d33',
      900: '#6b5322'
    }
  }
});

app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
});

app.mount('#app')
