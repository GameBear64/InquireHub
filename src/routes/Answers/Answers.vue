<script setup>
  import { onMounted, provide, ref } from 'vue';
  import { useRoute } from 'vue-router'

  import QuestionBubble from '@components/Bubbles/QuestionBubble.vue';
  import Chat from '@components/Chat/Chat.vue'

  import { useFetch } from '@utils/useFetch';

  const route = useRoute()

  const answerList = ref([])

  const refetch = () => {
    useFetch({url: `answers`}).then((data) => {
      answerList.value = data;
    })
  }

  onMounted(() => {
    useFetch({url: `answers`}).then((data) => {
      answerList.value = data;
    })
  });

  const newQuestion = () => {
    useFetch({url: 'answers/new'}).then((data) => {
      answerList.value.unshift({...data, new: true});
    })
  }

  provide('refetchQuestions', refetch)
</script>

<template>
  <MainLayout>
    <template #side>
      <button
        class="btn-big"
        @click="newQuestion"
      >
        Get question
      </button>
      <div
        v-for="answer in answerList"
        :key="answer._id"
      >
        <QuestionBubble
          :question="answer"
          :link="`/answer/${answer?._id}`"
        />
      </div>
    </template>
    <Chat v-if="route.params?.id" />
    <div
      v-else
      class="flex h-full flex-col items-center justify-center"
    >
      <p>Select an answer from the list to the right</p>
    </div>
  </MainLayout>
</template>