<script setup>
  import Icon from '@components/Icon.vue';

  import { themes } from '../../../main';

  const changeThemeMode = (mode) => {
    localStorage.setItem('theme-mode', mode);
    themes.mode = mode
  }

  const changeThemeColor = (color) => {
    localStorage.setItem('theme-color', color);
    themes.color = color
  }
</script>

<template>
  <h2 class="mt-12 text-3xl">
    Theme
  </h2>
  <hr class="my-2 border-b border-primary">

  <div class="flex flex-wrap items-center justify-between">
    <div class="flex gap-2">
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-black"
        @click="() => changeThemeMode('light')"
      >
        <Icon icon="light_mode" />
      </button>
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white"
        @click="() => changeThemeMode('dark')"
      >
        <Icon icon="dark_mode" />
      </button>
    </div>
    <p class="pb-1 text-4xl font-bold">
      +
    </p>
    <div class="flex gap-2">
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500"
        @click="() => changeThemeColor('orange')"
      />
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
        @click="() => changeThemeColor('red')"
      />
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500"
        @click="() => changeThemeColor('green')"
      />
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500"
        @click="() => changeThemeColor('blue')"
      />
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500"
        @click="() => changeThemeColor('violet')"
      />
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500"
        @click="() => changeThemeColor('pink')"
      />
    </div>
  </div>
</template>