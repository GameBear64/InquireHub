<script setup>
  import { inject,ref } from 'vue';

  import Icon from '@components/Icon.vue'
  import Modal from '@components/Modal.vue';

  import { successSnackBar } from '@utils/snackbars';
  import { useFetch } from '@utils/useFetch';
  import { timeFormatter } from '@utils/utils'


  const props = defineProps(['answer', 'link'])
  
  const refetchQuestions = inject('refetchQuestions')

  const showModal = ref(false)

  const deleteAnswer = () => {
    useFetch({url: `answers/${props.answer._id}`, method: 'DELETE'}).then(() => {
      showModal.value = false
      successSnackBar('Answer successfully deleted')
      refetchQuestions()
    })
  }
</script>

<template>
  <router-link :to="props.link">
    <div class="my-3 break-words rounded-lg border border-b-4 border-base-subtle border-b-primary bg-base p-2 py-3 shadow-md">
      <div class="flex justify-between">
        <div>
          <p class="text-sm">
            {{ props.answer.message }}
          </p>
          <p class="mt-1 text-xs text-base-weak">
            {{ timeFormatter.format(new Date(props.answer.createdAt)) }}
          </p>
        </div>
        <Icon
          icon="delete"
          @click.prevent="() => showModal = true"
        />
      </div>
    </div>
  </router-link>
  <Modal
    v-if="showModal"
    :close="() => showModal = false"
    title="Delete message?"
  >
    <p>Are you sure you want to delete this answer?</p>
    <p class="my-2 bg-base-moderate p-2">
      {{ props.answer.message }}
    </p>
    <template #buttons>
      <button
        class="btn-big mr-5 bg-gray-600 hover:bg-gray-700 active:bg-gray-900"
        @click="() => showModal = false"
      >
        Cancel
      </button>
      <button
        class="btn-big ml-5 bg-red-600 hover:bg-red-700 active:bg-red-900"
        @click="deleteAnswer"
      >
        Delete
      </button>
    </template>
  </Modal>
</template>