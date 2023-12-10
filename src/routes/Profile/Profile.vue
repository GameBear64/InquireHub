<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import QuestionBubble from '@components/Bubbles/QuestionBubble.vue';
import Modal from '@components/Modal.vue';

import { useUserStore } from '@utils/store';
import { useFetch } from '@utils/useFetch';

import FollowBtn from './views/FollowBtn.vue';

const route = useRoute()

const { userId } = useUserStore()

const user = ref({})
const showFollowing = ref(false)

const refetch = () => {
  useFetch({url: `user/${route.params?.id}`}).then((data) => {
    user.value = data;
  })
}

onMounted(() => refetch());

watch(() => route.path, () => {
  if (!route.path.includes('profile')) return;  
  refetch()
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
    
    <div
      v-if="route.params.id !== userId"
      class="my-4 flex w-full justify-center"
    >
      <FollowBtn
        :id="route.params.id"
        :im-following="user.imFollowing"
        :refetch="refetch"
      />
    </div>
    
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
        <span class="font-bold">{{ user?.questions || 0 }}</span> Questions
      </div>
      <div class="w-0 border border-base-subtle" />
      <div class="w-1/2 text-center">
        <span class="font-bold">{{ user?.answered || 0 }}</span> Answers
      </div>
      <div class="w-0 border border-base-subtle" />
      <div
        class="w-1/2 cursor-pointer text-center"
        @click="() => showFollowing = true"
      >
        <span class="font-bold">{{ user?.following?.length || 0 }}</span> Following
      </div>
    </div>

    <hr class="border-b border-primary">

    <h2 class="mt-10 text-xl font-semibold">
      Public questions
    </h2>

    <QuestionBubble
      v-for="question in user.publicQuestions"
      :key="question._id"
      :question="question"
      :link="question?.author === userId ? `/question/${question?._id}` : `/answer/${question?._id}`"
    />
  </div>
  <Modal
    v-if="showFollowing"
    :close="() => showFollowing = false"
    easy-close
    :title="`${user.name} is following:`"
  >
    <p
      v-if="user.following.length === 0"
      class="my-5 text-center"
    >
      You have not followed anyone yet
    </p>
    
    <div
      v-for="person in user.following"
      :key="person._id"
      class="my-2 rounded bg-base-moderate px-2 py-1"
    >
      <router-link :to="`/profile/${person._id}`">
        {{ person.name }}
      </router-link>
    </div>
  </Modal>
</template>