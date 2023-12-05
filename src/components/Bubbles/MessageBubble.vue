<script setup>
  import { computed, provide, ref } from 'vue';

  import Icon from '@components/Icon.vue';

  import { getCurrentUserId } from '@utils/utils';

  import Modals from './views/Modals.vue';
  import Reactions from './views/Reactions.vue';
  
  const props = defineProps(['message'])

  provide('message', props.message)
  
  const hover = ref(false);
  const addReactionModal = ref(false);
  const editMessageModal = ref(false);
  const deleteMessageModal = ref(false);

  const userId = getCurrentUserId()
  const isAuthor = computed(() => props.message?.author === userId)

  const getReactionColor = (reaction) => {
    switch (reaction) {
      case 'favorite':
        return 'text-pink-500'
      case 'kid_star':
        return 'text-yellow-500'
      case 'thumb_up':
        return 'text-green-500'
      case 'thumb_down':
        return 'text-red-500'
      case 'skull':
        return 'text-gray-500'
    }
  }
</script>

<template>
  <div
    class="flex items-center"
    :class="{'flex-row-reverse': isAuthor}"
    @mouseover="hover = true"
    @mouseleave="() => {
      hover = false
      addReactionModal = false
    }"
  >
    <span
      class="relative block w-fit rounded-lg px-4 py-2 text-gray-800"
      :class="{
        'rounded-bl rounded-br-none bg-primary-light': isAuthor,
        'rounded-bl-none bg-gray-300' : !isAuthor
      }"
    >
      <p class="absolute -top-4 left-1 text-xs text-onBase">Gambar</p>
      {{ props.message?.body }}
      <Icon
        class="absolute -bottom-6"
        :class="[getReactionColor(props.message?.reaction), {'left-0': !isAuthor, 'right-0': isAuthor}]"
        :icon="props.message?.reaction"
      />
    </span>
    <Reactions v-if="addReactionModal" />
    <div
      class="mx-4"
      :class="{'hidden': (!hover && !addReactionModal)}"
    >
      <Icon
        v-if="isAuthor"
        icon="delete"
        class="mx-2 cursor-pointer"
        @click="deleteMessageModal = true"
      />
      <Icon
        v-if="isAuthor"
        icon="edit"
        class="cursor-pointer"
        @click="editMessageModal = true"
      />
      <Icon
        v-if="!isAuthor && !addReactionModal"
        icon="add_reaction"
        class="cursor-pointer"
        @click="addReactionModal = true"
      />
    </div>
  </div>
  <Modals
    :edit-message-modal="editMessageModal"
    :delete-message-modal="deleteMessageModal"
    @close-edit="editMessageModal = false"
    @close-delete="deleteMessageModal = false"
  />
</template>