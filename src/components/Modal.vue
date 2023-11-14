<script setup>
  import { useSlots } from 'vue'

import Icon from './Icon.vue';

  const slots = useSlots()
  const props = defineProps({
    title: String,
    close: Function,
    easyClose: Boolean,
    class: String
  })
  
</script>

<template>
  <div
    class="z-100 absolute right-0 top-0 flex h-screen w-screen flex-col items-center justify-center bg-slate-500/40"
    @click.self="() => {  
      if (props?.easyClose == '') props.close()
    }"
  >
    <div
      class="min-w-[20em] max-w-[60vw] rounded-lg bg-white px-4 py-3 text-slate-900"
      :class="props.class"
    >
      <div
        class="flex justify-between pb-1"
        :class="{'border-b-2': close}"
      >
        <p class="text-xl font-bold">
          {{ props.title }}
        </p>
        <button
          v-if="close"
          @click="props.close"
        >
          <Icon icon="close" />
        </button>
      </div>
      <div class="py-2">
        <slot />
      </div>
      <div
        v-if="slots.buttons"
        class="flex justify-end pt-4"
      >
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>