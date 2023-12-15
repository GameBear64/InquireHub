<script setup>
  import { computed, inject, nextTick, onMounted, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router'

  import { useVuelidate } from '@vuelidate/core';
  import { maxLength, required } from '@vuelidate/validators';

  import MessageBubble from '@components/Bubbles/MessageBubble.vue';
  import Icon from '@components/Icon.vue';

  import ChatArea from '@form/ChatArea.vue';

  import { errorSnackBar } from '@utils/snackbars';
  import { socket } from '@utils/socket.js'
  import { useUserStore } from '@utils/store';
  import { useFetch } from '@utils/useFetch';

  import Header from './Header.vue';

  const route = useRoute()
  const { userId } = useUserStore()
  const refetchQuestions = inject('refetchQuestions')

  const question = reactive({})
  const messages = ref(null);
  
  const scrollToBottom = () => {
    if (messages?.value) messages.value.scrollTop = messages?.value?.scrollHeight + 50;
  };

  const fetchQuestionDetails = () => {
    if (!route.params.id) return;
    if (!!route.path.includes('question') && !route.params?.answer) return;
    Object.assign(question, {})

    const url = route.params?.answer ? `answers/${route.params.id}/${route.params.answer}` : `answers/${route.params.id}`
    useFetch({url}).then((data) => {
      Object.assign(question, data)
      nextTick(() => {
        scrollToBottom();
      });
    })
  }

  watch(() => route.params, () => fetchQuestionDetails());

  onMounted(() => {
    fetchQuestionDetails();
    
    socket.on('message', ({answerId, message}) => {
      if (!question.answer._id && message.author !== userId) refetchQuestions()
      
      // if its the first message in the chat, the answer id had to be generated on the server
      if (!question.answer._id && message.author === userId) {
        question.answer._id = answerId
        question.answer.messages = []
      }

      if (question.answer._id === answerId) {
        question.answer.messages.push(message)

        nextTick(() => {
          scrollToBottom();
        });
      }
    })

    socket.on('reaction', ({answerId, messageId, reaction}) => {
      if (question.answer._id !== answerId) return;

      const foundIndex = question.answer.messages.findIndex(m => m._id === messageId)
      question.answer.messages[foundIndex].reaction = reaction
    })

    socket.on('delete', ({answerId, messageId}) => {
      if (question.answer._id !== answerId) return;

      const foundIndex = question.answer.messages.findIndex(m => m?._id === messageId)
      question.answer.messages.splice(foundIndex, 1)
    })

    socket.on('edit', ({answerId, messageId, body}) => {
      if (question.answer._id !== answerId) return;

      const foundIndex = question.answer.messages.findIndex(m => m?._id === messageId)
      question.answer.messages[foundIndex].body = body
    })
  })

  const defaultState = { body: '' }
  const state = reactive({...defaultState});
  const rules = computed(() => ({body: { maxLength: maxLength(2000), required }}));
  const v$ = useVuelidate(rules, state);
  
  const submitForm = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return errorSnackBar(v$.body.$errors[0]?.$message)

    socket.emit('message', {...route.params, body: state.body})

    await nextTick();
    v$.value.$reset();
    Object.assign(state, defaultState);
  };
</script>

<template>
  <div class="flex h-full flex-col">
    <Header
      :title="question.title"
      :body="question.body"
    />
    <div
      ref="messages"
      class="flex grow flex-col gap-6 overflow-auto p-5"
    >
      <p
        v-if="!question?.answer?.messages?.length || question?.answer?.messages.length === 0"
        class="my-5 text-center"
      >
        No messages have been sent here.... yet!
      </p>
      <MessageBubble
        v-for="message in question?.answer?.messages"
        :key="message?._id"
        :message="message"
      />
    </div>
    <div class="flex items-center justify-evenly bg-base-moderate">
      <ChatArea
        v-model="state.body"
        class="grow bg-base-moderate"
        @keydown.enter.exact.prevent="submitForm"
      />
      <div class="h-full w-0 border border-gray-300" />
      <Icon
        icon="send"
        class="mx-3 cursor-pointer self-center overflow-hidden text-4xl"
        @click="submitForm"
      />
    </div>
  </div>
</template>