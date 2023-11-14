<script setup>
  const props = defineProps(['label', 'class', 'error', 'modelValue'])
  const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <div :class="props.class">
    <div class="flex items-center gap-2">
      <input
        :id="props.label?.toLowerCase().replace(/ /g, '-')"
        :name="props.label"
        :checked="modelValue"
        v-bind="$attrs"
        type="checkbox"
        class="h-5 w-5 "
        @change="emit('update:modelValue', $event.target.checked)"
      >
      <label
        :for="props.label?.toLowerCase().replace(/ /g, '-')"
        class="text-sm font-medium leading-5 text-gray-700"
      >
        {{ props.label }}
      </label>
    </div>
    <p
      v-if="props.error"
      class="text-sm font-light text-red-500"
    >
      {{ props.error }}
    </p>
    <div
      v-else
      class="h-5"
    />
  </div>
</template>