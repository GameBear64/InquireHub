<script setup>
  const props = defineProps(['icon'])
</script>

<template>
  <span class="material-symbols-rounded align-sub text-base"> {{ props.icon }} </span>
</template>