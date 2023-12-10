<script setup>
  import { ref } from 'vue'

  import Icon from '../Icon.vue';

import AnswerButtons from './views/AnswerButtons.vue';
  import QuestionButtons from './views/QuestionButtons.vue';

  const props = defineProps(['question', 'link'])

  const moreOptions = ref(false);
</script>

<template>
  <div class="mx-2 my-4">
    <router-link :to="props?.link ? props.link : `/question/${question._id}`">
      <div
        class=" break-words border border-base-subtle bg-base p-2 pb-0 shadow-md"
        :class="{'rounded-t-lg' : moreOptions, 'rounded-lg' : !moreOptions}"
      >
        <p
          v-if="props.question?.title"
          class="mb-1 text-lg font-semibold"
        >
          {{ props.question.title }}
        </p>
        <p class="text-sm">
          {{ props.question.body }}
        </p>
        <div class="w-full pr-1 text-end">
          <Icon
            icon="more_horiz"
            @click.prevent="() => moreOptions = !moreOptions"
          />
        </div>
      </div>
    </router-link>
    <div v-if="props?.link?.includes('answer')">
      <AnswerButtons 
        v-if="moreOptions"
        :question="props.question"
      />
    </div>
    <div v-else>
      <QuestionButtons
        v-if="moreOptions"
        :question="props.question"
      />
    </div>
  </div>
</template>