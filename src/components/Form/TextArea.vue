<script setup>
  const props = defineProps(['label', 'class', 'error', 'modelValue'])
  const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <div :class="props.class">
    <label
      :for="props.label?.toLowerCase().replace(/ /g, '-')"
      class="block text-sm font-medium leading-5 text-gray-700"
    >
      {{ props.label }}
    </label>
    <div class="mt-1 rounded-md shadow-sm">
      <textarea
        :id="props.label?.toLowerCase().replace(/ /g, '-')"
        :name="props.label"
        :value="modelValue"
        v-bind="$attrs"
        class="focus:shadow-outline-blue block h-28 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out placeholder:text-gray-400 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
        :class="{'border-red-500 focus:border-red-200': props.error}"
        @input="emit('update:modelValue', $event.target.value)"
      />
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