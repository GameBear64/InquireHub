<script setup>
  import { computed, provide, ref } from 'vue';

  import Icon from '@components/Icon.vue';

  import { useUserStore } from '@utils/store';

  import Modals from './views/Modals.vue';
  import Reactions from './views/Reactions.vue';
  
  const { userId } = useUserStore()
  const props = defineProps(['message'])

  provide('message', props.message)
  
  const hover = ref(false);
  const addReactionModal = ref(false);
  const editMessageModal = ref(false);
  const deleteMessageModal = ref(false);

  const isAuthor = computed(() => props.message?.author === userId || props.message?.author?._id === userId)

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
    class="flex flex-col"
    :class="{'items-end ': isAuthor}"
    @mouseover="hover = true"
    @mouseleave="() => {
      hover = false
      addReactionModal = false
    }"
  >
    <p
      class="text-xs text-onBase"
      :class="{'hidden': isAuthor || !props.message?.author}"
    >
      <router-link :to="`/profile/${props.message?.author?._id}`">
        {{ props.message?.author?.name }}
      </router-link>
    </p>
    <div
      class="flex items-center"
      :class="{'flex-row-reverse ': isAuthor}"
    >
      <span
        class="relative block w-fit rounded-lg px-4 py-2 text-gray-800"
        :class="{
          'rounded-bl rounded-br-none bg-primary-light': isAuthor,
          'rounded-bl-none bg-gray-300' : !isAuthor
        }"
      >
        {{ props.message?.body }}
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
    <Icon
      class=""
      :class="[getReactionColor(props.message?.reaction), {'left-0': !isAuthor, 'right-0': isAuthor}]"
      :icon="props.message?.reaction"
    />
  </div>
  <Modals
    :edit-message-modal="editMessageModal"
    :delete-message-modal="deleteMessageModal"
    @close-edit="editMessageModal = false"
    @close-delete="deleteMessageModal = false"
  />
</template>