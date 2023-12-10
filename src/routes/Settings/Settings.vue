<script setup>
  import DangerZone from './views/DangerZone.vue';
  import Security from './views/Security.vue'
  import Themes from './views/Themes.vue';
  import User from './views/User.vue';
</script>

<template>
  <div class="mx-auto my-4 mb-20 w-10/12 md:w-1/2 xl:w-2/6">
    <Themes />
    <User />
    <Security />
    <DangerZone />
  </div>
</template>