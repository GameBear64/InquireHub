<script setup>
  import Header from '@components/Chat/Header.vue';

  import AnswerBubble from '../../../components/Bubbles/AnswerBubble.vue';
  
  const props = defineProps(['question'])
</script>

<template>
  <Header
    :title="props.question?.title"
    :body="props.question?.body"
  />
  <div class="mx-auto my-5 flex w-1/2 flex-col items-center">
    <p v-if="props.question?.answers?.length == 0">
      Nobody has answered this question yet.
    </p>
    <div
      v-for="answer in props.question?.answers"
      :key="answer._id"
      class="w-full"
    >
      <AnswerBubble
        :answer="answer"
        :link="`/question/${props.question._id}/${answer._id}`"
      />
    </div>
  </div>
</template>