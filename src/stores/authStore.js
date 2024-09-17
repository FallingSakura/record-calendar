import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isLoggedIn: false
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn
  },
  actions: {
    login(token) {
      this.token = token
      this.isLoggedIn = true
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
    },
    initialize() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.isLoggedIn = true
      }
    }
  }
})