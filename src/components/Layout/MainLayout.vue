<script setup>
</script>

<template>
  <div className="grid h-full grid-flow-row grid-cols-[15em_1fr] lg:grid-cols-[20em_1fr] grid-rows-1">
    <div className="overflow-x-auto border-r-2 border-base-subtle">
      <slot name="side" />
    </div>
    <div className="row-span-2 overflow-x-auto">
      <slot />
    </div>
  </div>
</template>