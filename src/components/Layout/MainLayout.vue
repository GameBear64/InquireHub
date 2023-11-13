<script setup>
</script>

<template>
  <div className="grid h-full grid-flow-row grid-cols-[20em_1fr] grid-rows-1">
    <div className="overflow-x-auto shadow-[0_1px_5px_rgb(0,0,0,0.2)]">
      <slot name="side" />
    </div>
    <div className="row-span-2 overflow-x-auto">
      <slot />
    </div>
  </div>
</template>