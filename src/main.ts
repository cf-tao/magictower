import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import GameCanvas from './components/GameCanvas.vue'

const app = createApp(App)

app.component('GameCanvas', GameCanvas)
app.use(createPinia())
app.use(router)

app.mount('#app')
