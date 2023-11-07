<script setup>
import HelloWorld from '../components/HelloWorld.vue';
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center bg-neutral-900 text-neutral-50">
    <div class="flex flex-row gap-10 p-4">
      <a
        href="https://vitejs.dev"
        target="_blank"
      >
        <img
          src="/vite.svg"
          class="h-32"
          alt="Vite logo"
        >
      </a>
      <a
        href="https://vuejs.org/"
        target="_blank"
      >
        <img
          src="../assets/vue.svg"
          class="h-32"
          alt="Vue logo"
        >
      </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>
