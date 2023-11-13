<script setup>
import NavBar from './components/Layout/NavBar.vue';
</script>

<template>
  <div class="flex h-screen flex-col">
    <NavBar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>