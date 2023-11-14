<script setup>
  import { onMounted, ref } from 'vue';

  // import { useRoute } from 'vue-router'
  import Modal from '../components/Modal.vue';
  import NewQuestionForm from '../components/QuestionPage/NewQuestionForm.vue';
  import { successSnackBar } from '../utils/snackbars';
  import { useFetch } from '../utils/useFetch';

  // const { params } = useRoute()
  
  const showModal = ref(false)
  const questionsList = ref([])
  
  onMounted(() => {
    useFetch({url: `question`}).then((data) => {
      questionsList.value = data;
    })
  });

  const newQuestion = (state) => {
    showModal.value = false

    useFetch({url: 'question', method: 'POST', body: state}).then((data) => {
      if (data?.status) return;
      
      successSnackBar('Question asked, expect replies soon')
    })
  }

</script>

<template>
  <MainLayout>
    <template #side>
      <button
        class="focus:shadow-outline-indigo m-auto mt-2 flex w-5/6 justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-lg font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:outline-none active:bg-indigo-700"
        @click="() => showModal = true"
      >
        Ask question
      </button>
      <div
        v-for="question in questionsList"
        :key="question._id"
      >
        <div class="mx-2 my-4 break-words rounded-lg border bg-white p-2 shadow-md">
          <p
            v-if="question?.title"
            class="mb-2 text-lg"
          >
            {{ question.title }}
          </p>
          <p class="text-sm">
            {{ question.body }}
          </p>
        </div>
      </div>
    </template>
    <div>aaaa</div>
  </MainLayout>
  <Modal
    v-show="showModal"
    :close="() => showModal = false"
    title="Ask a new question"
    class="w-1/3"
  >
    <NewQuestionForm @new-question="newQuestion" />
  </Modal>
</template>