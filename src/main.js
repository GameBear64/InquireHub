import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import Login from './routes/Login.vue'
import Register from './routes/Register.vue'
import test from './routes/test.vue'
import App from './App.vue'

import './style.css'

const routes = [
  { path: '/', component: test },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
  // /questions
  // /answers
  // /user/:id
  // /settings
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router } // so we can use it outside components

const app = createApp(App)
app.use(router)

app.mount('#app')
