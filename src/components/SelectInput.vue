<script setup lang="ts">
defineProps(['modelValue', 'options', 'placeholder'])
defineEmits(['update:modelValue'])
</script>

<template>
  <select :value="modelValue"
          @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
          class="bg-white dark:bg-blue-700 text-gray-700 dark:text-white px-4 py-2 rounded-md shadow-md"
  >
    <option v-if="placeholder" value="">
      {{ placeholder }}
    </option>
    <option v-for="(option, index) in options"
            :key="`option-${index}`"
            :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>

</style>
