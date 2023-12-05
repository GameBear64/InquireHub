<script setup>
  import { computed, inject, reactive, ref } from 'vue'

  import { useVuelidate } from '@vuelidate/core';
  import { maxLength, minLength, required } from '@vuelidate/validators';

  import Icon from '@components/Icon.vue';
  import Modal from '@components/Modal.vue';

  import { errorSnackBar, successSnackBar } from '@utils/snackbars';
  import { useFetch } from '@utils/useFetch';

  const props = defineProps(['question'])
  const refetchQuestions = inject('refetchQuestions')

  const editMessageModal = ref(false);
  const deleteMessageModal = ref(false);

  const state = reactive({ title: props.question.title, body: props?.question.body });
  const rules = computed(() => ({
    title: { minLength: minLength(5), maxLength: maxLength(50) },
    body: { required, minLength: minLength(5), maxLength: maxLength(2000) }
  }));
  const v$ = useVuelidate(rules, state);

  const editQuestion = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return errorSnackBar(v$.body.$errors[0]?.$message)

    useFetch({url: `questions/${props.question._id}`, method: 'PATCH', body: state}).then(() => {
      editMessageModal.value = false
      refetchQuestions()
    })
  };

  const deleteQuestion = () => {
    useFetch({url: `questions/${props.question._id}`, method: 'DELETE'}).then(() => {
      editMessageModal.value = false
      successSnackBar('Question removed')
      refetchQuestions()
    })
  }
</script>

<template>
  <div class="flex justify-evenly rounded-b-lg border border-base-subtle bg-base p-1">
    <Icon
      icon="edit"
      class="cursor-pointer"
      @click="() => editMessageModal = true"
    />
    <div class="w-0 border border-base-subtle" />
    <Icon
      icon="delete"
      class="cursor-pointer"
      @click="() => deleteMessageModal = true"
    /> 
  </div>
  <Modal
    v-if="editMessageModal"
    :close="() => editMessageModal = false"
    title="Editing message"
  >
    <Input 
      v-model="state.body"
      class="mx-5 mt-10"
      :error="v$.body.$errors[0]?.$message"
    />
    <template #buttons>
      <button
        class="btn-big mr-5 bg-gray-600 hover:bg-gray-700 active:bg-gray-900"
        @click="() => editMessageModal = false"
      >
        Cancel
      </button>
      <button
        class="btn-big ml-5 bg-green-600 hover:bg-green-700 active:bg-green-900"
        @click="editQuestion"
      >
        Update
      </button>
    </template>
  </Modal>
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