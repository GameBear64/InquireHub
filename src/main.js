import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@components/Layout/MainLayout.vue'

import NotFound from '@utils/NotFound.vue'
import { clickOutside, getCurrentUserId } from '@utils/utils'

import Answers from './routes/Answers/Answers.vue'
import Login from './routes/Login/Login.vue'
import Profile from './routes/Profile/Profile.vue'
import Questions from './routes/Questions/Questions.vue'
import Register from './routes/Register/Register.vue'
import Settings from './routes/Settings/Settings.vue'
import App from './App.vue'

import './style.css'

// this reactive signal can be used as a global state as well (no dependencies required)
export const themes = reactive({
  mode: localStorage.getItem('theme-mode') || 'dark',
  color: localStorage.getItem('theme-color') || 'orange'
});

const routes = [
  { path: '/', redirect: { path: '/answers' } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/profile',
    children: [
      {
        path: '',
        redirect: { path: `/profile/${getCurrentUserId()}` }
      },
      {
        path: ':id',
        component: Profile,
      },
    ],
  },
  { path: '/settings', component: Settings },
  { path: '/questions/:id?/:answer?', alias: ['/question/:id?/:answer?'], component: Questions },
  { path: '/answers/:id?', alias: ['/answer/:id?'], component: Answers },

  // Weird way to match but thats what the documentation says
  { path: '/:pathMatch(.*)*', component: NotFound } 
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'border-b border-primary',
  routes,
})

router.beforeEach((to, from, next) => {
  const noAuthPage = ['/login', '/register'].includes(to.path);
  const loggedIn = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);

  if (noAuthPage || loggedIn) next();
  else next('/login');
});

export { router } // so we can use it outside components

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.directive("click-outside", clickOutside)
app.component('MainLayout', MainLayout) // just to try it out, very cool
app.use(router)

app.mount('#app')
