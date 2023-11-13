<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

import NavBar from './components/Layout/NavBar.vue';

const route = useRoute()
const shouldShowNavbar = ref(false)

// show navbar based on route to avoid unauthorized access
watch(() => route.path, () => {
  shouldShowNavbar.value = !['/login', '/register'].includes(route.path)
})
</script>

<template>
  <div class="flex h-screen flex-col">
    <NavBar v-show="shouldShowNavbar" />
    <div class="flex-1 overflow-x-auto">
      <router-view />
    </div>
  </div>
</template>