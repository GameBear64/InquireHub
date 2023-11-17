<script setup>
  import { computed, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router'

  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';

  import Input from '@form/Input.vue';

  import Modal from '@components/Modal.vue';

  import { successSnackBar } from '@utils/snackbars';
  import { useFetch } from '@utils/useFetch';

  const router = useRouter()

  const showLogOutModal = ref(false)
  const showDeleteModal = ref(false)

  const state = reactive({ password: '' });
  const userRules = computed(() => ({ password: { required } }));
  const v$ = useVuelidate(userRules, state);

  const logOut = () => {
    localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
    router.push('/');
  }

  const deleteAccount = () => {
    useFetch({url: `user`, method: 'DELETE', body: state}).then(async () => {
      successSnackBar('Profile deleted, sorry to see you go')
      
      localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
      router.push('/');
    })
  }
</script>

<template>
  <h2 class="mt-12 text-3xl">
    Danger zone
  </h2>
  <hr class="my-2 border-b border-primary">

  <div class="my-10 flex gap-10">
    <button
      class="btn-big border-2 border-rose-400 bg-base text-onBase hover:bg-base-moderate active:bg-rose-400"
      @click="() => showLogOutModal = true"
    >
      Log out
    </button>

    <button
      class="btn-big border-2 border-red-500 bg-base text-onBase hover:bg-base-moderate active:bg-red-500"
      @click="() => showDeleteModal = true"
    >
      Delete account
    </button>
  </div>
  <Modal
    v-show="showLogOutModal"
    easy-close
    :close="() => showLogOutModal = false"
    title="Are you sure about this?"
  >
    <p>You are about to exit your account, confirm?</p>
    <template #buttons>
      <button
        class="btn-big mr-5 bg-green-600 hover:bg-green-700 active:bg-green-900"
        @click="() => showLogOutModal = false"
      >
        Cancel
      </button>
      <button
        class="btn-big ml-5 bg-rose-500 hover:bg-rose-600 active:bg-rose-900"
        @click="logOut"
      >
        Log out
      </button>
    </template>
  </Modal>
  <Modal
    v-show="showDeleteModal"
    :close="() => showDeleteModal = false"
    title="Are you sure about this?"
  >
    <p>You are about to delete your account.</p>
    <p>This action is permanent and cannot be undone.</p>
    <p>Confirm by typing in your password.</p>
    <Input 
      v-model="state.password"
      class="mx-auto mt-10 w-2/3"
      type="password"
      placeholder="●●●●●●●●●●"
      :error="v$.password.$errors[0]?.$message"
    />

    <template #buttons>
      <button
        class="btn-big mr-5 bg-green-600 hover:bg-green-700 active:bg-green-900"
        @click="() => showDeleteModal = false"
      >
        Cancel
      </button>
      <button
        class="btn-big ml-5 bg-rose-500 hover:bg-rose-600 active:bg-rose-900"
        @click="deleteAccount"
      >
        Delete account
      </button>
    </template>
  </Modal>
</template>