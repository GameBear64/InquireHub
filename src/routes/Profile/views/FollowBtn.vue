<script setup>
  import { ref } from 'vue';

  import Icon from '@components/Icon.vue';

  import { useFetch } from '@utils/useFetch';

  const props = defineProps(['id', 'imFollowing', 'refetch'])

  const hover = ref(false);

  const follow = () => {
    useFetch({url: `user/${props.id}/follow`}).then(() => {
      props.refetch()
    })
  }

  const unfollow = () => {
    useFetch({url: `user/${props.id}/unfollow`}).then(() => {
      props.refetch()
    })
  }
</script>

<template>
  <button
    v-if="!props.imFollowing"
    class="inline-flex items-center gap-2 rounded border border-onBase bg-base-moderate p-1 text-onBase"
    @click="follow"
  >
    Follow <Icon icon="person_add" />
  </button>
  <button
    v-if="props.imFollowing && !hover"
    class="inline-flex items-center gap-2 rounded border border-green-700 bg-green-100 p-1 text-green-700"
    @mouseover="hover = true"
  >
    Following <Icon icon="person_check" />
  </button>
  <button
    v-if="props.imFollowing && hover"
    class="inline-flex items-center gap-2 rounded border border-red-700 bg-red-100 p-1 text-red-700"
    @mouseleave="hover = false"
    @click="unfollow"
  >
    Unfollow <Icon icon="person_cancel" />
  </button>
</template>