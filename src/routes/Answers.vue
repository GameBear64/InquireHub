<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router'

  import AnswerBubble from '../components/Bubbles/AnswerBubble.vue';
  import { useFetch } from '../utils/useFetch';

  const route = useRoute()

  const answerList = ref([])

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
        <AnswerBubble :question="answer" />
      </div>
    </template>
    <div v-if="route.params?.id">
      aaaa ANSWER
    </div>
    <div v-else>
      no answer selected...
    </div>
  </MainLayout>
</template>