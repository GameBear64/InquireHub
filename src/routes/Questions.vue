<script setup>
  import { onMounted, onUpdated, ref, shallowRef } from 'vue';
  import { useRoute } from 'vue-router'

  import QuestionBubble from '../components/Bubbles/QuestionBubble.vue';
  import Chat from '../components/Chat/Chat.vue';
  import Modal from '../components/Modal.vue';
  import Answers from '../components/QuestionPage/Answers.vue';
  import NewQuestionForm from '../components/QuestionPage/NewQuestionForm.vue';
  import Nothing from '../components/QuestionPage/Nothing.vue';
  import { successSnackBar } from '../utils/snackbars';
  import { useFetch } from '../utils/useFetch';

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
      <div
        v-for="question in questionsList"
        :key="question._id"
      >
        <QuestionBubble :question="question" />
      </div>
    </template>
    <component
      :is="rightSideView"
      :question="questionsList.find(q => q._id == route.params?.id)"
    />
  </MainLayout>
  <Modal
    v-show="showModal"
    :close="() => showModal = false"
    title="Ask a new question"
  >
    <NewQuestionForm @new-question="newQuestion" />
  </Modal>
</template>