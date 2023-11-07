<script setup>
  const props = defineProps(['label', 'class'])
</script>

<template>
  <div :class="props.class">
    <span class="block w-full rounded-md shadow-sm">
      <button
        type="submit"
        class="focus:shadow-outline-indigo flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:border-indigo-700 focus:outline-none active:bg-indigo-700"
      >
        {{ props.label }}
      </button>
    </span>
  </div>
</template>