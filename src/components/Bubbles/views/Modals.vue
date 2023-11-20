<script setup>
  import { computed, inject, reactive } from 'vue'

  import { useVuelidate } from '@vuelidate/core';
  import { maxLength, required } from '@vuelidate/validators';

  import Modal from '@components/Modal.vue';

  import Input from '@form/Input.vue';

  import { errorSnackBar } from '@utils/snackbars';
  import { socket } from '@utils/socket.js'


  const props = defineProps(["editMessageModal", "deleteMessageModal"])
  const emit = defineEmits(["closeEdit", "closeDelete"])

  const message = inject('message')

  const state = reactive({ body: message?.body });
  const rules = computed(() => ({body: { maxLength: maxLength(2000), required }}));
  const v$ = useVuelidate(rules, state);

  const editMessage = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return errorSnackBar(v$.body.$errors[0]?.$message)

    socket.emit('edit', {messageId: message._id, body: state.body});
    emit('closeEdit')
  };

  const deleteMessage = () => {
    socket.emit('delete', {messageId: message._id})
    emit('closeDelete')
  }
</script>

<template>
  <Modal
    v-if="props.editMessageModal"
    :close="() => emit('closeEdit')"
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
        @click="emit('closeEdit')"
      >
        Cancel
      </button>
      <button
        class="btn-big ml-5 bg-green-600 hover:bg-green-700 active:bg-green-900"
        @click="editMessage"
      >
        Update
      </button>
    </template>
  </Modal>
  <Modal
    v-if="props.deleteMessageModal"
    :close="() => emit('closeDelete')"
    title="Delete message?"
  >
    <p>Are you sure you want to delete this message?</p>
    <p class="my-2 bg-base-moderate p-2">
      {{ message?.body }}
    </p>
    <template #buttons>
      <button
        class="btn-big mr-5 bg-gray-600 hover:bg-gray-700 active:bg-gray-900"
        @click="emit('closeDelete')"
      >
        Cancel
      </button>
      <button
        class="btn-big ml-5 bg-red-600 hover:bg-red-700 active:bg-red-900"
        @click="deleteMessage"
      >
        Delete
      </button>
    </template>
  </Modal>
</template>