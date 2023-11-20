<script setup>
  const props = defineProps(['question'])
</script>

<template>
  <div class="mx-auto my-5 flex w-1/2 flex-col items-center">
    <p v-if="props.question?.answers?.length == 0">
      Nobody has answered this question yet.
    </p>
    <div
      v-for="answer in props.question?.answers"
      :key="answer._id"
      class="w-full"
    >
      <router-link :to="`/question/${props.question._id}/${answer._id}`">
        <div class="my-3 break-words rounded-lg border border-base-subtle bg-base p-2 shadow-md">
          <p class="text-sm">
            {{ answer.message }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>