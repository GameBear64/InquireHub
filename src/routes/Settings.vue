<script setup>
  import { computed, reactive } from 'vue';

  import { useVuelidate } from '@vuelidate/core';
  import { email, minLength, required } from '@vuelidate/validators';

  import Input from '../components/Form/Input.vue';
  import TextArea from '../components/Form/TextArea.vue';
  import Icon from '../components/Icon.vue';
  import { themes } from '../main';

  const changeThemeMode = (mode) => {
    localStorage.setItem('theme-mode', mode);
    themes.mode = mode
  }

  const changeThemeColor = (color) => {
    localStorage.setItem('theme-color', color);
    themes.color = color
  }

  const userDefaultState = {
    name: '',
    email: '', // note: check if email is unique
    biography: '',
    picture: ''
  }
  const userState = reactive({...userDefaultState});

  const userRules = computed(() => ({
    name: { required },
    email: { required },
    biography: { required },
    picture: { required }
  }));

  const v$ = useVuelidate(userRules, userState);

  const submitUserForm = async () => {
    // const isValid = await v$.value.$validate();
    // if (!isValid) return;

    // emit('newQuestion', state);

    // await nextTick()
    // v$.value.$reset()
    // Object.assign(state, defaultState);
  };
</script>

<template>
  <div class="mx-auto my-4 w-10/12 md:w-1/2 xl:w-1/4">
    <h2 class="mt-12 text-3xl">
      Theme
    </h2>
    <hr class="my-2 border-b border-primary">

    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-black"
          @click="() => changeThemeMode('light')"
        >
          <Icon icon="light_mode" />
        </button>
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white"
          @click="() => changeThemeMode('dark')"
        >
          <Icon icon="dark_mode" />
        </button>
      </div>
      <p class="pb-2 text-4xl font-bold">
        +
      </p>
      <div class="flex gap-2">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500"
          @click="() => changeThemeColor('orange')"
        />
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
          @click="() => changeThemeColor('red')"
        />
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500"
          @click="() => changeThemeColor('green')"
        />
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500"
          @click="() => changeThemeColor('blue')"
        />
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500"
          @click="() => changeThemeColor('violet')"
        />
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500"
          @click="() => changeThemeColor('pink')"
        />
      </div>
    </div>


    <h2 class="mt-12 text-3xl">
      User Details
    </h2>
    <hr class="my-2 border-b border-primary">
    <form @click="submitUserForm">
      <Input 
        v-model="userState.name"
        label="Username"
        :error="v$.name.$errors[0]?.$message"
      />

      <Input 
        v-model="userState.email"
        label="Email"
        :error="v$.email.$errors[0]?.$message"
      />

      <TextArea 
        v-model="userState.biography"
        label="Biography"
        :error="v$.biography.$errors[0]?.$message"
      />

      <button class="btn-big mt-10 w-52">
        Save
      </button>
    </form>

    <h2 class="mt-12 text-3xl">
      Security
    </h2>
    <hr class="my-2 border-b border-primary">

    <Input 
      v-model="userState.name"
      label="Old password"
      :error="v$.name.$errors[0]?.$message"
    />

    <div class="flex content-stretch justify-between gap-6">
      <Input 
        v-model="userState.name"
        label="New password"
        class="w-full"
        :error="v$.name.$errors[0]?.$message"
      />
      
      <Input 
        v-model="userState.name"
        label="Confirm new password"
        class="w-full"
        :error="v$.name.$errors[0]?.$message"
      />
    </div>

    <button class="btn-big mt-10 w-52 ">
      Update
    </button>
      
    <h2 class="mt-12 text-3xl">
      Danger zone
    </h2>
    <hr class="my-2 border-b border-primary">

    <button class="btn-big my-10 w-52 bg-orange-500 hover:bg-orange-600  active:bg-orange-800">
      Log out
    </button>

    <button class="btn-big my-10 w-52 bg-red-500 hover:bg-red-600  active:bg-red-800">
      Delete account
    </button>
  </div>
</template>