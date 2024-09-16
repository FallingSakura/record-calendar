import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'calendar-login',
      component: () => import('../views/CalendarLoginView.vue')
    },
    {
      path: '/rigister',
      name: 'calendar-rigister',
      component: () => import('../views/CalendarRigisterView.vue')
    }
  ]
})

export default router
