import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_URL

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$http = axios
app.use(pinia)
app.use(router)

app.mount('#app')
