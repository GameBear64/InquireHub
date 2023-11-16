<script setup>
  import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router'

  import { useVuelidate } from '@vuelidate/core';
  import { maxLength, required } from '@vuelidate/validators';

  import { errorSnackBar } from '../../utils/snackbars';
  import { useFetch } from '../../utils/useFetch';
  import { getCurrentUserId } from '../../utils/utils';
  import ChatArea from '../Form/ChatArea.vue';
  import Icon from '../Icon.vue';

  import { socket } from './../../utils/socket.js'

  const route = useRoute()

  const question = reactive({})
  const messages = ref(null);


  const fetchQuestionDetails = () => {   
    if (!route.params.id) return;
    if (!!route.path.includes('question') && !route.params?.answer) return;

    const url = route.params?.answer ? `answers/${route.params.id}/${route.params.answer}` : `answers/${route.params.id}`
    useFetch({url}).then((data) => {
      Object.assign(question, data)
    })
  }

  watch(() => route.params, () => fetchQuestionDetails());

  const scrollToBottom = () => {
    messages.value.scrollTop = messages.value.scrollHeight + 50;
  };

  watch(question, () => {
    nextTick(() => {
      scrollToBottom();
    });
  });

  onMounted(() => {
    fetchQuestionDetails();
    scrollToBottom();
    socket.on('message', ({answerId, message}) => {
      if (question.answer._id === answerId) {
        question.answer.messages.push(message)
      }
    })
  })

  // cleanup
  onUnmounted(() => {
    socket.off('message')
  })

  const defaultState = { body: '' }
  const state = reactive({...defaultState});
  const rules = computed(() => ({body: { maxLength: maxLength(2000), required }}));
  const v$ = useVuelidate(rules, state);
  const submitForm = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return errorSnackBar(v$.body.$errors[0]?.$message)

    socket.emit('message', {...route.params, body: state.body})

    await nextTick()
    v$.value.$reset()
    Object.assign(state, defaultState);
  };
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="border-b-2 p-4 text-lg">
      <h1
        v-if="question?.title"
        class="text-2xl font-semibold"
      >
        {{ question?.title }}
      </h1>
      <h3>{{ question?.body }}</h3>
    </div>
    <div
      ref="messages"
      class="flex grow flex-col gap-6 overflow-auto p-5"
    >
      <p
        v-for="message in question?.answer?.messages"
        :key="message?._id"
        class="block w-fit rounded-lg px-4 py-2 text-gray-800"
        :class="{
          'self-end rounded-bl rounded-br-none bg-blue-300': message?.author === getCurrentUserId(),
          'rounded-bl-none bg-gray-300' : message?.author !== getCurrentUserId()
        }"
      >
        {{ message?.body }}
      </p>
    </div>
    <div class="flex items-center justify-evenly bg-stone-100">
      <ChatArea
        v-model="state.body" 
        class="grow bg-stone-100"
        @keydown.enter.exact.prevent="submitForm"
      />
      <div class="h-full w-0 border border-gray-300" />
      <Icon
        icon="send"
        class="mx-3 self-center overflow-hidden text-4xl"
        @click="submitForm"
      />
    </div>
  </div>
</template>