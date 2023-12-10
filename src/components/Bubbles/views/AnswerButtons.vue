<script setup>
  import { inject, ref } from 'vue'

  import Icon from '@components/Icon.vue';
  import Modal from '@components/Modal.vue';

  import { successSnackBar } from '@utils/snackbars';
  import { useFetch } from '@utils/useFetch';

  const props = defineProps(['question', 'isAnswer'])
  const refetchQuestions = inject('refetchQuestions')

  const deleteMessageModal = ref(false)

  const deleteQuestion = () => {
    useFetch({url: `answer/${props.question._id}`, method: 'DELETE'}).then(() => {
      deleteMessageModal.value = false
      successSnackBar('Answer successfully deleted')
      refetchQuestions()
    })
  }
</script>

<template>
  <div class="flex justify-evenly rounded-b-lg border border-base-subtle bg-base p-1">
    <Icon
      icon="delete"
      class="cursor-pointer hover:text-primary"
      @click="() => deleteMessageModal = true"
    /> 
  </div>
  <Modal
    v-if="deleteMessageModal"
    :close="() => deleteMessageModal = false"
    title="Delete message?"
  >
    <p>Are you sure you want to delete this message?</p>
    <p class="my-2 bg-base-moderate p-2">
      {{ props.question.title || props.question.body }}
    </p>
    <template #buttons>
      <button
        class="btn-big mr-5 bg-gray-600 hover:bg-gray-700 active:bg-gray-900"
        @click="() => deleteMessageModal = false"
      >
        Cancel
      </button>
      <button
        class="btn-big ml-5 bg-red-600 hover:bg-red-700 active:bg-red-900"
        @click="deleteQuestion"
      >
        Delete
      </button>
    </template>
  </Modal>
</template>