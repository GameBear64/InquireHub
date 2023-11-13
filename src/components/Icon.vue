<script setup>
  const props = defineProps(['icon'])
</script>

<template>
  <span class="material-symbols-rounded align-sub"> {{ props.icon }} </span>
</template>