import './assets/style/main.css'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

import Aura from '@primeuix/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService);
app.component('Toast', Toast);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#app')
