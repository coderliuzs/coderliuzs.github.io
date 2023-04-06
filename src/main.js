import { createApp } from 'vue'
// import Button from 'vant'
import app from './App.vue'
import router from './router'
import pinia from './stores'

import "normalize.css"
import "./assets/css/index.css"

createApp(app).use(router).use(pinia).mount('#app')
