import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.baseURL = 'https://calendarapi.fallingsakura.top'

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$http = axios
app.use(pinia)
app.use(router)

app.mount('#app')
