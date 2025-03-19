import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

axios.defaults.baseURL = import.meta.env.VITE_URL

const app = createApp(App)
const pinia = createPinia()
const options = {
  transition: 'Vue-Toastification__fade'
}

app.config.globalProperties.$http = axios
app.use(pinia)
app.use(router)
app.use(Toast, options)

app.mount('#app')
