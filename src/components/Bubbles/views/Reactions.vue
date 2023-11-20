<script setup>
  import { inject } from 'vue'

  import Icon from '@components/Icon.vue';

  import { socket } from '@utils/socket.js'

  const message = inject('message')

  const addReaction = (reaction) => {
    socket.emit('reaction', {messageId: message._id, reaction})
  }
</script>

<template>
  <div class="mx-4 flex gap-2 rounded-md border-2 p-1">
    <Icon
      icon="favorite"
      class="cursor-pointer rounded text-pink-500 hover:bg-base-moderate"
      @click="() => addReaction('favorite')"
    />
    <Icon
      icon="kid_star"
      class="cursor-pointer rounded text-yellow-500 hover:bg-base-moderate"
      @click="() => addReaction('kid_star')"
    />
    <Icon
      icon="thumb_up"
      class="cursor-pointer rounded text-green-500 hover:bg-base-moderate"
      @click="() => addReaction('thumb_up')"
    />
    <Icon
      icon="thumb_down"
      class="cursor-pointer rounded text-red-500 hover:bg-base-moderate"
      @click="() => addReaction('thumb_down')"
    />
    <Icon
      icon="skull"
      class="cursor-pointer rounded text-gray-500 hover:bg-base-moderate"
      @click="() => addReaction('skull')"
    />
  </div>
  <Icon
    v-if="message.reaction !== ''"
    icon="delete"
    class="cursor-pointer rounded text-red-500 hover:bg-base-moderate"
    @click="() => addReaction('')"
  />
</template>