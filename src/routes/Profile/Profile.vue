<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useFetch } from '@utils/useFetch';

const { params } = useRoute()

const user = ref({})

onMounted(() => {
  useFetch({url: `user/${params.id}`}).then((data) => {
    user.value = data;
  })
});

</script>

<template>
  <div class="mx-auto my-32 max-w-lg">
    <img
      class="mx-auto h-32 w-32 rounded-full"
      src="https://picsum.photos/200"
      alt="Profile picture"
    >
    <h2 class="mt-3 text-center text-2xl font-semibold">
      {{ user.name }}
    </h2>
  
    <div class="mt-5">
      <h3 class="text-xl font-semibold">
        Biography
      </h3>
      <p class="mt-2 text-gray-600">
        John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.
      </p>
    </div>
    <div class="mt-4 flex p-4">
      <div class="w-1/2 text-center">
        <span class="font-bold">1.8 k</span> Answers
      </div>
      <div class="w-0 border border-gray-300" />
      <div class="w-1/2 text-center">
        <span class="font-bold">2.0 k</span> Followers
      </div>
    </div>

    <hr>

    <h2 class="mt-10 text-xl font-semibold">
      Public answers
    </h2>

    <div
      v-for="i in 10"
      :key="i"
    >
      <div class="my-4 break-words rounded-lg border bg-white p-4 shadow-lg">
        <p class="mb-2 text-lg">
          Question here
        </p>
        <p class="text-sm">
          More description here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vero tempora delectus!
        </p>
      </div>
    </div>
  </div>
</template>