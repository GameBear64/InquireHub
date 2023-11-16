<script setup>
import { themes } from '../main';
</script>

<template>
  <p class="bg-base text-primary">
    hello im settings
  </p>

  <h1 class="text-2xl">
    change mode
  </h1>

  <div class="flex gap-4">
    <button @click="() => themes.mode = 'light'">
      light
    </button>
    <button @click="() => themes.mode = 'dark'">
      dark
    </button>
  </div>

  <h1 class="text-2xl">
    change theme
  </h1>

  <div class="flex gap-4">
    <button
      v-for="color in ['orange', 'red', 'green', 'blue', 'violet', 'pink']"
      :key="color"
      @click="() => themes.color = color"
    >
      {{ color }}
    </button>
  </div>
</template>