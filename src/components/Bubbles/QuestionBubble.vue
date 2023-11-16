<script setup>
  const props = defineProps(['question', 'link'])
</script>

<template>
  <router-link :to="props?.link ? props.link : `/question/${question._id}`">
    <div class="mx-2 my-4 break-words rounded-lg border border-base-subtle bg-base p-2 shadow-md">
      <p
        v-if="props.question?.title"
        class="mb-1 text-lg font-semibold"
      >
        {{ props.question.title }}
      </p>
      <p class="text-sm">
        {{ props.question.body }}
      </p>
    </div>
  </router-link>
</template>