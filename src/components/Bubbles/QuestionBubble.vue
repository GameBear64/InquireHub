<script setup>
  const props = defineProps(['question'])
</script>

<template>
  <router-link :to="`/question/${question._id}`">
    <div class="mx-2 my-4 break-words rounded-lg border bg-white p-2 shadow-md">
      <p
        v-if="props.question?.title"
        class="mb-2 text-lg"
      >
        {{ props.question.title }}
      </p>
      <p class="text-sm">
        {{ props.question.body }}
      </p>
    </div>
  </router-link>
</template>