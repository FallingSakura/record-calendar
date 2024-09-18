import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/CalendarView.vue'
import { useAuthStore } from '../stores/authStore'


function isAuthenticated() {
  const authStore = useAuthStore()
  authStore.initialize()
  return authStore.isAuthenticated
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'calendar-login',
    component: () => import('../views/CalendarLoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'calendar-register',
    component: () => import('../views/CalendarRegisterView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'profile',
    children: [
      {
        path: 'changepassword',
        component: () => import('../views/ChangePassword.vue'),
        meta: { requiresAuth: true },
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      alert('haha')
      next({ path: '/' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isAuthenticated()) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
