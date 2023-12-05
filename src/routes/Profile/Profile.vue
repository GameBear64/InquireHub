<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import QuestionBubble from '@components/Bubbles/QuestionBubble.vue';
import Modal from '@components/Modal.vue';

import { useFetch } from '@utils/useFetch';

const route = useRoute()

const user = ref({})
const showFollowing = ref(false)

onMounted(() => {
  useFetch({url: `user/${route.params.id}`}).then((data) => {
    user.value = data;
  })
});

watch(() => route.path, () => {
  useFetch({url: `user/${route.params.id}`}).then((data) => {
    user.value = data;
  })
  showFollowing.value = false
})

</script>

<template>
  <div class="mx-auto my-24 max-w-lg">
    <img
      class="mx-auto h-32 w-32 rounded-full"
      :src="user?.picture ? `data:image/png;base64,${user.picture}` : '../../profilePic.jpeg'"
      alt="Profile picture"
    >
    <h2 class="mt-3 text-center text-2xl font-semibold">
      {{ user.name }}
    </h2>
  
    <div class="mt-5">
      <h3 class="text-xl font-semibold">
        Biography
      </h3>
      <p class="mt-2">
        {{ user.biography }}
      </p>
    </div>
    <div class="mt-4 flex p-4">
      <div class="w-1/2 text-center">
        <span class="font-bold">{{ user?.answered }}</span> Answers
      </div>
      <div class="w-0 border border-base-subtle" />
      <div
        class="w-1/2 cursor-pointer text-center"
        @click="() => showFollowing = true"
      >
        <span class="font-bold">{{ user?.following?.length }}</span> Following
      </div>
    </div>

    <hr>

    <h2 class="mt-10 text-xl font-semibold">
      Public questions
    </h2>

    <QuestionBubble
      v-for="question in user.questions"
      :key="question._id"
      :question="question"
    />
  </div>
  <Modal
    v-if="showFollowing"
    :close="() => showFollowing = false"
    easy-close
    :title="`${user.name} is following:`"
  >
    <div
      v-for="person in user.following"
      :key="person._id"
    >
      <router-link :to="`/profile/${person._id}`">
        {{ person.name }}
      </router-link>
    </div>
  </Modal>
</template>