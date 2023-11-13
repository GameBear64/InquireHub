import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import Login from './routes/Login.vue'
import Profile from './routes/Profile.vue'
import Questions from './routes/Questions.vue'
import Register from './routes/Register.vue'
import test from './routes/test.vue'
import { getCurrentUserId } from './utils/utils'
import App from './App.vue'

import './style.css'

const routes = [
  { path: '/', component: test },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/profile',
    children: [
      {
        path: '',
        redirect: { path: `/profile/${getCurrentUserId()}`, }
      },
      {
        path: ':id',
        component: Profile,
      },
    ],
  },
  { path: '/questions/:id?', component: Questions },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router } // so we can use it outside components

const app = createApp(App)
app.use(router)

app.mount('#app')
