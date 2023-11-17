<script setup>
  const props = defineProps(['class'])
</script>

<template>
  <span class="block w-full rounded-md">
    <button
      type="submit"
      class="btn-big"
      :class="props.class"
    >
      <slot />
    </button>
  </span>
</template>