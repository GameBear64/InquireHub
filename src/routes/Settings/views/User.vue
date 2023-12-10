<script setup>
  import { computed, nextTick, onMounted, reactive } from 'vue';

  import { useVuelidate } from '@vuelidate/core';
  import { email, helpers,maxLength, minLength, required } from '@vuelidate/validators';

  import FileInput from '@form/FileInput.vue';
  import Input from '@form/Input.vue';
  import Submit from '@form/Submit.vue';
  import TextArea from '@form/TextArea.vue';

  import { successSnackBar } from '@utils/snackbars';
  import { useUserStore } from '@utils/store';
  import { useFetch } from '@utils/useFetch';
  import { cleanObject } from '@utils/utils';

  const { userId } = useUserStore()

  const defaultState = {
    name: '',
    email: '', // note: check if email is unique
    biography: '',
    picture: ''
  }

  const state = reactive({...defaultState});
  
  onMounted(() => {
    useFetch({url: `user/${userId}`}).then((data) => {
      Object.assign(state, cleanObject(data, ['name', 'email', 'biography', 'picture']))
    })
  });

  const rules = computed(() => ({
    name: { required, minLength: minLength(3), maxLength: maxLength(30) },
    email: { required, email },
    biography: { maxLength: maxLength(500) },
    picture: { maxLength: helpers.withMessage("Maximum file size allowed is 5MB", maxLength(5242880)) } // 5MB
  }));

  const v$ = useVuelidate(rules, state);

  const submitForm = async () => {
    const isValid = await v$.value.$validate();    
    if (!isValid) return;

    useFetch({url: `user`, method: 'PATCH', body: state}).then(async () => {
      successSnackBar('Profile updated')
      
      await nextTick()
      v$.value.$reset()
    })
  };
</script>

<template>
  <h2 class="mt-12 text-3xl">
    User Details
  </h2>
  <hr class="my-2 border-b border-primary">
  <form
    class="my-5"
    @submit.prevent="submitForm"
  >
    <Input 
      v-model="state.name"
      label="Name"
      placeholder="Jon Doe"
      :error="v$.name.$errors[0]?.$message"
    />

    <Input 
      v-model="state.email"
      label="Email"
      placeholder="user@example.com"
      :error="v$.email.$errors[0]?.$message"
    />

    <TextArea 
      v-model="state.biography"
      label="Biography"
      placeholder="My hobbies are... My interest include... In my free time..."
      :error="v$.biography.$errors[0]?.$message"
    />

    <FileInput 
      v-model="state.picture"
      label="Profile Picture"
      accept=".png,.jpg,.jpeg"
      :error="v$.picture.$errors[0]?.$message"
    />

    <Submit class="mt-5 w-52">
      Save
    </submit>
  </form>
</template>