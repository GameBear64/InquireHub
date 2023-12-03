<script setup>
import { getCurrentUserId } from '../../utils/utils'
import Icon from '../Icon.vue'
</script>

<template>
  <nav class="flex h-12 w-full items-center justify-between border-b border-base-subtle bg-base px-4 shadow">
    <div class="flex h-11 items-center gap-5 text-primary">
      <router-link
        class="inline-block p-2 text-lg font-medium no-underline hover:bg-base-subtle hover:text-onBase"
        to="/questions"
      >
        Questions
      </router-link>
      <router-link
        class="inline-block p-2 text-lg font-medium no-underline hover:bg-base-subtle hover:text-onBase"
        to="/answers"
      >
        Answers
      </router-link>
    </div>
    <div class="flex h-11 items-center gap-4">
      <router-link
        class="px-2 py-1 hover:bg-base-subtle hover:text-onBase"
        :to="`/profile/${getCurrentUserId()}`"
      >
        <Icon
          class="text-3xl"
          icon="person"
        />
      </router-link>
      <router-link
        class="px-2 py-1 hover:bg-base-subtle hover:text-onBase"
        to="/settings"
      >
        <Icon
          class="text-3xl"
          icon="settings"
        />
      </router-link>
    </div>
  </nav>
</template>