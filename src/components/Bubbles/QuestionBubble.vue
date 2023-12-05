<script setup>
  import { ref } from 'vue'

  import Icon from '../Icon.vue';

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
        <Icon
          icon="more_horiz"
          class="w-full pr-1 text-end"
          @click.prevent="() => moreOptions = !moreOptions"
        />
      </div>
    </router-link>
    <QuestionButtons
      v-if="moreOptions"
      :question="props.question"
    />
  </div>
</template>