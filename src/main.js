import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from './components/Layout/MainLayout.vue'
import Answers from './routes/Answers.vue'
import Login from './routes/Login.vue'
import Profile from './routes/Profile.vue'
import Questions from './routes/Questions.vue'
import Register from './routes/Register.vue'
import Settings from './routes/Settings.vue'
import NotFound from './utils/NotFound.vue'
import { getCurrentUserId } from './utils/utils'
import App from './App.vue'

import './style.css'

const routes = [
  { path: '/', redirect: { path: '/answers' } },
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
  { path: '/settings', component: Settings },
  { path: '/questions/:id?/:answer?', component: Questions },
  { path: '/answers/:id?', component: Answers },

  // Weird way to match but thats what the documentation says
  { path: '/:pathMatch(.*)*', component: NotFound } 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const noAuthPage = ['/login', '/register'].includes(to.path);
  const loggedIn = localStorage.getItem('hub-token');

  if (noAuthPage || loggedIn) next();
  else next('/login');
});

export { router } // so we can use it outside components

const app = createApp(App)
app.component('MainLayout', MainLayout) // just to try it out, very cool
app.use(router)

app.mount('#app')
