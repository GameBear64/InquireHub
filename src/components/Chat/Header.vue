<script setup>
  const props = defineProps(['title', 'body'])
</script>

<template>
  <div class="border-b-2 border-base-subtle p-4 text-lg">
    <h1
      v-if="props?.title"
      class="text-2xl font-semibold"
    >
      {{ props?.title }}
    </h1>
    <h3>{{ props?.body }}</h3>
  </div>
</template>