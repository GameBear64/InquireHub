<script setup>
  import { getCurrentUserId } from '../../utils/utils';
  const props = defineProps(['message'])

  const userId = getCurrentUserId()
</script>

<template>
  <span
    class="block w-fit rounded-lg px-4 py-2 text-gray-800"
    :class="{
      'self-end rounded-bl rounded-br-none bg-primary-light': props.message?.author === userId,
      'rounded-bl-none bg-gray-300' : props.message?.author !== userId
    }"
  >
    {{ props.message.body }}
  </span>
</template>