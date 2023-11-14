<script setup>
  const props = defineProps(['class'])
</script>

<template>
  <div :class="props.class">
    <span class="block w-full rounded-md">
      <button
        type="submit"
        class="btn-big"
      >
        <slot />
      </button>
    </span>
  </div>
</template>