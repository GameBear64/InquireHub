<script setup>
import { ref } from 'vue';

import Icon from './Icon.vue';

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1 class="py-4 text-6xl font-bold underline">
    {{ msg }}
  </h1>

  <div class="text-center">
    <button
      type="button"
      class="m-5 rounded bg-blue-500 px-4 py-2 pl-3 font-bold text-white"
      @click="count++"
    >
      <Icon icon="add" />
      count is {{ count }}
    </button>
  </div>
</template>
