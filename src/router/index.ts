import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/statistieken',
      name: 'stastistics',
      component: () => import('../views/StatisticsView.vue'),
    },
  ],
})

export default router
