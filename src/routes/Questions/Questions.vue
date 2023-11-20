<script setup>
  import { onMounted, onUpdated, ref, shallowRef } from 'vue';
  import { useRoute } from 'vue-router'

  import QuestionBubble from '@components/Bubbles/QuestionBubble.vue';
  import Chat from '@components/Chat/Chat.vue';
  import Modal from '@components/Modal.vue';

  import { successSnackBar } from '@utils/snackbars';
  import { useFetch } from '@utils/useFetch';

  import Answers from './views/Answers.vue';
  import NewQuestionForm from './views/NewQuestionForm.vue';
  import Nothing from './views/Nothing.vue';

  const route = useRoute()
  
  const showModal = ref(false)
  const questionsList = ref([])
  const rightSideView = shallowRef(Nothing)
  
  const setRightSide = () => {    
    rightSideView.value = route.params?.answer ? Chat : (route.params?.id ? Answers : Nothing);
  }

  onUpdated(() => setRightSide());

  onMounted(() => {
    setRightSide();
    useFetch({url: `questions`}).then((data) => {
      questionsList.value = data;
    })
  });

  const newQuestion = (state) => {
    showModal.value = false

    useFetch({url: 'questions', method: 'POST', body: state}).then((data) => {
      questionsList.value.unshift(data)
      successSnackBar('Question asked, expect replies soon')
    })
  }

</script>

<template>
  <MainLayout>
    <template #side>
      <button
        class="btn-big"
        @click="() => showModal = true"
      >
        Ask question
      </button>
      <QuestionBubble
        v-for="question in questionsList"
        :key="question._id"
        :question="question"
      />
    </template>
    <component
      :is="rightSideView"
      :question="questionsList.find(q => q._id == route.params?.id)"
    />
  </MainLayout>
  <Modal
    v-if="showModal"
    :close="() => showModal = false"
    title="Ask a new question"
  >
    <NewQuestionForm @new-question="newQuestion" />
  </Modal>
</template>