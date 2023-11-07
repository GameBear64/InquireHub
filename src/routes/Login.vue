<script setup>
import { computed, reactive } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';

import Input from '../components/Form/Input.vue';
import Submit from '../components/Form/Submit.vue';

const state = reactive({
  email: '',
  password: '',
});

const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(8) },
}));

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  const result = await v$.value.$validate();
  console.log('result', result);
};
</script>ne

<template>
  <div class="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-900">
        Sign in to your account
      </h2>
      <p class="max-w mt-2 text-center text-sm leading-5">
        Or
        <router-link
          class="font-medium text-blue-500 transition duration-150 ease-in-out hover:text-blue-500 focus:underline focus:outline-none"
          to="/register"
        >
          create a new account
        </router-link>
      </p>
    </div>

    <div class="mt-8 bg-white px-4 py-8 shadow sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:px-10">
      <form @submit.prevent="submitForm">
        <Input
          v-model="state.email"
          label="Email address"
          placeholder="user@example.com"
          :error="v$.email.$errors[0]?.$message"
        />
        <Input
          v-model="state.password"
          class="mt-4"
          label="Password"
          type="password"
          :error="v$.password.$errors[0]?.$message"
        />
        <Submit
          class="mt-4"
          label="Sign in"
        />
      </form>
    </div>
  </div>
</template>
