<script setup>
  // watch route, if on answer, fetch answer
</script>

<template>
  <div class="mx-auto my-5 flex h-full w-1/2 flex-col items-center">
    <div
      v-for="i in 5"
      :key="i"
      class="w-full"
    >
      <router-link :to="`/question/aaaaa/${i}`">
        <div class="my-3 break-words rounded-lg border bg-white p-2 shadow-md">
          <p class="text-sm">
            go to chat
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>