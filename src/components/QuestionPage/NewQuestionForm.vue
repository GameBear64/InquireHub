<script setup>
  import { computed, nextTick,reactive } from 'vue';

  import { useVuelidate } from '@vuelidate/core';
  import { maxLength, minLength, required } from '@vuelidate/validators';

  import CheckBox from '../Form/CheckBox.vue';
  import Input from '../Form/Input.vue';
  import Submit from '../Form/Submit.vue';
  import TextArea from '../Form/TextArea.vue';

  const emit = defineEmits(["newQuestion"])

  const defaultState = {
    title: '',
    body: '',
    anonymous: true,
  }

  const state = reactive({...defaultState});

  const rules = computed(() => ({
    title: { minLength: minLength(5), maxLength: maxLength(50) },
    body: { required, minLength: minLength(5), maxLength: maxLength(2000) },
    anonymous: { },
  }));

  const v$ = useVuelidate(rules, state);

  const submitForm = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    emit('newQuestion', state);

    await nextTick()
    v$.value.$reset()
    Object.assign(state, defaultState);
  };
</script>

<template>
  <form
    class="px-2 py-4"
    @submit.prevent="submitForm"
  >
    <Input
      v-model="state.title"
      label="Title of question"
      placeholder="Has anyone else..?"
      :error="v$.title.$errors[0]?.$message"
    />
    <TextArea 
      v-model="state.body"
      label="Question"
      placeholder="So a couple months ago... so then... has anyone else..?"
      :error="v$.body.$errors[0]?.$message"
    />
    <CheckBox
      v-model="state.anonymous"
      class="mt-2"
      label="Anonymous question?"
    />
    <Submit class="mt-2">
      Submit question
    </Submit>
  </form>
</template>