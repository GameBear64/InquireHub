<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'

import NavBar from './components/Layout/NavBar.vue';
import { socket } from './utils/socket';
import { themes } from './main';

const route = useRoute()
const shouldShowNavbar = ref(false)

// show navbar based on route to avoid unauthorized access
watch(() => route.path, () => {
  shouldShowNavbar.value = !['/login', '/register'].includes(route.path)
})

onMounted(() => socket.connect())
</script>

<template>
  <div
    :class="`theme-${themes.mode} theme-${themes.color}`"
    class="flex h-screen flex-col bg-base text-onBase"
  >
    <NavBar v-show="shouldShowNavbar" />
    <div class="flex-1 overflow-x-auto">
      <router-view />
    </div>
  </div>
</template>