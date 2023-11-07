<script setup>
  const props = defineProps(['icon'])
</script>

<template>
  <span class="material-symbols-rounded align-middle"> {{ props.icon }} </span>
</template>