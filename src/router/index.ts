import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/guess/GuessView.vue'),
    },
    {
      path: '/statistieken',
      name: 'stastistics',
      component: () => import('../views/StatisticsView.vue'),
    },
    {
      path: '/auth/callback',
      name: 'AuthCallback',
      component: () => import('../views/AuthCallback.vue'),
    },
  ],
})

export default router
